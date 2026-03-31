/**
 * Question Parser
 * Parses TXT files to extract question objects
 */
const QuestionParser = (() => {
  const parseFile = (content) => {
    const questions = [];
    const blocks = content
      .split("===QUESTION===")
      .filter((block) => block.trim());

    for (const block of blocks) {
      const question = parseBlock(block);
      if (question) {
        questions.push(question);
      }
    }

    return questions;
  };

  const parseBlock = (block) => {
    const lines = block.trim().split("\n");
    const data = {};
    let multilineMode = null;
    let multilineContent = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith("id:")) {
        data.id = line.substring(3).trim();
      } else if (line.startsWith("topic:")) {
        data.topic = line.substring(6).trim();
      } else if (line.startsWith("context:")) {
        data.context = line.substring(8).trim();
        multilineMode = null;
      } else if (line.startsWith("type:")) {
        data.type = line.substring(5).trim();
        multilineMode = null;
      } else if (line.startsWith("question:")) {
        multilineMode = "question";
        const rest = line.substring(9).trim();
        multilineContent = rest ? [rest] : [];
      } else if (line.startsWith("answer:")) {
        if (multilineMode === "question" && multilineContent.length > 0) {
          data.question = multilineContent.join("\n").trim();
        }
        data.answer = line.substring(7).trim();
        multilineMode = null;
      } else if (line.match(/^[A-D]:/)) {
        if (!data.options) data.options = {};
        const key = line[0];
        data.options[key] = line.substring(2).trim();
        multilineMode = null;
      } else if (line.trim()) {
        if (multilineMode === "question") {
          multilineContent.push(line);
        }
      }
    }

    if (multilineMode === "question" && multilineContent.length > 0) {
      data.question = multilineContent.join("\n").trim();
    }

    // Validate required fields
    if (data.id && data.type && data.question && data.answer) {
      return data;
    }

    return null;
  };

  return {
    parseFile,
  };
})();

/**
 * Storage Manager
 * Handles localStorage for progress tracking
 */
