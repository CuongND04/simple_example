/**
 * main.js - Application entry point
 * Orchestrates all modules and manages application flow
 */

import { CONFIG } from "./config.js";
import { AppState } from "./core/AppState.js";
import { ExamEngine } from "./core/ExamEngine.js";
import { Timer } from "./core/Timer.js";
import { StorageManager } from "./storage/StorageManager.js";
import { Renderer } from "./ui/Renderer.js";
import { getElementSafely, showPage } from "./utils/helpers.js";

class ExamApp {
  constructor() {
    this.appState = new AppState();
    this.storage = new StorageManager();
    this.examEngine = new ExamEngine(this.appState, this.storage);
    this.timer = new Timer();
    this.renderer = new Renderer();
    this.currentExamFile = null;
    this.init();
  }

  init() {
    console.log("🎓 Initializing Exam Practice Engine...");
    this.setupEventListeners();
    this.renderSelector();
  }

  /**
   * Setup all event listeners
   */
  setupEventListeners() {
    // Selector page
    const examList = getElementSafely(CONFIG.UI.examList);
    if (examList) {
      examList.addEventListener("click", (e) => {
        if (e.target.classList.contains("exam-button")) {
          const examName = e.target.dataset.examName;
          const examFile = e.target.dataset.examFile;
          this.startExam(examName, examFile);
        }
      });
    }

    // Weak questions button
    const practiceWeakBtn = getElementSafely(CONFIG.UI.practiceWeakBtn);
    if (practiceWeakBtn) {
      practiceWeakBtn.addEventListener("click", () =>
        this.practiceWeakQuestions(),
      );
    }

    // Back button
    const backBtn = getElementSafely(CONFIG.UI.backBtn);
    if (backBtn) {
      backBtn.addEventListener("click", () => this.backToSelector());
    }

    // Submit button
    const submitBtn = getElementSafely(CONFIG.UI.submitBtn);
    if (submitBtn) {
      submitBtn.addEventListener("click", () => this.submitExam());
    }

    // Retake button
    const retakeBtn = getElementSafely(CONFIG.UI.retakeBtn);
    if (retakeBtn) {
      retakeBtn.addEventListener("click", () => this.retakeExam());
    }

    // Back to selector from results
    const backToSelectorBtn = getElementSafely(CONFIG.UI.backToSelectorBtn);
    if (backToSelectorBtn) {
      backToSelectorBtn.addEventListener("click", () => this.backToSelector());
    }

    // Answer change listener
    document.addEventListener("change", (e) => {
      if (e.target.dataset.questionId && this.appState.isExamActive()) {
        const questionId = e.target.dataset.questionId;
        const question = this.appState.currentQuestions.find(
          (q) => q.id === questionId,
        );

        if (question) {
          const answer = this.renderer.collectAnswers([question])[questionId];
          if (answer !== undefined) {
            this.appState.setAnswer(questionId, answer);
          }
        }
      }
    });

    document.addEventListener("input", (e) => {
      if (e.target.dataset.questionId && this.appState.isExamActive()) {
        const questionId = e.target.dataset.questionId;
        const question = this.appState.currentQuestions.find(
          (q) => q.id === questionId,
        );

        if (question) {
          this.appState.setAnswer(questionId, e.target.value);
        }
      }
    });
  }

  /**
   * Render selector page
   */
  renderSelector() {
    const recentScores = this.storage.getRecentScores(5);
    this.renderer.renderSelector(recentScores);
    showPage(CONFIG.UI.selectorPage);
  }

  /**
   * Start exam
   */
  async startExam(examName, examFile) {
    console.log(`📖 Starting exam: ${examName}`);

    this.currentExamFile = examFile;
    const questions = await this.examEngine.loadExamFile(examFile);

    if (questions.length === 0) {
      alert("Failed to load exam. Please check the file format.");
      return;
    }

    const shuffled = this.examEngine.startExam(questions, examName);

    this.renderer.renderExamPage(examName, shuffled);
    showPage(CONFIG.UI.examPage);

    // Start timer
    this.timer.reset();
    this.timer.start(
      () => {}, // on tick
      () => this.autoSubmitExam(), // on expire
    );
  }

  /**
   * Submit exam
   */
  submitExam() {
    if (!this.appState.isExamActive()) {
      return;
    }

    // Collect answers
    const questions = this.examEngine.getCurrentQuestions();
    const answers = this.renderer.collectAnswers(questions);

    // Update state with collected answers
    Object.entries(answers).forEach(([id, answer]) => {
      this.appState.setAnswer(id, answer);
    });

    // Stop timer and capture attempt timing metadata
    const remainingTime = this.timer.getRemainingTime();
    const elapsedTime = this.timer.getElapsedTime();
    this.timer.stop();
    this.appState.finalizeExamMeta(remainingTime, elapsedTime);

    // Grade exam
    const results = this.examEngine.submitExam();

    // Mark results on UI
    this.renderer.markResults(results);
    this.renderer.disableSubmit(questions);

    // Render results
    this.renderer.renderResults(results, this.appState.currentExam);
    showPage(CONFIG.UI.resultsPage);

    console.log("✅ Exam submitted:", results);
  }

  /**
   * Auto-submit when timer expires
   */
  autoSubmitExam() {
    console.log("⏰ Time expired! Auto-submitting...");
    this.submitExam();
  }

  /**
   * Retake exam
   */
  retakeExam() {
    const examName = this.appState.currentExam;
    this.appState.reset();
    this.renderer.clearExamPage();
    this.startExam(examName, this.currentExamFile);
  }

  /**
   * Practice weak questions
   */
  practiceWeakQuestions() {
    alert(
      "Weak questions mode coming soon!\n\nThis will focus on questions frequently answered incorrectly.",
    );
  }

  /**
   * Back to selector
   */
  backToSelector() {
    this.timer.stop();
    this.appState.reset();
    this.renderer.clearExamPage();
    this.renderSelector();
  }
}

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.examApp = new ExamApp();
});
