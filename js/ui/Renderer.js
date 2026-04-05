/**
 * Renderer - Main UI rendering orchestrator
 * Updates DOM for all pages and components
 */

import { CONFIG } from "../config.js";
import { QuestionCard } from "./QuestionCard.js";
import { ResultView } from "./ResultView.js";
import { getElementSafely } from "../utils/helpers.js";

export class Renderer {
  constructor() {
    this.examNames = [
      { file: "Chuong_1_De_1", display: "Chapter 1 - Exam 1" },
      { file: "Chuong_1_De_2", display: "Chapter 1 - Exam 2" },
      { file: "Chuong_2_De_1", display: "Chapter 2 - Exam 1" },
      { file: "Chuong_2_De_2", display: "Chapter 2 - Exam 2" },
      { file: "Chuong_3_De_1", display: "Chapter 3 - Exam 1" },
      { file: "Chuong_3_De_2", display: "Chapter 3 - Exam 2" },
      { file: "Chuong_4.1_De_1", display: "Chapter 4.1 - Exam 1" },
      { file: "Chuong_4.1_De_2", display: "Chapter 4.1 - Exam 2" },
      { file: "Chuong_4.2_De_1", display: "Chapter 4.2 - Exam 1" },
      { file: "Chuong_4.2_De_2", display: "Chapter 4.2 - Exam 2" },
      { file: "Chuong_5_De_1", display: "Chapter 5 - Exam 1" },
      { file: "Chuong_5_De_2", display: "Chapter 5 - Exam 2" },
    ];
  }

  /**
   * Render selector page with exam list
   */
  renderSelector(recentScores) {
    const examList = getElementSafely(CONFIG.UI.examList);
    if (!examList) return;

    examList.innerHTML = "";

    this.examNames.forEach((exam) => {
      const button = document.createElement("button");
      button.className = "exam-button btn btn-inline";
      button.textContent = exam.display;
      button.dataset.examName = exam.display;
      button.dataset.examFile = exam.file;
      examList.appendChild(button);
    });

    // Render recent scores
    const historyEl = getElementSafely(CONFIG.UI.scoreHistory);
    if (historyEl) {
      historyEl.innerHTML =
        recentScores.length === 0
          ? '<p class="empty-message">No scores yet. Take your first exam!</p>'
          : recentScores
              .map(
                (score) => `
                    <div class="score-item">
                        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                          <span class="score-exam">${score.exam}</span>
                          <span style="font-size: 0.8rem; color: #6b7280;">${new Date(score.timestamp).toLocaleString()}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                          <span class="score-value" style="font-weight: 600; font-size: 0.9rem;">${score.score}/${score.total}</span>
                          <span class="score-percent" style="color: #6b7280; font-size: 0.85rem;">(${score.percentage}%)</span>
                          ${score.results ? `<button class="btn btn-primary btn-small view-history-btn" style="padding: 0.35rem 0.75rem; font-size: 0.75rem; margin-left: 0.5rem;" data-index="${score.timestamp}">View</button>` : ''}
                        </div>
                    </div>
                `,
              )
              .join("");
    }
  }

  /**
   * Render exam page with questions
   */
  renderExamPage(examName, questions) {
    const title = getElementSafely(CONFIG.UI.examTitleDisplay);
    const countEl = getElementSafely(CONFIG.UI.questionCount);
    const container = getElementSafely(CONFIG.UI.questionsContainer);

    if (title) {
      title.textContent = examName.replace(/-/g, " ");
    }

    if (countEl) {
      countEl.textContent = `${questions.length} Questions`;
    }

    if (container) {
      container.innerHTML = "";
      questions.forEach((question, index) => {
        const card = QuestionCard.render(question, index + 1);
        container.appendChild(card);
      });
    }

    const submitBtn = getElementSafely(CONFIG.UI.submitBtn);
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Exam";
    }
  }

  /**
   * Update question answers from state
   */
  updateQuestionsFromState(appState) {
    const questions = appState.currentQuestions;
    const answers = appState.getAllAnswers();

    questions.forEach((question) => {
      const answer = answers[question.id];
      if (answer) {
        QuestionCard.setAnswer(question.id, answer, question.type);
      }
    });
  }

  /**
   * Collect all answers from page
   */
  collectAnswers(questions) {
    const answers = {};

    questions.forEach((question) => {
      const answer = QuestionCard.getUserAnswer(question.id, question.type);
      if (answer) {
        answers[question.id] = answer;
      }
    });

    return answers;
  }

  /**
   * Mark questions as correct/wrong
   */
  markResults(results) {
    results.details.forEach((detail) => {
      QuestionCard.markCard(detail.id, detail.isCorrect);
    });
  }

  /**
   * Disable all inputs
   */
  disableSubmit(questions) {
    questions.forEach((question) => {
      const answerId = `answer-${question.id}`;

      const textInput = document.getElementById(answerId);
      if (textInput) {
        textInput.disabled = true;
      }

      const optionInputs = document.getElementsByName(answerId);
      Array.from(optionInputs).forEach((input) => {
        input.disabled = true;
      });
    });

    const submitBtn = getElementSafely(CONFIG.UI.submitBtn);
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Exam Submitted";
    }
  }

  /**
   * Render results page
   */
  renderResults(results, examName) {
    const totalEl = getElementSafely(CONFIG.UI.totalScore);
    const correctEl = getElementSafely(CONFIG.UI.correctCount);
    const wrongEl = getElementSafely(CONFIG.UI.wrongCount);
    const percentEl = getElementSafely(CONFIG.UI.percentage);
    const feedbackEl = getElementSafely(CONFIG.UI.resultsFeedback);

    if (totalEl) {
      totalEl.textContent = `${results.correct}/${results.total}`;
    }

    if (correctEl) {
      correctEl.textContent = results.correct;
    }

    if (wrongEl) {
      wrongEl.textContent = results.wrong;
    }

    if (percentEl) {
      percentEl.textContent = `${results.percentage}%`;
    }

    if (feedbackEl) {
      const resultView = this.renderReviewExam(
        results.questions || [],
        results,
      );
      feedbackEl.innerHTML = "";
      feedbackEl.appendChild(resultView);
    }
  }

  /**
   * Render full exam review in result page
   */
  renderReviewExam(questions, results) {
    return ResultView.render(questions, results);
  }

  /**
   * Clear exam page
   */
  clearExamPage() {
    const container = getElementSafely(CONFIG.UI.questionsContainer);
    if (container) {
      container.innerHTML = "";
    }
  }
}
