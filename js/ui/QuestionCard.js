/**
 * QuestionCard - Renders individual question UI
 * Handles different question types
 */

import { CONFIG } from "../config.js";

export class QuestionCard {
  static render(question, index, options = {}) {
    const { mode = "exam", isSubmitted = false, reviewResult = null } = options;

    if (mode === "review") {
      return this.renderReviewMode(question, index, reviewResult);
    }

    return this.renderExamMode(question, index, isSubmitted);
  }

  static renderExamMode(question, index, isSubmitted = false) {
    const type = question.type;
    const cardId = `card-${question.id}`;
    const answerId = `answer-${question.id}`;

    let inputHTML = "";

    switch (type) {
      case CONFIG.QUESTION_TYPES.FILL:
        inputHTML = this.renderFillInput(answerId, isSubmitted);
        break;
      case CONFIG.QUESTION_TYPES.SINGLE:
        inputHTML = this.renderSingleChoice(question, answerId, isSubmitted);
        break;
      case CONFIG.QUESTION_TYPES.MULTIPLE:
        inputHTML = this.renderMultipleChoice(question, answerId, isSubmitted);
        break;
    }

    const card = document.createElement("div");
    card.className = "question-card";
    card.id = cardId;
    card.innerHTML = `
            <div class="question-header">
                <h3 class="question-number">Question ${index}</h3>
                <span class="question-topic">${question.topic || "General"}</span>
            </div>
            
            ${question.context ? `<p class="question-context"><em>"${question.context}"</em></p>` : ""}
            
            <div class="question-text">
                <p>${question.question}</p>
            </div>
            
            <div class="question-input" data-question-id="${question.id}">
                ${inputHTML}
            </div>
        `;

    return card;
  }

  static renderReviewMode(question, index, reviewResult) {
    const result = reviewResult || {
      questionId: question.id,
      userAnswer: "",
      correctAnswer: question.answer,
      isCorrect: false,
    };

    const type = question.type;
    const card = document.createElement("div");
    const statusClass = result.isCorrect ? "correct" : "wrong";
    const statusText = result.isCorrect ? "✅ Correct" : "❌ Incorrect";

    card.className = `question-card ${statusClass}`;
    card.id = `card-review-${question.id}`;

    let reviewHTML = "";

    if (type === CONFIG.QUESTION_TYPES.FILL) {
      reviewHTML = this.renderReviewFill(question, result);
    } else if (type === CONFIG.QUESTION_TYPES.SINGLE) {
      reviewHTML = this.renderReviewSingle(question, result);
    } else if (type === CONFIG.QUESTION_TYPES.MULTIPLE) {
      reviewHTML = this.renderReviewMultiple(question, result);
    }

    card.innerHTML = `
            <div class="question-header">
                <h3 class="question-number">Question ${index}</h3>
                <span class="question-topic">${question.topic || "General"}</span>
            </div>

            <div style="margin-bottom: 0.75rem; font-weight: 600; color: ${result.isCorrect ? "#16a34a" : "#dc2626"};">${statusText}</div>

            ${question.context ? `<p class="question-context"><em>"${question.context}"</em></p>` : ""}

            <div class="question-text">
                <p>${question.question}</p>
            </div>

            <div class="question-input" data-question-id="${question.id}">
                ${reviewHTML}
            </div>
        `;

    return card;
  }

  static renderReviewFill(question, reviewResult) {
    const userAnswer = reviewResult.userAnswer || "";
    const correctAnswer = reviewResult.correctAnswer || question.answer || "";

    return `
            <div>
                <label for="review-answer-${question.id}" style="display:block; margin-bottom: 0.5rem; font-weight: 600;">User Answer:</label>
                <input 
                    id="review-answer-${question.id}" 
                    type="text" 
                    class="fill-input" 
                    value="${this.escapeAttribute(userAnswer)}"
                    disabled
                >
            </div>
            <div style="margin-top: 0.75rem;">
                <span style="font-weight: 600;">Correct answer:</span>
                <span style="display: inline-block; margin-left: 0.5rem; padding: 0.2rem 0.45rem; background: #dcfce7; color: #166534; border-radius: 4px; font-weight: 600;">${this.escapeHtml(correctAnswer)}</span>
            </div>
        `;
  }

