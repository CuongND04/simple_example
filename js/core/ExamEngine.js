/**
 * ExamEngine - Core exam orchestration
 * Manages exam flow, question loading, and submission
 */

import { CONFIG } from "../config.js";
import { QuestionParser } from "../parser/QuestionParser.js";
import { Grader } from "../grading/Grader.js";
import { shuffleArray, shuffleQuestions } from "../utils/shuffle.js";

export class ExamEngine {
  constructor(appState, storage) {
    this.appState = appState;
    this.storage = storage;
    this.allQuestions = [];
    this.currentExamFile = null;
  }

  /**
   * Load questions from file
   */
  async loadExamFile(filename) {
    const url = `data/${filename}.txt`;

    try {
      const questions = await QuestionParser.loadFromURL(url);

      if (questions.length === 0) {
        throw new Error("No questions loaded");
      }

      console.log(`Loaded ${questions.length} questions from ${filename}`);

      this.allQuestions = questions;
      this.currentExamFile = filename;
      return questions;
    } catch (error) {
      console.error(`Failed to load exam: ${filename}`, error);
      return [];
    }
  }

  /**
   * Start exam with shuffled questions
   */
  startExam(questions, examName) {
    // Shuffle question order
    const shuffled = shuffleQuestions(questions).map((question) =>
      this.prepareRuntimeQuestion(question),
    );

    // Initialize app state
    this.appState.initExam(examName || this.currentExamFile, shuffled);

    return shuffled;
  }

  /**
   * Build runtime question model for an attempt without mutating parser data.
   * - Keep original options/answer untouched
   * - Add shuffledOptions + optionMap + correctAnswerShuffled for grading/rendering
   */
  prepareRuntimeQuestion(question) {
    const runtimeQuestion = {
      ...question,
      options: question.options ? { ...question.options } : undefined,
      shuffledOptions: question.options ? { ...question.options } : undefined,
      optionMap: {},
      correctAnswerShuffled: question.answer,
    };

    if (
      !question.options ||
      (question.type !== CONFIG.QUESTION_TYPES.SINGLE &&
        question.type !== CONFIG.QUESTION_TYPES.MULTIPLE)
    ) {
      return runtimeQuestion;
    }

    const optionEntries = Object.entries(question.options);
    const shuffledEntries = shuffleArray(optionEntries);
    const displayLetters = ["A", "B", "C", "D"];

    const shuffledOptions = {};
    const optionMap = {};

    shuffledEntries.forEach(([originalLetter, optionText], index) => {
      const shuffledLetter = displayLetters[index];
      shuffledOptions[shuffledLetter] = optionText;
      optionMap[originalLetter.trim().toUpperCase()] = shuffledLetter;
    });

    runtimeQuestion.shuffledOptions = shuffledOptions;
    runtimeQuestion.optionMap = optionMap;
    runtimeQuestion.correctAnswerShuffled = this.mapAnswerToShuffled(
      question.answer,
      question.type,
      optionMap,
    );

    return runtimeQuestion;
  }

  mapAnswerToShuffled(answer, type, optionMap) {
    if (type === CONFIG.QUESTION_TYPES.SINGLE) {
      const originalLetter = (answer || "").trim().toUpperCase();
      return optionMap[originalLetter] || originalLetter;
    }

    if (type === CONFIG.QUESTION_TYPES.MULTIPLE) {
      return (answer || "")
        .split(",")
        .map((letter) => letter.trim().toUpperCase())
        .filter(Boolean)
        .map((letter) => optionMap[letter] || letter)
        .sort()
        .join(",");
    }

    return answer;
  }

  /**
   * Submit exam and grade
   */
  submitExam() {
    const questions = this.appState.currentQuestions;
    const answers = this.appState.getAllAnswers();

    // Grade the exam
    const results = Grader.gradeExam(questions, answers);
    results.examMeta = this.appState.getExamMeta();

    // Record wrong answers
    results.details.forEach((detail) => {
      if (!detail.isCorrect) {
        this.storage.recordWrongAnswer(detail.questionId);
      }
    });

    // Record score
    const timeTaken = results.examMeta.duration || this.appState.getTimeTaken();
    const examName = this.appState.currentExam || "Practice Exam";
    this.storage.recordScore(
      examName,
      results.correct,
      results.total,
      timeTaken,
    );

    // Mark exam as submitted
    this.appState.submitExam(results);

    return results;
  }

  /**
   * Get current exam questions
   */
  getCurrentQuestions() {
    return this.appState.currentQuestions;
  }

  /**
   * Get exam results
   */
  getResults() {
    return this.appState.examResults;
  }

  /**
   * Check if exam is submitted
   */
  isSubmitted() {
    return this.appState.isExamSubmitted;
  }
}
