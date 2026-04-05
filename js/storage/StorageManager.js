/**
 * StorageManager - Handles localStorage operations
 * Manages exam scores history and wrong answer tracking
 */

import { CONFIG } from "../config.js";

export class StorageManager {
  constructor() {
    this.scoresKey = CONFIG.STORAGE.SCORES_HISTORY;
    this.wrongCountKey = CONFIG.STORAGE.WRONG_COUNT;
  }

  /**
   * Record exam score and detailed results
   */
  recordScore(examName, results, timeTaken) {
    const history = this.getScoresHistory();
    const score = results.correct;
    const total = results.total;
    const percentage = Math.round((score / total) * 100);

    const record = {
      exam: examName,
      score,
      total,
      percentage,
      timestamp: new Date().toISOString(),
      timeTaken,
      results: results,
    };

    history.push(record);
    // Keep only last 20 scores
    if (history.length > 20) {
      history.shift();
    }

    localStorage.setItem(this.scoresKey, JSON.stringify(history));
    return record;
  }

  /**
   * Get all score history
   */
  getScoresHistory() {
    try {
      const data = localStorage.getItem(this.scoresKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to read scores history:", e);
      return [];
    }
  }

  /**
   * Record wrong answer for a question
   */
  recordWrongAnswer(questionId) {
    try {
      const wrongCount = this.getWrongCount();
      wrongCount[questionId] = (wrongCount[questionId] || 0) + 1;
      localStorage.setItem(this.wrongCountKey, JSON.stringify(wrongCount));
    } catch (e) {
      console.error("Failed to record wrong answer:", e);
    }
  }

  /**
   * Get wrong count for all questions
   */
  getWrongCount() {
    try {
      const data = localStorage.getItem(this.wrongCountKey);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error("Failed to read wrong count:", e);
      return {};
    }
  }

  /**
   * Get weak questions (answered wrong >= threshold)
   */
  getWeakQuestions(allQuestions) {
    const wrongCount = this.getWrongCount();
    const threshold = CONFIG.WEAK_QUESTION_THRESHOLD;

    return allQuestions.filter((q) => (wrongCount[q.id] || 0) >= threshold);
  }

  /**
   * Get recent scores (last N)
   */
  getRecentScores(limit = 5) {
    return this.getScoresHistory().slice(-limit).reverse();
  }

  /**
   * Clear all data
   */
  clearAll() {
    localStorage.removeItem(this.scoresKey);
    localStorage.removeItem(this.wrongCountKey);
  }
}
