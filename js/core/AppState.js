/**
 * AppState - Manages application state
 * Central state management for exam data and progress
 */

export class AppState {
  constructor() {
    this.currentExam = null;
    this.currentQuestions = [];
    this.userAnswers = {};
    this.examResults = null;
    this.isExamSubmitted = false;
    this.examStartTime = null;
    this.examMeta = {
      startTime: null,
      submitTime: null,
      duration: 0,
      remaining: 0,
    };
  }

  /**
   * Initialize exam
   */
  initExam(examName, questions) {
    const startTime = Date.now();

    this.currentExam = examName;
    this.currentQuestions = [...questions]; // Copy array
    this.userAnswers = {};
    this.examResults = null;
    this.isExamSubmitted = false;
    this.examStartTime = startTime;
    this.examMeta = {
      startTime,
      submitTime: null,
      duration: 0,
      remaining: 0,
    };
  }

  /**
   * Update user answer for a question
   */
  setAnswer(questionId, answer) {
    if (!this.isExamSubmitted) {
      this.userAnswers[questionId] = answer;
    }
  }

  /**
   * Get user answer for a question
   */
  getAnswer(questionId) {
    return this.userAnswers[questionId] || "";
  }

  /**
   * Get all answers
   */
  getAllAnswers() {
    return { ...this.userAnswers };
  }

  /**
   * Mark exam as submitted
   */
  submitExam(results) {
    this.isExamSubmitted = true;
    this.examResults = results;
  }

  /**
   * Finalize exam metadata at submission time
   */
  finalizeExamMeta(remainingSeconds, elapsedSeconds = null) {
    const submitTime = Date.now();
    const duration =
      typeof elapsedSeconds === "number"
        ? elapsedSeconds
        : this.examStartTime
          ? Math.floor((submitTime - this.examStartTime) / 1000)
          : 0;

    this.examMeta = {
      ...this.examMeta,
      submitTime,
      duration,
      remaining: Math.max(0, remainingSeconds || 0),
    };
  }

  /**
   * Get exam metadata
   */
  getExamMeta() {
    return { ...this.examMeta };
  }

  /**
   * Get time taken for exam
   */
  getTimeTaken() {
    if (this.examMeta && this.examMeta.duration) {
      return this.examMeta.duration;
    }

    if (!this.examStartTime) return 0;
    return Math.floor((Date.now() - this.examStartTime) / 1000);
  }

  /**
   * Reset state
   */
  reset() {
    this.currentExam = null;
    this.currentQuestions = [];
    this.userAnswers = {};
    this.examResults = null;
    this.isExamSubmitted = false;
    this.examStartTime = null;
    this.examMeta = {
      startTime: null,
      submitTime: null,
      duration: 0,
      remaining: 0,
    };
  }

  /**
   * Check if exam is active
   */
  isExamActive() {
    return this.currentExam !== null && !this.isExamSubmitted;
  }
}
