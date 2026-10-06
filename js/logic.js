/*
 * Rules with no DOM in them, shared by the page scripts and the Node tests
 * (tests/*.test.js): win detection, language dots, and the Beyond Class
 * activity graph.
 */

/* GitHub's language colours, for the dots next to project languages. */
const LANG_COLORS = {
  'C#': '#178600',
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  PHP: '#4F5D95',
  HTML: '#e34c26',
  CSS: '#663399',
  Java: '#b07219',
  Rust: '#dea584',
  'C++': '#f34b7d',
};
const NO_LANG_COLOR = '#7d8590';

/* Brand-ish colours for the dots on every other tech-stack and toolkit chip. */
const TECH_COLORS = {
  SQL: '#e38c00',
  WPF: '#512bd4',
  '.NET 8': '#512bd4',
  'WPF / .NET 8': '#512bd4',
  SQLite: '#44a8e0',
  ClosedXML: '#217346',
  LangGraph: '#1c9b8c',
  FastMCP: '#d4d4d8',
  'FastMCP / MCP': '#d4d4d8',
  Playwright: '#d65348',
  'Google Genkit': '#fbbc04',
  Gemini: '#8e75ff',
  'scikit-learn': '#f7931e',
  Ollama: '#e6edf3',
  'Fireworks AI': '#8b5cf6',
  Docker: '#2496ed',
  pytest: '#0a9edc',
  Firebase: '#ff9100',
  Netlify: '#00c7b7',
  'Node.js': '#5fa04e',
  FastAPI: '#009688',
  'Ubuntu Server': '#e95420',
  phpMyAdmin: '#f89c0e',
  MySQL: '#4479a1',
  Arduino: '#00979d',
  LoRa: '#00a1e0',
  'GPS / IMU sensors': '#f59e0b',
  'Turbine Systems': '#38bdf8',
  'LiFePO4 Battery': '#facc15',
  'Sediment Filtration': '#a16207',
  Git: '#f05032',
  GitHub: '#e6edf3',
};

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** A podium finish: "1st Runner-Up", "Champion", "2nd Place"... */
function isWin(activity) {
  return /\b(runner-up|champion|\d+(st|nd|rd|th) place)\b/i.test(activity.result || '');
}

/** The winning Beyond Class entry that links to this project, if any. */
function winFor(projectId, activities) {
  return activities.find((a) => a.project === projectId && isWin(a));
}

/** Label + dot colour: the project's `lang`, else its first known language, else its category. */
function projectLang(project) {
  const name = project.lang || project.techStack.find((t) => t in LANG_COLORS) || project.category;
  return { name, color: LANG_COLORS[name] || NO_LANG_COLOR };
}

/** Dot colour for any tech name: its language colour, its brand colour, else grey. */
function techColor(name) {
  return LANG_COLORS[name] || TECH_COLORS[name] || NO_LANG_COLOR;
}

function monthKey(year, month) {
  return `${year}-${String(month).padStart(2, '0')}`;
}

/** { from: '2025-11', to: '2026-01' } -> ['2025-11', '2025-12', '2026-01'] */
function periodMonths(period) {
  if (!period) return [];
  const [fromYear, fromMonth] = period.from.split('-').map(Number);
  const [toYear, toMonth] = (period.to || period.from).split('-').map(Number);
  const keys = [];
  let year = fromYear;
  let month = fromMonth;
  while (year < toYear || (year === toYear && month <= toMonth)) {
    keys.push(monthKey(year, month));
    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
  }
  return keys;
}

/** Items in a month -> graph shade (level 1 is legend-only). */
function levelFor(count) {
  if (count === 0) return 0;
  return Math.min(count + 1, 4);
}

/**
 * One row per year (first dated year through this year), 12 months each.
 * Entries without a period are left out.
 */
function buildGraph(entries, now = new Date()) {
  const byMonth = {};
  entries.forEach((entry) => {
    periodMonths(entry.period).forEach((key) => {
      (byMonth[key] = byMonth[key] || []).push(entry.title);
    });
  });
  const keys = Object.keys(byMonth);
  if (!keys.length) return [];

  const years = keys.map((key) => Number(key.slice(0, 4)));
  const thisYear = now.getFullYear();
  const nowKey = monthKey(thisYear, now.getMonth() + 1);
  const rows = [];
  for (let year = Math.min(...years); year <= Math.max(thisYear, ...years); year++) {
    const months = MONTH_NAMES.map((name, i) => {
      const key = monthKey(year, i + 1);
      const items = byMonth[key] || [];
      return { key, label: `${name} ${year}`, items, level: levelFor(items.length), future: key > nowKey };
    });
    rows.push({ year, months });
  }
  return rows;
}

/** "Token Gate — AMD Developer Hackathon" -> "Token Gate" */
function shortTitle(title) {
  return title.split(' — ')[0];
}

if (typeof module !== 'undefined') {
  module.exports = { LANG_COLORS, isWin, winFor, projectLang, techColor, periodMonths, levelFor, buildGraph, shortTitle };
}
