/**
 * Timer - Countdown timer for exam
 * Manages time tracking and auto-submission
 */

import { CONFIG } from "../config.js";
import { formatTime } from "../utils/helpers.js";

export class Timer {
  constructor() {
    this.timeLimit = CONFIG.TIME_LIMIT_MINUTES * 60; // Convert to seconds
    this.timeRemaining = this.timeLimit;
    this.timerInterval = null;
    this.onTick = null;
    this.onExpire = null;
    this.isRunning = false;
    this.startTimestamp = null;
  }

  /**
   * Start the timer
   */
  start(onTick, onExpire) {
    if (this.isRunning) return;

    this.onTick = onTick;
    this.onExpire = onExpire;
    this.isRunning = true;
    this.timeRemaining = this.timeLimit;
    this.startTimestamp = Date.now();

    // Update immediately
    this.updateDisplay();

    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      this.updateDisplay();

      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }

      if (this.timeRemaining <= 0) {
        this.stop();
        if (this.onExpire) {
          this.onExpire();
        }
      }
    }, 1000);
  }

  /**
   * Stop the timer
   */
  stop() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.isRunning = false;
  }

  /**
   * Reset timer
   */
  reset() {
    this.stop();
    this.timeRemaining = this.timeLimit;
    this.startTimestamp = null;
    this.updateDisplay();
  }

  /**
   * Update display element
   */
  updateDisplay() {
    const timerEl = document.getElementById("timer");
    if (timerEl) {
      timerEl.textContent = formatTime(this.timeRemaining);

      // Change color when time is low
      if (this.timeRemaining < 300) {
        // 5 minutes
        timerEl.classList.add("warning");
      } else {
        timerEl.classList.remove("warning");
      }

      if (this.timeRemaining < 60) {
        // 1 minute
        timerEl.classList.add("danger");
      } else {
        timerEl.classList.remove("danger");
      }
    }
  }

  /**
   * Get formatted time
   */
  getFormattedTime() {
    return formatTime(this.timeRemaining);
  }

  /**
   * Get time remaining in seconds
   */
  getTimeRemaining() {
    return this.timeRemaining;
  }

  /**
   * Get elapsed time in seconds
   */
  getElapsedTime() {
    return Math.max(0, this.timeLimit - this.timeRemaining);
  }

  /**
   * Alias kept for clarity where caller needs explicit remaining time API
   */
  getRemainingTime() {
    return this.timeRemaining;
  }
}
