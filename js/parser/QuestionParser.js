/**
 * QuestionParser - Parses TXT question files
 * Extracts metadata and normalizes question data
 */

export class QuestionParser {
  /**
   * Parse questions from TXT content
   * Format: ===QUESTION===\nkey: value\n...
   */
  static parseQuestions(content) {
    const questions = [];
    const blocks = content.split("===QUESTION===").filter((b) => b.trim());

    blocks.forEach((block, index) => {
      try {
        const question = this.parseBlock(block, index);
        if (question && question.id) {
          questions.push(question);
        }
      } catch (e) {
        console.warn(`Failed to parse question block ${index}:`, e);
      }
    });

    return questions;
  }

  /**
   * Parse individual question block
   */
  static parseBlock(block, index) {
    const lines = block
      .trim()
      .split("\n")
      .map((l) => l.trimEnd());

    const question = { order: index };
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Skip empty lines
      if (!line.trim()) {
        i++;
        continue;
      }

      // Check if this line contains a key-value pair
      if (line.includes(":")) {
        const colonIndex = line.indexOf(":");
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();

        // Check if it's a valid key (lowercase letters, underscores)
        if (/^[a-z_]+$/.test(key)) {
          // Collect continuation lines for multiline values
          i++;
          while (i < lines.length) {
            const nextLine = lines[i];
            // Stop if next line is a new key
            if (nextLine.includes(":") && /^[a-z_]+:/.test(nextLine)) {
              break;
            }
            // Stop if it's an option line (A:, B:, C:, D:)
            if (/^[A-D]:/.test(nextLine)) {
              break;
            }
            if (nextLine.trim()) {
              value += "\n" + nextLine;
            }
            i++;
          }
          question[key] = value;
          continue;
        }
      }

      // Check if this is an option line (A:, B:, C:, D:)
      const optionMatch = line.match(/^([A-D]):\s*(.*)/);
      if (optionMatch) {
        const letter = optionMatch[1];
        let optionValue = optionMatch[2];

        i++;
        while (i < lines.length) {
          const nextLine = lines[i];
          // Stop if next line is a new key or option
          if (/^[a-z_]+:/.test(nextLine) || /^[A-D]:/.test(nextLine)) {
            break;
          }
          if (nextLine.trim()) {
            optionValue += "\n" + nextLine;
          } else if (nextLine.trim() === "") {
            i++;
            break;
          }
          i++;
        }
        question[letter] = optionValue;
        continue;
      }

      i++;
    }

    // Parse options and normalize
    this.normalizeQuestion(question);

    return question;
  }

  /**
   * Normalize question data
   */
  static normalizeQuestion(question) {
    // Extract options for single/multiple
    if (question.type === "single" || question.type === "multiple") {
      const options = {};
      ["A", "B", "C", "D"].forEach((letter) => {
        if (question[letter]) {
          options[letter] = question[letter].trim();
          delete question[letter];
        }
      });
      question.options = options;
    }

    // Clean up fields
    if (question.question) {
      question.question = question.question.trim();
    }
    if (question.context) {
      question.context = question.context.trim();
    }
    if (question.answer) {
      question.answer = question.answer.trim();
    }
    if (question.topic) {
      question.topic = question.topic.trim();
    }
    if (question.id) {
      question.id = question.id.trim();
    }
  }

  /**
   * Validate question structure
   */
  static isValid(question) {
    if (
      !question.id ||
      !question.question ||
      !question.type ||
      !question.answer
    ) {
      return false;
    }

    if (question.type === "single" || question.type === "multiple") {
      if (!question.options || Object.keys(question.options).length < 2) {
        return false;
      }
    }

    return true;
  }

  /**
   * Load questions from URL
   */
  static async loadFromURL(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const content = await response.text();
      return this.parseQuestions(content);
    } catch (error) {
      console.error("Failed to load questions from URL:", error);
      return [];
    }
  }
}
