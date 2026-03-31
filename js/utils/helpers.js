/**
 * Helper utilities for common operations
 */

export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function calculatePercentage(correct, total) {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

export function normalizeAnswer(answer) {
  return answer.trim().toLowerCase();
}

export function getElementSafely(id) {
  const el = document.getElementById(id);
  if (!el) {
    console.warn(`Element with id '${id}' not found`);
  }
  return el;
}

export function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });
  const targetPage = getElementSafely(pageId);
  if (targetPage) {
    targetPage.classList.add("active");
  }
}