const StorageManager = (() => {
  const STORAGE_KEY_SCORES = "exam_scores_history";
  const STORAGE_KEY_WRONG_COUNT = "exam_wrong_count";

  const getScoresHistory = () => {
    const data = localStorage.getItem(STORAGE_KEY_SCORES);
    return data ? JSON.parse(data) : [];
  };

  const addScore = (examName, score, total) => {
    const history = getScoresHistory();
    history.push({
      exam: examName,
      score,
      total,
      percentage: Math.round((score / total) * 100),
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEY_SCORES, JSON.stringify(history));
  };

  const getWrongCounts = () => {
    const data = localStorage.getItem(STORAGE_KEY_WRONG_COUNT);
    return data ? JSON.parse(data) : {};
  };

  const recordWrongAnswer = (questionId) => {
    const counts = getWrongCounts();
    counts[questionId] = (counts[questionId] || 0) + 1;
    localStorage.setItem(STORAGE_KEY_WRONG_COUNT, JSON.stringify(counts));
  };

  const getWeakQuestions = (allQuestions, threshold = 2) => {
    const wrongCounts = getWrongCounts();
    return allQuestions.filter((q) => (wrongCounts[q.id] || 0) >= threshold);
  };

  return {
    getScoresHistory,
    addScore,
    getWrongCounts,
    recordWrongAnswer,
    getWeakQuestions,
  };
})();

/**
 * Grader
 * Compares user answers with correct answers
 */
const Grader = (() => {
  const gradeQuestion = (question, userAnswer) => {
    const correctAnswer = question.answer.trim();

    if (question.type === "fill") {
      return gradeFill(userAnswer, correctAnswer);
    } else if (question.type === "single") {
      return gradeSingle(userAnswer, correctAnswer);
    } else if (question.type === "multiple") {
      return gradeMultiple(userAnswer, correctAnswer);
    }

    return false;
  };

  const gradeFill = (userAnswer, correctAnswer) => {
    return userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
  };

  const gradeSingle = (userAnswer, correctAnswer) => {
    return userAnswer.trim().toUpperCase() === correctAnswer.toUpperCase();
  };

  const gradeMultiple = (userAnswer, correctAnswer) => {
    const userAnswers = userAnswer
      .split(",")
      .map((a) => a.trim().toUpperCase())
      .sort();
    const correctAnswers = correctAnswer
      .split(",")
      .map((a) => a.trim().toUpperCase())
      .sort();

    if (userAnswers.length !== correctAnswers.length) {
      return false;
    }

    return userAnswers.every((a, i) => a === correctAnswers[i]);
  };

  return {
    gradeQuestion,
  };
})();

/**
 * Renderer
 * Renders UI components
 */
const Renderer = (() => {
  const renderExamSelector = (exams) => {
    const container = document.getElementById("examList");
    container.innerHTML = "";

    for (const exam of exams) {
      const btn = document.createElement("button");
      btn.className = "exam-btn";
      btn.type = "button";
      btn.textContent = exam.label;
      btn.dataset.examId = exam.id;
      btn.onclick = () => ExamEngine.startExam(exam.id, exam.label, exam.file);
      container.appendChild(btn);
    }
  };

  const renderQuestions = (questions, submitted = false) => {
    const container = document.getElementById("questionsContainer");
    container.innerHTML = "";

    questions.forEach((question, index) => {
      const card = document.createElement("div");
      card.className = "question-card";
      card.id = `question-${question.id}`;

      let contentHTML = `
        <div class="question-number">Question ${index + 1}</div>
        ${question.topic ? `<span class="question-topic">${escapeHtml(question.topic)}</span>` : ""}
        ${question.context ? `<div class="question-context">${escapeHtml(question.context)}</div>` : ""}
        <div class="question-text">${escapeHtml(question.question)}</div>
      `;

      if (question.type === "fill") {
        contentHTML += renderFillInput(question, submitted);
      } else if (question.type === "single") {
        contentHTML += renderSingleChoice(question, submitted);
      } else if (question.type === "multiple") {
        contentHTML += renderMultipleChoice(question, submitted);
      }

      card.innerHTML = contentHTML;

      if (submitted) {
        card.classList.add("submitted");
      }

      container.appendChild(card);
    });
  };

  const renderFillInput = (question, submitted) => {
    const value = document.getElementById(`answer-${question.id}`)?.value || "";
    const disabled = submitted ? "disabled" : "";
    return `
      <div class="form-group">
        <input
          type="text"
          id="answer-${question.id}"
          class="fill-input"
          placeholder="Enter your answer"
          value="${escapeHtml(value)}"
          ${disabled}
        />
      </div>
    `;
  };

  const renderSingleChoice = (question, submitted) => {
    const selectedValue =
      document.querySelector(`input[name="answer-${question.id}"]:checked`)
        ?.value || "";
    const disabled = submitted ? "disabled" : "";
    const optionKeys = ["A", "B", "C", "D"];
    let html = '<div class="form-group options">';

    for (const key of optionKeys) {
      if (question.options && question.options[key]) {
        const checked = selectedValue === key ? "checked" : "";
        html += `
          <label class="option-label">
            <input
              type="radio"
              name="answer-${question.id}"
              value="${key}"
              ${checked}
              ${disabled}
            />
            <span class="option-text"><strong>${key}:</strong> ${escapeHtml(question.options[key])}</span>
          </label>
        `;
      }
    }

    html += "</div>";
    return html;
  };

  const renderMultipleChoice = (question, submitted) => {
    const selectedValues = Array.from(
      document.querySelectorAll(`input[name="answer-${question.id}"]:checked`),
    ).map((el) => el.value);
    const disabled = submitted ? "disabled" : "";
    const optionKeys = ["A", "B", "C", "D"];
    let html = '<div class="form-group options">';

    for (const key of optionKeys) {
      if (question.options && question.options[key]) {
        const checked = selectedValues.includes(key) ? "checked" : "";
        html += `
          <label class="option-label">
            <input
              type="checkbox"
              name="answer-${question.id}"
              value="${key}"
              ${checked}
              ${disabled}
            />
            <span class="option-text"><strong>${key}:</strong> ${escapeHtml(question.options[key])}</span>
          </label>
        `;
      }
    }

    html += "</div>";
    return html;
  };

  const renderResults = (questions, gradeResults) => {
    document.getElementById("selectorPage").classList.remove("active");
    document.getElementById("examPage").classList.remove("active");
    document.getElementById("resultsPage").classList.add("active");

    const correctCount = gradeResults.filter((r) => r.isCorrect).length;
    const totalCount = gradeResults.length;
    const percentage = Math.round((correctCount / totalCount) * 100);

    document.getElementById("totalScore").textContent =
      `${correctCount}/${totalCount}`;
    document.getElementById("correctCount").textContent = correctCount;
    document.getElementById("wrongCount").textContent =
      totalCount - correctCount;
    document.getElementById("percentage").textContent = `${percentage}%`;

    const feedbackContainer = document.getElementById("resultsFeedback");
    feedbackContainer.innerHTML = "";

    questions.forEach((question, index) => {
      const result = gradeResults[index];
      const item = document.createElement("div");
      item.className = `result-item ${result.isCorrect ? "correct" : "wrong"}`;

      let answerDisplay = "";

      if (question.type === "fill") {
        answerDisplay = `Your answer: <span class="result-answer-label">"${escapeHtml(result.userAnswer)}"</span>`;
      } else if (question.type === "single") {
        answerDisplay = `Your answer: <span class="result-answer-label">${result.userAnswer}</span>`;
      } else if (question.type === "multiple") {
        answerDisplay = `Your answer: <span class="result-answer-label">${result.userAnswer || "Not answered"}</span>`;
      }

      item.innerHTML = `
        <div class="result-header">
          <span>${result.isCorrect ? "✓ Correct" : "✗ Wrong"}</span>
          <div class="question-id">Q${index + 1}: ${escapeHtml(question.id)}</div>
        </div>
        <div class="result-answer">${answerDisplay}</div>
        <div class="result-answer">Correct answer: <span class="result-answer-label">${escapeHtml(result.correctAnswer)}</span></div>
      `;

      feedbackContainer.appendChild(item);
    });
  };

  return {
    renderExamSelector,
    renderQuestions,
    renderResults,
  };
})();

/**
 * Exam Engine
 * Main exam management logic
 */
const ExamEngine = (() => {
  let currentExamQuestions = [];
  let currentExamName = "";
  let currentExamFile = "";
  let isSubmitted = false;

  const loadExamFile = async (filename) => {
    try {
      const response = await fetch(filename);

      if (!response.ok) throw new Error(`Failed to load ${filename}`);
      const text = await response.text();
      return QuestionParser.parseFile(text);
    } catch (error) {
      console.error("Error loading exam file:", error);
      alert(`Error loading exam: ${error.message}`);
      return [];
    }
  };

  const shuffleArray = (array) => {
    const arr = [...array];

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  };

  const startExam = async (examId, examLabel, examFile) => {
    currentExamName = examLabel;
    currentExamFile = examFile;
    isSubmitted = false;

    const questions = await loadExamFile(examFile);

    if (questions.length === 0) {
      alert("No questions loaded from the exam file.");
      return;
    }

    // Shuffle questions while preserving their identity
    currentExamQuestions = shuffleArray(questions);

    // Render questions
    Renderer.renderQuestions(currentExamQuestions, false);

    // Update UI
    document.getElementById("selectorPage").classList.remove("active");
    document.getElementById("examPage").classList.add("active");
    document.getElementById("examTitleDisplay").textContent = examLabel;
    document.getElementById("questionCount").textContent =
      `(${currentExamQuestions.length} questions)`;

    // Reset scroll
    window.scrollTo(0, 0);
  };

  const submitExam = () => {
    if (isSubmitted) {
      alert("Exam already submitted!");
      return;
    }

    isSubmitted = true;

    // Collect answers
    const gradeResults = [];

    for (const question of currentExamQuestions) {
      const userAnswer = getUserAnswer(question);
      const isCorrect = Grader.gradeQuestion(question, userAnswer);

      gradeResults.push({
        userAnswer,
        correctAnswer: question.answer,
        isCorrect,
      });

      // Track wrong answers
      if (!isCorrect) {
        StorageManager.recordWrongAnswer(question.id);
      }
    }

    // Save score
    const correctCount = gradeResults.filter((r) => r.isCorrect).length;
    StorageManager.addScore(
      currentExamName,
      correctCount,
      currentExamQuestions.length,
    );

    // Render results
    Renderer.renderResults(currentExamQuestions, gradeResults);
  };

  const getUserAnswer = (question) => {
    if (question.type === "fill") {
      const input = document.getElementById(`answer-${question.id}`);
      return input ? input.value : "";
    } else if (question.type === "single") {
      const radio = document.querySelector(
        `input[name="answer-${question.id}"]:checked`,
      );
      return radio ? radio.value : "";
    } else if (question.type === "multiple") {
      const checkboxes = Array.from(
        document.querySelectorAll(
          `input[name="answer-${question.id}"]:checked`,
        ),
      );
      return checkboxes
        .map((cb) => cb.value)
        .sort()
        .join(",");
    }

    return "";
  };

  const retakeExam = async () => {
    // Reload the same exam but with shuffled questions
    if (currentExamFile) {
      await startExam(currentExamName, currentExamName, currentExamFile);
    }
  };

  return {
    startExam,
    submitExam,
    retakeExam,
  };
})();

/**
 * UI Event Listeners
 */
const initializeUI = () => {
  // Exam selector
  const exams = [
    {
      id: "Chuong_1_De_1",
      label: "Chapter 1 - Exam 1",
      file: "Chuong_1_De_1.txt",
    },
    {
      id: "Chuong_1_De_2",
      label: "Chapter 1 - Exam 2",
      file: "Chuong_1_De_2.txt",
    },
    {
      id: "Chuong_2_De_1",
      label: "Chapter 2 - Exam 1",
      file: "Chuong_2_De_1.txt",
    },
    {
      id: "Chuong_2_De_2",
      label: "Chapter 2 - Exam 2",
      file: "Chuong_2_De_2.txt",
    },
    {
      id: "Chuong_3_De_1",
      label: "Chapter 3 - Exam 1",
      file: "Chuong_3_De_1.txt",
    },
    {
      id: "Chuong_3_De_2",
      label: "Chapter 3 - Exam 2",
      file: "Chuong_3_De_2.txt",
    },
    {
      id: "Chuong_4.1_De_1",
      label: "Chapter 4.1 - Exam 1",
      file: "Chuong_4.1_De_1.txt",
    },
    {
      id: "Chuong_4.1_De_2",
      label: "Chapter 4.1 - Exam 2",
      file: "Chuong_4.1_De_2.txt",
    },
    {
      id: "Chuong_4.2_De_1",
      label: "Chapter 4.2 - Exam 1",
      file: "Chuong_4.2_De_1.txt",
    },
    {
      id: "Chuong_4.2_De_2",
      label: "Chapter 4.2 - Exam 2",
      file: "Chuong_4.2_De_2.txt",
    },
    {
      id: "Chuong_5_De_1",
      label: "Chapter 5 - Exam 1",
      file: "Chuong_5_De_1.txt",
    },
    {
      id: "Chuong_5_De_2",
      label: "Chapter 5 - Exam 2",
      file: "Chuong_5_De_2.txt",
    },
  ];

  Renderer.renderExamSelector(exams);

  // Event listeners
  document.getElementById("submitBtn").onclick = ExamEngine.submitExam;
  document.getElementById("backBtn").onclick = goBackToSelector;
  document.getElementById("retakeBtn").onclick = retakeExam;
  document.getElementById("backToSelectorBtn").onclick = goBackToSelector;
  document.getElementById("practiceWeakBtn").onclick = practiceWeakQuestions;
};

const goBackToSelector = () => {
  document.getElementById("selectorPage").classList.add("active");
  document.getElementById("examPage").classList.remove("active");
  document.getElementById("resultsPage").classList.remove("active");
  window.scrollTo(0, 0);
};

const retakeExam = () => {
  ExamEngine.retakeExam();
};

const practiceWeakQuestions = async () => {
  const allQuestions = [];

  const exams = [
    { id: "Chuong_1_De_1", file: "Chuong_1_De_1.txt" },
    { id: "Chuong_1_De_2", file: "Chuong_1_De_2.txt" },
    { id: "Chuong_2_De_1", file: "Chuong_2_De_1.txt" },
    { id: "Chuong_2_De_2", file: "Chuong_2_De_2.txt" },
    { id: "Chuong_3_De_1", file: "Chuong_3_De_1.txt" },
    { id: "Chuong_3_De_2", file: "Chuong_3_De_2.txt" },
    { id: "Chuong_4.1_De_1", file: "Chuong_4.1_De_1.txt" },
    { id: "Chuong_4.1_De_2", file: "Chuong_4.1_De_2.txt" },
    { id: "Chuong_4.2_De_1", file: "Chuong_4.2_De_1.txt" },
    { id: "Chuong_4.2_De_2", file: "Chuong_4.2_De_2.txt" },
    { id: "Chuong_5_De_1", file: "Chuong_5_De_1.txt" },
    { id: "Chuong_5_De_2", file: "Chuong_5_De_2.txt" },
  ];

  // Load all questions
  for (const exam of exams) {
    try {
      const response = await fetch(exam.file);

      if (response.ok) {
        const text = await response.text();
        const questions = QuestionParser.parseFile(text);
        allQuestions.push(...questions);
      }
    } catch (e) {
      console.error(`Failed to load ${exam.file}:`, e);
    }
  }

  // Get weak questions
  const weakQuestions = StorageManager.getWeakQuestions(allQuestions, 1);

  if (weakQuestions.length === 0) {
    alert("No weak questions found. You are doing great!");
    return;
  }

  // Start exam with weak questions
  alert(
    `Found ${weakQuestions.length} weak questions. Practice mode not fully implemented yet.`,
  );
};

const escapeHtml = (text) => {
  if (!text) return "";
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

// Initialize on page load
document.addEventListener("DOMContentLoaded", initializeUI);