  static renderReviewSingle(question, reviewResult) {
    const options = this.getDisplayOptions(question);
    const userAnswer = (reviewResult.userAnswer || "").trim().toUpperCase();
    const correctAnswer = (reviewResult.correctAnswer || question.answer || "")
      .trim()
      .toUpperCase();
    const userAnswerDisplay = userAnswer
      ? this.formatSingleAnswerDisplay(userAnswer, options)
      : "(No answer)";
    const correctAnswerDisplay = this.formatSingleAnswerDisplay(
      correctAnswer,
      options,
    );

    const optionsHTML = Object.entries(options)
      .map(([letter, text]) => {
        const normalizedLetter = letter.trim().toUpperCase();
        const isCorrectOption = normalizedLetter === correctAnswer;
        const isUserSelected = normalizedLetter === userAnswer;
        const style = this.getSingleReviewStyle(
          isCorrectOption,
          isUserSelected,
          reviewResult.isCorrect,
        );
        const checked = isUserSelected ? "checked" : "";

        return `
                <div class="option" style="${style}">
                    <input
                        type="radio"
                        id="review-answer-${question.id}-${normalizedLetter}"
                        name="review-answer-${question.id}"
                        value="${normalizedLetter}"
                        ${checked}
                        disabled
                    >
                    <label for="review-answer-${question.id}-${normalizedLetter}">${normalizedLetter}: ${this.escapeHtml(text)}</label>
                </div>
            `;
      })
      .join("");

    return `
            ${optionsHTML}
        <div style="margin-top: 0.75rem; display: grid; gap: 0.35rem; font-size: 0.92rem; color: #374151;">
          <div><strong>Your answer:</strong> <span style="color:${reviewResult.isCorrect ? "#166534" : "#dc2626"}; font-weight:600;">${this.escapeHtml(userAnswerDisplay)}</span></div>
          <div><strong>Correct answer:</strong> <span style="color:#166534; font-weight:600;">${this.escapeHtml(correctAnswerDisplay)}</span></div>
            </div>
        `;
  }

  static renderReviewMultiple(question, reviewResult) {
    const options = this.getDisplayOptions(question);
    const userSet = this.parseAnswerSet(reviewResult.userAnswer);
    const correctSet = this.parseAnswerSet(
      reviewResult.correctAnswer || question.answer,
    );
    const userAnswerDisplay = this.formatMultipleAnswerDisplay(
      userSet,
      options,
    );
    const correctAnswerDisplay = this.formatMultipleAnswerDisplay(
      correctSet,
      options,
    );

    const optionsHTML = Object.entries(options)
      .map(([letter, text]) => {
        const normalizedLetter = letter.trim().toUpperCase();
        const isUserSelected = userSet.has(normalizedLetter);
        const isCorrectOption = correctSet.has(normalizedLetter);
        const checked = isUserSelected ? "checked" : "";
        const style = this.getMultipleReviewStyle(
          isCorrectOption,
          isUserSelected,
        );

        return `
                <div class="option" style="${style}">
                    <input
                        type="checkbox"
                        id="review-answer-${question.id}-${normalizedLetter}"
                        name="review-answer-${question.id}"
                        value="${normalizedLetter}"
                        ${checked}
                        disabled
                    >
                    <label for="review-answer-${question.id}-${normalizedLetter}">${normalizedLetter}: ${this.escapeHtml(text)}</label>
                </div>
            `;
      })
      .join("");

    return `
            ${optionsHTML}
        <div style="margin-top: 0.75rem; display: grid; gap: 0.35rem; font-size: 0.92rem; color: #374151;">
          <div><strong>Your answer:</strong> <span style="color:${reviewResult.isCorrect ? "#166534" : "#dc2626"}; font-weight:600;">${this.escapeHtml(userAnswerDisplay)}</span></div>
          <div><strong>Correct answer:</strong> <span style="color:#166534; font-weight:600;">${this.escapeHtml(correctAnswerDisplay)}</span></div>
            </div>
        `;
  }

  static renderFillInput(answerId, isSubmitted) {
    const disabled = isSubmitted ? "disabled" : "";
    return `<input 
            id="${answerId}" 
            type="text" 
            class="fill-input" 
            placeholder="Enter answer here..." 
            ${disabled}
            data-question-id="${answerId.replace("answer-", "")}"
        >`;
  }

  static renderSingleChoice(question, answerId, isSubmitted) {
    const options = this.getDisplayOptions(question);
    const disabled = isSubmitted ? "disabled" : "";

    return Object.entries(options)
      .map(
        ([letter, text]) => `
            <div class="option">
                <input 
                    type="radio" 
                    id="${answerId}-${letter}" 
                    name="${answerId}" 
                    value="${letter}" 
                    ${disabled}
                    data-question-id="${answerId.replace("answer-", "")}"
                >
                <label for="${answerId}-${letter}">${letter}: ${text}</label>
            </div>
        `,
      )
      .join("");
  }

