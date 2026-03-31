const EXAM_SOURCES = [
  { id: "quest1", label: "Đề 1", file: "quest1.txt" },
  { id: "quest2", label: "Đề 2", file: "quest2.txt" },
  { id: "quest3", label: "Đề 3", file: "quest3.txt" },
  { id: "quest4_1", label: "Đề 4.1", file: "quest4.1.txt" },
  { id: "quest4_2", label: "Đề 4.2", file: "quest4.2.txt" },
];

const THEORY_SOURCES = [
  "chap1_vi.md",
  "chap2_vi.md",
  "chap3_vi.md",
  "chap4.1_vi.md",
  "chap4.2_vi.md",
];

const THEORY_EXAM_ID = "theory_generated";
const FINAL_SIZE_PER_EXAM = 10;
const THEORY_EXAM_SIZE = 40;
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
  const examButtons = EXAM_SOURCES.map(
    (exam) =>
      `<button class="btn btn-primary" data-exam-id="${exam.id}" disabled>${exam.label}</button>`,
  ).join("");

  ui.examButtons.innerHTML = `${examButtons}<button class="btn btn-primary" data-exam-id="final" disabled>Final Test (50 câu)</button><button class="btn btn-primary" data-exam-id="${THEORY_EXAM_ID}" disabled>Đề bổ sung (từ lý thuyết)</button>`;
}

function setupActions() {
  ui.examButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-exam-id]");
    if (!button) {
      return;
    }
    startExam(button.getAttribute("data-exam-id"));
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
        throw new Error(`Không thể đọc file ${exam.file}`);
      }

      const text = await response.text();
      const parsed = parseQuestionFile(text, exam.id);
      if (!parsed.length) {
        throw new Error(`Không tìm thấy câu hỏi trong ${exam.file}`);
      }
      state.pools[exam.id] = parsed;
    });

    await Promise.all(loadTasks);

    const existingPromptSet = buildExistingPromptSet();

    const theoryTask = (async () => {
      try {
        const theoryTexts = await Promise.all(
          THEORY_SOURCES.map(async (file) => {
            const response = await fetch(file);
            if (!response.ok) {
              throw new Error(`Không thể đọc file ${file}`);
            }
            return response.text();
          }),
        );

        state.pools[THEORY_EXAM_ID] = buildTheoryQuestionPool(
          theoryTexts,
          existingPromptSet,
        );
      } catch (error) {
        state.pools[THEORY_EXAM_ID] = [];
        console.warn("Không thể tạo đề bổ sung từ lý thuyết:", error);
      }
    })();

    await theoryTask;

    [...ui.examButtons.querySelectorAll("button")].forEach((button) => {
      button.disabled = false;
    });

    ui.loadingStatus.textContent = `Đã tải xong ngân hàng câu hỏi. Đề bổ sung từ lý thuyết: ${(state.pools[THEORY_EXAM_ID] || []).length} câu.`;
  } catch (error) {
    ui.loadingStatus.textContent = `Lỗi: ${error.message}`;
    console.error(error);
  }
}

