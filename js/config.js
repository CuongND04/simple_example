/**
 * Global configuration for the exam application
 */

export const CONFIG = {
  // Data source
  QUESTIONS_FILE: "data/questions.txt",

  // Exam settings
  TOTAL_QUESTIONS: 50,
  TIME_LIMIT_MINUTES: 60,

  // UI Elements
  UI: {
    selectorPage: "selectorPage",
    examPage: "examPage",
    resultsPage: "resultsPage",
    examList: "examList",
    examTitleDisplay: "examTitleDisplay",
    questionCount: "questionCount",
    timer: "timer",
    questionsContainer: "questionsContainer",
    submitBtn: "submitBtn",
    backBtn: "backBtn",
    retakeBtn: "retakeBtn",
    backToSelectorBtn: "backToSelectorBtn",
    totalScore: "totalScore",
    correctCount: "correctCount",
    wrongCount: "wrongCount",
    percentage: "percentage",
    resultsFeedback: "resultsFeedback",
    practiceWeakBtn: "practiceWeakBtn",
    scoreHistory: "scoreHistory",
  },

  // Storage keys
  STORAGE: {
    SCORES_HISTORY: "exam_scores_history",
    WRONG_COUNT: "exam_wrong_count",
  },

  // Question types
  QUESTION_TYPES: {
    FILL: "fill",
    SINGLE: "single",
    MULTIPLE: "multiple",
  },

  // Grading
  WEAK_QUESTION_THRESHOLD: 2,
};