  static renderMultipleChoice(question, answerId, isSubmitted) {
    const options = this.getDisplayOptions(question);
    const disabled = isSubmitted ? "disabled" : "";

    return Object.entries(options)
      .map(
        ([letter, text]) => `
            <div class="option">
                <input 
                    type="checkbox" 
                    id="${answerId}-${letter}" 
                    name="${answerId}" 
                    value="${letter}" 
                    ${disabled}
                    data-question-id="${answerId.replace("answer-", "")}"
                    class="multiple-choice-checkbox"
                >
                <label for="${answerId}-${letter}">${letter}: ${text}</label>
            </div>
        `,
      )
      .join("");
  }

  /**
   * Get user answer from card
   */
  static getUserAnswer(questionId, questionType) {
    const answerId = `answer-${questionId}`;

    switch (questionType) {
      case CONFIG.QUESTION_TYPES.FILL: {
        const input = document.getElementById(answerId);
        return input ? input.value : "";
      }
      case CONFIG.QUESTION_TYPES.SINGLE: {
        const selected = document.querySelector(
          `input[name="${answerId}"]:checked`,
        );
        return selected ? selected.value : "";
      }
      case CONFIG.QUESTION_TYPES.MULTIPLE: {
        const checked = document.querySelectorAll(
          `input[name="${answerId}"]:checked`,
        );
        return Array.from(checked)
          .map((cb) => cb.value)
          .sort()
          .join(",");
      }
      default:
        return "";
    }
  }

  /**
   * Mark card as correct or wrong
   */
  static markCard(questionId, isCorrect) {
    const card = document.getElementById(`card-${questionId}`);
    if (card) {
      if (isCorrect) {
        card.classList.add("correct");
      } else {
        card.classList.add("wrong");
      }
    }
  }

  /**
   * Set answer in card
   */
  static setAnswer(questionId, answer, questionType) {
    const answerId = `answer-${questionId}`;

    switch (questionType) {
      case CONFIG.QUESTION_TYPES.FILL: {
        const input = document.getElementById(answerId);
        if (input) input.value = answer;
        break;
      }
      case CONFIG.QUESTION_TYPES.SINGLE: {
        const radio = document.getElementById(`${answerId}-${answer}`);
        if (radio) radio.checked = true;
        break;
      }
      case CONFIG.QUESTION_TYPES.MULTIPLE: {
        const letters = (answer || "").split(",").map((a) => a.trim());
        letters.forEach((letter) => {
          const checkbox = document.getElementById(`${answerId}-${letter}`);
          if (checkbox) checkbox.checked = true;
        });
        break;
      }
    }
  }

  static parseAnswerSet(answer) {
    return new Set(
      (answer || "")
        .split(",")
        .map((value) => value.trim().toUpperCase())
        .filter(Boolean),
    );
  }

  static getDisplayOptions(question) {
    // Runtime layer may provide shuffled options; fallback keeps old behavior.
    return question.shuffledOptions || question.options || {};
  }

  static formatSingleAnswerDisplay(letter, options) {
    if (!letter) return "(No answer)";
    const optionText = options[letter] || "";
    return optionText ? `${letter}: ${optionText}` : letter;
  }

  static formatMultipleAnswerDisplay(answerSet, options) {
    if (!answerSet || answerSet.size === 0) {
      return "(No answer)";
    }

    return Array.from(answerSet)
      .sort()
      .map((letter) => this.formatSingleAnswerDisplay(letter, options))
      .join(" | ");
  }

  static getSingleReviewStyle(
    isCorrectOption,
    isUserSelected,
    questionIsCorrect,
  ) {
    if (isCorrectOption) {
      return "background:#dcfce7;border:1px solid #16a34a;";
    }

    if (isUserSelected && !questionIsCorrect) {
      return "background:#fee2e2;border:1px solid #dc2626;";
    }

    return "";
  }

  static getMultipleReviewStyle(isCorrectOption, isUserSelected) {
    if (isCorrectOption && isUserSelected) {
      return "background:#dcfce7;border:1px solid #16a34a;";
    }

    if (!isCorrectOption && isUserSelected) {
      return "background:#fee2e2;border:1px solid #dc2626;";
    }

    if (isCorrectOption && !isUserSelected) {
      return "background:#ffffff;border:1px dashed #16a34a;";
    }

    return "";
  }

  static escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  static escapeAttribute(value) {
    return this.escapeHtml(value).replace(/`/g, "&#96;");
  }
}
