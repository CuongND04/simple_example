/**
 * Grader - Handles exam grading logic
 * Evaluates answers based on question type
 */

import { CONFIG } from "../config.js";
import { normalizeAnswer } from "../utils/helpers.js";

export class Grader {
  /**
   * Grade a single question
   */
  static gradeQuestion(question, userAnswer) {
    const type = question.type;
    const expectedAnswer =
      type === CONFIG.QUESTION_TYPES.FILL
        ? question.answer
        : question.correctAnswerShuffled || question.answer;

    switch (type) {
      case CONFIG.QUESTION_TYPES.FILL:
        return this.gradeFill(expectedAnswer, userAnswer);
      case CONFIG.QUESTION_TYPES.SINGLE:
        return this.gradeSingle(expectedAnswer, userAnswer);
      case CONFIG.QUESTION_TYPES.MULTIPLE:
        return this.gradeMultiple(expectedAnswer, userAnswer);
      default:
        return false;
    }
  }

  /**
   * Grade fill-in-the-blank question
   * Case-insensitive, trim whitespace
   */
  static gradeFill(correctAnswer, userAnswer) {
    const normalized = normalizeAnswer(correctAnswer);
    const userNormalized = normalizeAnswer(userAnswer || "");
    return normalized === userNormalized;
  }

  /**
   * Grade single-choice question
   * Exact match (A/B/C/D)
   */
  static gradeSingle(correctAnswer, userAnswer) {
    const correct = correctAnswer.trim().toUpperCase();
    const user = (userAnswer || "").trim().toUpperCase();
    return correct === user;
  }

  /**
   * Grade multiple-choice question
   * Order-independent comparison
   */
  static gradeMultiple(correctAnswer, userAnswer) {
    const parse = (answer) => {
      return (answer || "")
        .split(",")
        .map((a) => a.trim().toUpperCase())
        .filter((a) => a)
        .sort()
        .join(",");
    };

    const correct = parse(correctAnswer);
    const user = parse(userAnswer);
    return correct === user;
  }

  /**
   * Grade entire exam
   */
  static gradeExam(questions, answers) {
    const results = {
      correct: 0,
      wrong: 0,
      total: questions.length,
      percentage: 0,
      questions: questions.map((question) => ({
        ...question,
        options: question.options ? { ...question.options } : undefined,
      })),
      details: [],
    };

    questions.forEach((question) => {
      const userAnswer = answers[question.id] || "";
      const correctAnswer =
        question.type === CONFIG.QUESTION_TYPES.FILL
          ? question.answer
          : question.correctAnswerShuffled || question.answer;
      const isCorrect = this.gradeQuestion(question, userAnswer);

      results.details.push({
        id: question.id,
        questionId: question.id,
        isCorrect,
        correct: isCorrect ? 1 : 0,
        userAnswer,
        correctAnswer,
        question: question.question,
        topic: question.topic,
        type: question.type,
        context: question.context,
      });

      if (isCorrect) {
        results.correct++;
      } else {
        results.wrong++;
      }
    });

    results.percentage = Math.round((results.correct / results.total) * 100);

    return results;
  }
}
