/**
 * ResultView - Renders exam results and feedback
 */

import { QuestionCard } from "./QuestionCard.js";

export class ResultView {
  static render(questions, results) {
    const div = document.createElement("div");
    div.className = "results-detail";

    const title = document.createElement("h3");
    title.textContent = "Full Question Review";
    title.style.marginBottom = "0.5rem";
    div.appendChild(title);

    const subtitle = document.createElement("p");
    subtitle.className = "question-count";
    subtitle.style.marginBottom = "1rem";
    subtitle.textContent = `${questions.length} questions in submitted order`;
    div.appendChild(subtitle);

    const summary = document.createElement("div");
    summary.style.marginBottom = "1rem";
    summary.style.padding = "0.75rem 1rem";
    summary.style.border = "1px solid #e5e7eb";
    summary.style.borderRadius = "8px";
    summary.style.background = "#ffffff";
    const duration = results.examMeta?.duration ?? 0;
    const remaining = results.examMeta?.remaining ?? 0;
    summary.innerHTML = `
      <strong>Summary:</strong>
      <span style="color:#166534; font-weight:600; margin-left:0.5rem;">Correct: ${results.correct}</span>
      <span style="color:#dc2626; font-weight:600; margin-left:0.75rem;">Wrong: ${results.wrong}</span>
      <span style="color:#1d4ed8; font-weight:600; margin-left:0.75rem;">Score: ${results.correct}/${results.total} (${results.percentage}%)</span>
      <span style="display:block; margin-top:0.5rem; color:#374151;">Time Spent: <strong>${this.formatTime(duration)}</strong></span>
      <span style="display:block; margin-top:0.25rem; color:#374151;">Time Remaining: <strong>${this.formatTime(remaining)}</strong></span>
    `;
    div.appendChild(summary);

    const filterBar = document.createElement("div");
    filterBar.className = "review-filters";
    filterBar.innerHTML = `
      <button type="button" class="btn btn-secondary btn-small review-filter-btn active" data-filter="all">All</button>
      <button type="button" class="btn btn-secondary btn-small review-filter-btn" data-filter="correct">Correct</button>
      <button type="button" class="btn btn-secondary btn-small review-filter-btn" data-filter="wrong">Wrong</button>
    `;
    div.appendChild(filterBar);

    const reviewList = document.createElement("div");
    reviewList.className = "review-list";
    div.appendChild(reviewList);

    const detailMap = new Map(
      (results.details || []).map((detail) => [
        detail.questionId || detail.id,
        detail,
      ]),
    );

    questions.forEach((question, index) => {
      const detail = detailMap.get(question.id) || {
        questionId: question.id,
        userAnswer: "",
        correctAnswer: question.answer,
        isCorrect: false,
      };

      const reviewCard = QuestionCard.render(question, index + 1, {
        mode: "review",
        reviewResult: detail,
      });

      reviewCard.dataset.result = detail.isCorrect ? "correct" : "wrong";

      reviewList.appendChild(reviewCard);
    });

    filterBar.addEventListener("click", (event) => {
      const button = event.target.closest(".review-filter-btn");
      if (!button) return;

      const filter = button.dataset.filter;
      const cards = reviewList.querySelectorAll(".question-card[data-result]");

      cards.forEach((card) => {
        const resultType = card.dataset.result;
        const show = filter === "all" || resultType === filter;
        card.classList.toggle("hidden", !show);
      });

      filterBar.querySelectorAll(".review-filter-btn").forEach((btn) => {
        btn.classList.toggle("active", btn === button);
      });
    });

    return div;
  }

  static formatTime(totalSeconds) {
    const safeSeconds = Math.max(0, Number(totalSeconds) || 0);
    const minutes = Math.floor(safeSeconds / 60);
    const seconds = safeSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
}
