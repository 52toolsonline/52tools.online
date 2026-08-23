import { tools, type Tool } from "../data/tools";
import { categories, type Category } from "../data/categories";

export interface SearchResult {
  tool: Tool;
  score: number;
}

/** Very small Levenshtein-style tolerance check for near-misses (e.g. "jason" -> "json"). */
function isCloseMatch(a: string, b: string): boolean {
  if (a.length < 3 || b.length < 3) return a === b;
  if (Math.abs(a.length - b.length) > 2) return false;

  const shorter = a.length <= b.length ? a : b;
  const longer = a.length <= b.length ? b : a;

  let mismatches = 0;
  let i = 0;
  let j = 0;
  while (i < shorter.length && j < longer.length) {
    if (shorter[i] === longer[j]) {
      i++;
      j++;
    } else {
      mismatches++;
      if (mismatches > 2) return false;
      j++;
    }
  }
  return mismatches <= 2;
}

function scoreTool(tool: Tool, query: string): number {
  const q = query.trim().toLowerCase();
  if (!q) return 0;

  const name = tool.name.toLowerCase();
  const category = tool.category.toLowerCase();
  const description = tool.description.toLowerCase();

  // 1. Exact name match
  if (name === q) return 100;

  // 2. Name starts with query
  if (name.startsWith(q)) return 90;

  // 3. Name contains query
  if (name.includes(q)) return 75;

  // 4. Keyword exact/partial match
  for (const kw of tool.keywords) {
    const k = kw.toLowerCase();
    if (k === q) return 70;
    if (k.startsWith(q) || k.includes(q)) return 60;
  }

  // 5. Category match
  if (category === q || category.includes(q)) return 45;

  // 6. Description match
  if (description.includes(q)) return 30;

  // 7. Fuzzy tolerance on name/keywords for simple typos
  const words = q.split(/\s+/);
  for (const word of words) {
    if (word.length < 3) continue;
    if (isCloseMatch(name, word)) return 40;
    for (const kw of tool.keywords) {
      if (isCloseMatch(kw.toLowerCase(), word)) return 35;
    }
  }

  return 0;
}

export function searchTools(query: string, limit = 20): SearchResult[] {
  const q = query.trim();
  if (!q) return [];

  return tools
    .map((tool) => ({ tool, score: scoreTool(tool, q) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.tool.name.localeCompare(b.tool.name))
    .slice(0, limit);
}

export function searchCategories(query: string): Category[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return categories.filter(
    (c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
  );
}

export const popularSearchSlugs = [
  "json-formatter",
  "text-replacer",
  "html-viewer",
  "word-counter",
  "case-converter",
  "uuid-generator",
];

export function getPopularSearches(): Tool[] {
  return popularSearchSlugs
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter((t): t is Tool => Boolean(t));
}
