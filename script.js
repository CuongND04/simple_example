const EXAM_SOURCES = [
  { id: "quest1", label: "De 1", file: "quest1.txt" },
  { id: "quest2", label: "De 2", file: "quest2.txt" },
  { id: "quest3", label: "De 3", file: "quest3.txt" },
  { id: "quest4_1", label: "De 4.1", file: "quest4.1.txt" },
  { id: "quest4_2", label: "De 4.2", file: "quest4.2.txt" },
];

const FINAL_SIZE_PER_EXAM = 10;
const EXAM_DURATION_SECONDS = 40 * 60;
const ANSWER_SPLIT_REGEX = /(ĐÁP\s*ÁN|DAP\s*AN)/i;
const PART_II_REGEX = /(PHẦN|PHAN)\s*II/i;
const QUESTION_REGEX =
  /(Câu|Cau)\s+(\d+)\.\s*([\s\S]*?)(?=\n\s*(Câu|Cau)\s+\d+\.|$)/gi;

const state = {
  pools: {},
  activeExamType: null,
  activeExamLabel: "",
  activeQuestions: [],
  timerLeft: EXAM_DURATION_SECONDS,
  timerId: null,
};

const ui = {
  homeView: document.getElementById("home-view"),
  examView: document.getElementById("exam-view"),
  resultView: document.getElementById("result-view"),
  examButtons: document.getElementById("exam-buttons"),
  loadingStatus: document.getElementById("loading-status"),
  examTitle: document.getElementById("exam-title"),
  examSubtitle: document.getElementById("exam-subtitle"),
  timer: document.getElementById("timer"),
  examForm: document.getElementById("exam-form"),
  submitBtn: document.getElementById("submit-btn"),
  backBtn: document.getElementById("back-btn"),
  resultSummary: document.getElementById("result-summary"),
  resultDetails: document.getElementById("result-details"),
  retryBtn: document.getElementById("retry-btn"),
  homeBtn: document.getElementById("home-btn"),
};

init();

async function init() {
  setupExamButtons();
  setupActions();
  await loadAllQuestionPools();
}

function setupExamButtons() {
  const buttons = EXAM_SOURCES.map((exam) => {
    return `<button class="btn btn-primary" data-exam-id="${exam.id}" disabled>${exam.label}</button>`;
  }).join("");

  ui.examButtons.innerHTML = `${buttons}<button class="btn btn-primary" data-exam-id="final" disabled>Final Test (50 cau)</button>`;
}

function setupActions() {
  ui.examButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-exam-id]");
    if (!button) {
      return;
    }

    const examId = button.getAttribute("data-exam-id");
    startExam(examId);
  });

  ui.submitBtn.addEventListener("click", () => submitExam(false));
  ui.backBtn.addEventListener("click", () => {
    stopTimer();
    showView("home");
  });

  ui.homeBtn.addEventListener("click", () => showView("home"));
  ui.retryBtn.addEventListener("click", () => {
    if (state.activeExamType) {
      startExam(state.activeExamType);
    }
  });
}

async function loadAllQuestionPools() {
  try {
    const loadTasks = EXAM_SOURCES.map(async (exam) => {
      const response = await fetch(exam.file);
      if (!response.ok) {
        throw new Error(`Khong the doc file ${exam.file}`);
      }

      const text = await response.text();
      const parsed = parseQuestionFile(text, exam.id);
      if (!parsed.length) {
        throw new Error(`Khong tim thay cau hoi trong ${exam.file}`);
      }
      state.pools[exam.id] = parsed;
    });

    await Promise.all(loadTasks);

    [...ui.examButtons.querySelectorAll("button")].forEach((button) => {
      button.disabled = false;
    });

    ui.loadingStatus.textContent = "Da tai xong ngan hang cau hoi.";
  } catch (error) {
    ui.loadingStatus.textContent = `Loi: ${error.message}`;
    console.error(error);
  }
}

function parseQuestionFile(content, examId) {
  const split = content.split(ANSWER_SPLIT_REGEX);
  const questionPart = split[0] || "";
  const answerPart = split.slice(1).join(" ") || "";

  const questionSections = splitByPart(questionPart);
  const answerSections = splitByPart(answerPart);

  const result = [];

  ["I", "II"].forEach((partKey) => {
    const questions = parseQuestions(questionSections[partKey] || "");
    const answers = parseAnswers(answerSections[partKey] || "");

    for (const question of questions) {
      const answer = answers.get(question.number) || "";
      const hasAnswerOption = question.options.some(
        (option) => option.key === answer,
      );
      if (!question.options.length || !answer || !hasAnswerOption) {
        continue;
      }

      result.push({
        uid: `${examId}-${partKey}-${question.number}`,
        number: question.number,
        part: partKey,
        prompt: question.prompt,
        options: question.options,
        answer,
      });
    }
  });

  return result;
}

function splitByPart(rawText) {
  const sections = { I: "", II: "" };
  const matchPartII = rawText.search(PART_II_REGEX);

  if (matchPartII === -1) {
    sections.I = rawText;
    return sections;
  }

  sections.I = rawText.slice(0, matchPartII);
  sections.II = rawText.slice(matchPartII);
  return sections;
}

