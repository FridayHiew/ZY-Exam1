/**
 * Strips redundant leading question numbering prefixes such as:
 * "1. ", "2、", "3) ", "4）", "Q1. ", "Q2: ", etc.
 * Preserves numeric values that start a sentence (e.g., "3.14 is...", "2026年...", "100% ...").
 */
export function stripQuestionNumberPrefix(text: string): string {
  if (!text) return '';
  let result = text.trim();
  const leadingNumberPattern = /^(?:(?:[Qq]\s*\d+\s*[\.\、\:\)\）\．]\s*)|(?:\d+\s*(?:\.(?!\d)|[\、\)\）\．])\s*))/;

  while (leadingNumberPattern.test(result)) {
    const next = result.replace(leadingNumberPattern, '').trim();
    if (!next || next === result) break;
    result = next;
  }

  return result;
}