function parseQuestionFile(content, examId) {
  const split = content.split(ANSWER_SPLIT_REGEX);
  const questionPart = split[0] || "";
  const answerPart = split.slice(1).join(" ") || "";

  const questionSections = splitByPart(questionPart);
  const answerSections = splitByPart(answerPart);
  const explanationSections = parseExplanations(content);

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
        explanation:
          explanationSections[partKey].get(question.number) ||
          "Chưa có lời giải chi tiết cho câu này.",
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

      const seen = new Set();
      const dedupedOptions = options.filter((option) => {
        if (seen.has(option.key)) {
          return false;
        }
        seen.add(option.key);
        return true;
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

function parseExplanations(content) {
  const sections = { I: new Map(), II: new Map() };
  const split = content.split(/(LỜI\s*GIẢI|LOI\s*GIAI)/i);
  if (split.length < 3) {
    return sections;
  }

  const explanationRaw = split.slice(2).join(" ");
  const explanationByPart = splitByPart(explanationRaw);

  ["I", "II"].forEach((partKey) => {
    const matches = [
      ...explanationByPart[partKey].matchAll(
        /(Câu|Cau)\s+(\d+)\s*:\s*([\s\S]*?)(?=\n\s*(Câu|Cau)\s+\d+\s*:|$)/gi,
      ),
    ];

    matches.forEach((match) => {
      const number = Number(match[2]);
      const text = match[3]
        .replace(/\r/g, "\n")
        .replace(/\n{2,}/g, "\n")
        .replace(/\s+$/g, "")
        .trim();

      if (number && text) {
        sections[partKey].set(number, text);
      }
    });
  });

  return sections;
}

function startExam(examId) {
  if (examId === "final") {
    state.activeQuestions = buildFinalExamQuestions();
    state.activeExamLabel = "Final Test";
  } else if (examId === THEORY_EXAM_ID) {
    const pool = state.pools[THEORY_EXAM_ID] || [];
    state.activeQuestions = shuffleArray(pool).slice(0, THEORY_EXAM_SIZE);
    state.activeExamLabel = "Đề bổ sung (từ lý thuyết)";
  } else {
    const source = EXAM_SOURCES.find((item) => item.id === examId);
    const pool = state.pools[examId] || [];
    state.activeQuestions = shuffleArray(pool);
    state.activeExamLabel = source ? source.label : "Đề thi";
  }

  if (!state.activeQuestions.length) {
    ui.loadingStatus.textContent =
      "Chưa tạo được câu hỏi bổ sung. Vui lòng kiểm tra file lý thuyết.";
    showView("home");
    return;
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
      ? "50 câu (mỗi đề 10 câu), thời gian 40 phút"
      : state.activeExamType === THEORY_EXAM_ID
        ? `${state.activeQuestions.length} câu tạo từ chương 1 đến chương 4.2, thời gian 40 phút`
        : "40 câu đầy đủ từ đề gốc, ngẫu nhiên thứ tự, thời gian 40 phút";

  ui.examTitle.textContent = state.activeExamLabel;
  ui.examSubtitle.textContent = subtitle;
  ui.timer.textContent = formatTime(state.timerLeft);

  ui.examForm.innerHTML = state.activeQuestions
    .map((q, index) => {
      const optionsHtml = q.options
        .map(
          (option) =>
            `<label class="option"><input type="radio" name="q_${index}" value="${option.key}" /> <span><strong>${option.key}.</strong> ${escapeHtml(option.text)}</span></label>`,
        )
        .join("");

      const sourceTag = q.sourceLabel
        ? `<p class="muted">Nguồn: ${q.sourceLabel}</p>`
        : "";

      return `<article class="question-card"><h3>Câu ${index + 1}: ${escapeHtml(q.prompt)}</h3>${sourceTag}${optionsHtml}</article>`;
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
      const correctOption = question.options.find(
        (option) => option.key === question.answer,
      );

      const isCorrect = selected && selected === question.answer;
      if (isCorrect) {
        correctCount += 1;
      }

      const optionsHtml = question.options
        .map((option) => {
          const classes = ["result-option"];
          if (option.key === question.answer) {
            classes.push("correct");
          }
          if (selected === option.key && selected !== question.answer) {
            classes.push("wrong-selected");
          }

          return `<li class="${classes.join(" ")}"><span class="option-key">${option.key}.</span> ${escapeHtml(option.text)}</li>`;
        })
        .join("");

      const explanationText = question.explanation
        ? escapeHtmlWithBreaks(question.explanation)
        : "Chưa có lời giải chi tiết cho câu này.";

      const selectedText = selected
        ? `Bạn chọn: ${escapeHtml(selected)}`
        : "Bạn chọn: (bỏ trống)";
      const correctText = correctOption
        ? `Đáp án đúng: ${escapeHtml(correctOption.key)}`
        : `Đáp án đúng: ${escapeHtml(question.answer)}`;

      return `<div class="result-item ${isCorrect ? "ok" : "bad"}"><div class="result-status ${isCorrect ? "ok" : "bad"}">${isCorrect ? "Đúng" : "Sai"}</div><p><strong>Câu ${index + 1}:</strong> ${escapeHtml(question.prompt)}</p><p class="result-meta">${selectedText} | ${correctText}</p><ul class="result-options">${optionsHtml}</ul><div class="result-explanation"><strong>Giải thích:</strong> ${explanationText}</div></div>`;
    })
    .join("");

  const total = state.activeQuestions.length;
  const score10 = ((correctCount / total) * 10).toFixed(2);
  const timeMessage = isTimeUp ? " (Hết giờ)" : "";

  ui.resultSummary.textContent = `Đúng ${correctCount}/${total} câu. Điểm quy đổi: ${score10}/10.${timeMessage}`;
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

function escapeHtmlWithBreaks(value) {
  return escapeHtml(value).replaceAll("\n", "<br />");
}

function buildTheoryQuestionPool(chapterTexts, existingPromptSet = new Set()) {
  const chapterLabels = [
    "Chương 1",
    "Chương 2",
    "Chương 3",
    "Chương 4.1",
    "Chương 4.2",
  ];
  const pairs = [];

  chapterTexts.forEach((text, chapterIndex) => {
    const chapterPairs = extractTheoryPairs(text).map((pair) => ({
      ...pair,
      source: chapterLabels[chapterIndex] || `Chương ${chapterIndex + 1}`,
    }));
    pairs.push(...chapterPairs);
  });

  const uniquePairs = dedupePairs(pairs);
  const terms = [...new Set(uniquePairs.map((item) => item.term))].filter(
    (term) => term.length >= 3,
  );

  const questions = uniquePairs
    .map((item, index) => {
      const distractors = pickDistractors(terms, item.term, 3);
      if (distractors.length < 3) {
        return null;
      }

      const options = shuffleArray([item.term, ...distractors]).map(
        (term, optionIndex) => ({
          key: ["A", "B", "C", "D"][optionIndex],
          text: term,
        }),
      );

      const correctOption = options.find((option) => option.text === item.term);
      if (!correctOption) {
        return null;
      }

      const prompt = `Theo nội dung lý thuyết, mô tả sau thuộc khái niệm nào? ${item.clue}`;
      const normalizedPrompt = normalizePromptForCompare(prompt);
      if (isPromptTooSimilar(normalizedPrompt, existingPromptSet)) {
        return null;
      }

      return {
        uid: `${THEORY_EXAM_ID}-${index + 1}`,
        number: index + 1,
        part: "T",
        prompt,
        options,
        answer: correctOption.key,
        explanation: `Đáp án đúng là "${item.term}" vì mô tả này được trích từ ${item.source}.`,
      };
    })
    .filter(Boolean);

  return shuffleArray(questions).slice(0, 200);
}

function extractTheoryPairs(markdown) {
  const text = normalizeTheoryText(markdown);
  const lines = splitTheoryLines(markdown);
  const terms = extractCandidateTerms(markdown);
  const pairs = [];

  lines.forEach((line) => {
    const searchLine = normalizeForSearch(line);
    if (!isDefinitionLikeSentence(searchLine)) {
      return;
    }

    const term = extractTermFromDefinition(line);
    if (!term) {
      return;
    }

    const clue = trimClue(line, term);
    if (!clue || clue.length < 20) {
      return;
    }

    pairs.push({ term, clue });
  });

  // Fallback: map heading/bold terms into nearby definition lines.
  terms.forEach((term) => {
    const termKey = normalizeForSearch(term);
    const matched = lines.find((line) => {
      const key = normalizeForSearch(line);
      return key.includes(termKey) && isDefinitionLikeSentence(key);
    });

    if (!matched) {
      return;
    }

    const clue = trimClue(matched, term);
    if (!clue || clue.length < 20) {
      return;
    }

    pairs.push({ term, clue });
  });

  return dedupePairs(pairs);
}

function normalizeTheoryText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\r/g, "\n")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/[>*`#]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractCandidateTerms(markdown) {
  const headingTerms = [...markdown.matchAll(/^#{2,4}\s+(.+)$/gm)].map((m) =>
    cleanCandidateTerm(m[1]),
  );
  const boldTerms = [...markdown.matchAll(/\*\*([^*]{3,120})\*\*/g)].map((m) =>
    cleanCandidateTerm(m[1]),
  );

  return [...new Set([...headingTerms, ...boldTerms])].filter((term) => {
    if (!term || term.length < 4 || term.length > 80) {
      return false;
    }

    const normalized = normalizeForSearch(term);
    const isAcronym = /^[A-Z0-9]{2,10}$/.test(term);
    const wordCount = term.split(/\s+/).length;

    return (
      (wordCount >= 2 || isAcronym) &&
      !normalized.startsWith("chuong") &&
      !normalized.startsWith("phan") &&
      !normalized.startsWith("dan y") &&
      !normalized.startsWith("tai lieu") &&
      !normalized.includes("loi giai") &&
      !normalized.includes("mastering software quality assurance") &&
      !normalized.includes("introduction to software testing")
    );
  });
}

function splitTheoryLines(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\r/g, "\n")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/\n+/g, "\n")
    .replace(/\n/g, ". ")
    .split(/(?<=[.;:!?])\s+/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line.length >= 24 && line.length <= 320)
    .filter((line) => !/^\d+\.\s*[A-D]\b/.test(line));
}

function trimClue(sentence, term) {
  const cleaned = sentence
    .replace(/\*+/g, " ")
    .replace(/#+/g, " ")
    .replace(/[<>`]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalizeForSearch(cleaned).includes(normalizeForSearch(term))) {
    return "";
  }

  const withoutTerm = cleaned
    .replace(new RegExp(escapeRegExp(term), "gi"), "")
    .replace(
      /^(là|bao gồm|gồm|là\s+gì|được\s+xem\s+là|được\s+định\s+nghĩa\s+là)\s*/i,
      "",
    )
    .replace(/^[\s:;,.\-–—]+/, "")
    .replace(/\s+/g, " ")
    .trim();

  const finalClue = withoutTerm || cleaned;
  const maxLength = 180;

  if (finalClue.length <= maxLength) {
    return finalClue;
  }

  return `${finalClue.slice(0, maxLength).trim()}...`;
}

function dedupePairs(pairs) {
  const map = new Map();
  pairs.forEach((item) => {
    const key = `${normalizeForSearch(item.term)}|${normalizeForSearch(item.clue)}`;
    if (!map.has(key)) {
      map.set(key, item);
    }
  });
  return [...map.values()];
}

function extractTermFromDefinition(line) {
  const compact = line.replace(/\s+/g, " ").trim();
  if (!compact) {
    return "";
  }

  const patterns = [
    /^(.{3,90}?)\s+là\s+/i,
    /^(.{3,90}?)\s+bao gồm\s+/i,
    /^(.{3,90}?)\s+gồm\s+/i,
    /^(.{3,90}?)\s+được\s+xem\s+là\s+/i,
    /^(.{3,90}?)\s+được\s+định\s+nghĩa\s+là\s+/i,
  ];

  for (const pattern of patterns) {
    const matched = compact.match(pattern);
    if (!matched) {
      continue;
    }

    const term = cleanCandidateTerm(matched[1]);
    const wordCount = term.split(/\s+/).length;
    if (term.length >= 3 && term.length <= 80 && wordCount <= 10) {
      return term;
    }
  }

  return "";
}

function buildExistingPromptSet() {
  const allPrompts = [];

  EXAM_SOURCES.forEach((exam) => {
    const pool = state.pools[exam.id] || [];
    pool.forEach((question) => {
      allPrompts.push(normalizePromptForCompare(question.prompt));
    });
  });

  return new Set(allPrompts.filter(Boolean));
}

function normalizePromptForCompare(value) {
  return normalizeForSearch(value)
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isPromptTooSimilar(normalizedPrompt, existingPromptSet) {
  if (!normalizedPrompt || normalizedPrompt.length < 18) {
    return true;
  }

  for (const existing of existingPromptSet) {
    if (!existing) {
      continue;
    }

    if (existing === normalizedPrompt) {
      return true;
    }

    if (
      normalizedPrompt.length >= 45 &&
      existing.length >= 45 &&
      (existing.includes(normalizedPrompt) ||
        normalizedPrompt.includes(existing))
    ) {
      return true;
    }
  }

  return false;
}

function pickDistractors(allTerms, correctTerm, count) {
  const pool = allTerms.filter((term) => term !== correctTerm);
  return shuffleArray(pool).slice(0, count);
}

function normalizeForSearch(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll("đ", "d")
    .replaceAll("Đ", "D")
    .toLowerCase();
}

function isDefinitionLikeSentence(searchText) {
  return (
    searchText.includes(" la ") ||
    searchText.includes(" la:") ||
    searchText.includes(" bao gom") ||
    searchText.includes(" duoc dung de") ||
    searchText.includes(" duoc xem la") ||
    searchText.includes(" la ky thuat") ||
    searchText.includes(" la qua trinh") ||
    searchText.includes(" muc tieu")
  );
}

function cleanCandidateTerm(value) {
  return value
    .replace(/^\d+(?:\.\d+)*\.?\s*/, "")
    .replace(/[\[\]`*_]/g, " ")
    .replace(/[\-–—:]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