function parseQuestions(sectionText) {
  const matches = [...sectionText.matchAll(QUESTION_REGEX)];

  return matches
    .map((match) => {
      const number = Number(match[2]);
      const body = match[3]
        .replace(/\r/g, " ")
        .replace(/\n+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      const firstOption = body.search(/[A-D]\.\s/);
      if (firstOption < 0) {
        return null;
      }

      const prompt = body.slice(0, firstOption).trim();
      const optionText = body.slice(firstOption).trim();
      const options = [];

      const optionMatches = optionText.matchAll(
        /([A-D])\.\s*([\s\S]*?)(?=(?:\s+[A-D]\.\s)|$)/g,
      );
      for (const optionMatch of optionMatches) {
        options.push({
          key: optionMatch[1].toUpperCase(),
          text: optionMatch[2].trim(),
        });
      }

      const dedupedOptions = [];
      const seen = new Set();
      options.forEach((option) => {
        if (seen.has(option.key)) {
          return;
        }
        seen.add(option.key);
        dedupedOptions.push(option);
      });

      return {
        number,
        prompt,
        options: dedupedOptions,
      };
    })
    .filter((q) => q && q.prompt && q.options.length >= 2);
}

function parseAnswers(sectionText) {
  const map = new Map();
  const matches = [...sectionText.matchAll(/(\d+)\.\s*([A-D])/gi)];

  matches.forEach((match) => {
    map.set(Number(match[1]), match[2].toUpperCase());
  });

  return map;
}

function startExam(examId) {
  if (examId === "final") {
    state.activeQuestions = buildFinalExamQuestions();
    state.activeExamLabel = "Final Test";
  } else {
    const source = EXAM_SOURCES.find((item) => item.id === examId);
    const pool = state.pools[examId] || [];
    state.activeQuestions = shuffleArray(pool);
    state.activeExamLabel = source ? source.label : "De thi";
  }

  state.activeExamType = examId;
  state.timerLeft = EXAM_DURATION_SECONDS;

  renderExam();
  startTimer();
  showView("exam");
}

function buildFinalExamQuestions() {
  const all = [];

  EXAM_SOURCES.forEach((exam) => {
    const pool = state.pools[exam.id] || [];
    const picked = shuffleArray(pool).slice(0, FINAL_SIZE_PER_EXAM);
    all.push(...picked.map((q) => ({ ...q, sourceLabel: exam.label })));
  });

  return shuffleArray(all);
}

function renderExam() {
  const subtitle =
    state.activeExamType === "final"
      ? "50 cau (moi de 10 cau), thoi gian 40 phut"
      : "40 cau day du tu de goc, random thu tu, thoi gian 40 phut";

  ui.examTitle.textContent = state.activeExamLabel;
  ui.examSubtitle.textContent = subtitle;
  ui.timer.textContent = formatTime(state.timerLeft);

  ui.examForm.innerHTML = state.activeQuestions
    .map((q, index) => {
      const optionsHtml = q.options
        .map((option) => {
          return `<label class="option"><input type="radio" name="q_${index}" value="${option.key}" /> <span><strong>${option.key}.</strong> ${escapeHtml(option.text)}</span></label>`;
        })
        .join("");

      const sourceTag = q.sourceLabel
        ? `<p class="muted">Nguon: ${q.sourceLabel}</p>`
        : "";

      return `<article class="question-card"><h3>Cau ${index + 1}: ${escapeHtml(q.prompt)}</h3>${sourceTag}${optionsHtml}</article>`;
    })
    .join("");
}

function startTimer() {
  stopTimer();
  state.timerId = setInterval(() => {
    state.timerLeft -= 1;
    ui.timer.textContent = formatTime(state.timerLeft);

    if (state.timerLeft <= 0) {
      stopTimer();
      submitExam(true);
    }
  }, 1000);
}

function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function submitExam(isTimeUp) {
  stopTimer();

  const answers = state.activeQuestions.map((_, index) => {
    const selected = ui.examForm.querySelector(
      `input[name="q_${index}"]:checked`,
    );
    return selected ? selected.value : "";
  });

  let correctCount = 0;
  const detailHtml = state.activeQuestions
    .map((question, index) => {
      const selected = answers[index];
      const isCorrect = selected && selected === question.answer;
      if (isCorrect) {
        correctCount += 1;
      }

      return `
        <div class="result-item ${isCorrect ? "ok" : "bad"}">
          <div class="result-status ${isCorrect ? "ok" : "bad"}">${isCorrect ? "Dung" : "Sai"}</div>
          <p><strong>Cau ${index + 1}:</strong> ${escapeHtml(question.prompt)}</p>
          <p>Ban chon: <strong>${selected || "(bo trong)"}</strong></p>
          <p>Dap an dung: <strong>${question.answer}</strong></p>
        </div>
      `;
    })
    .join("");

  const total = state.activeQuestions.length;
  const score10 = ((correctCount / total) * 10).toFixed(2);
  const timeMessage = isTimeUp ? " (Het gio)" : "";

  ui.resultSummary.textContent = `Dung ${correctCount}/${total} cau. Diem quy doi: ${score10}/10.${timeMessage}`;
  ui.resultDetails.innerHTML = detailHtml;

  showView("result");
}

function showView(name) {
  ui.homeView.classList.toggle("hidden", name !== "home");
  ui.examView.classList.toggle("hidden", name !== "exam");
  ui.resultView.classList.toggle("hidden", name !== "result");
}

function formatTime(totalSeconds) {
  const safe = Math.max(0, totalSeconds);
  const mins = Math.floor(safe / 60)
    .toString()
    .padStart(2, "0");
  const secs = (safe % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function shuffleArray(input) {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
