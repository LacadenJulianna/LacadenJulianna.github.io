const test = require('node:test');
const assert = require('node:assert/strict');
const { isWin, winFor, projectLang, techColor, periodMonths, levelFor, buildGraph, shortTitle } = require('../js/logic.js');

test('isWin matches podium results only', () => {
  assert.equal(isWin({ result: '1st Runner-Up' }), true);
  assert.equal(isWin({ result: 'Champion' }), true);
  assert.equal(isWin({ result: '2nd Place' }), true);
  assert.equal(isWin({ result: 'Auditor' }), false);
  assert.equal(isWin({ result: '36/36 Tests Passing' }), false);
  assert.equal(isWin({ result: 'Championship Finalist' }), false);
  assert.equal(isWin({ result: 'Placement Exam' }), false);
  assert.equal(isWin({}), false);
});

test('winFor finds the winning activity linked to a project', () => {
  const activities = [
    { id: 'a', project: 'p1', result: 'Auditor' },
    { id: 'b', project: 'p1', result: '1st Runner-Up' },
    { id: 'c', project: 'p2', result: '36/36 Tests Passing' },
  ];
  assert.equal(winFor('p1', activities).id, 'b');
  assert.equal(winFor('p2', activities), undefined);
  assert.equal(winFor('p3', activities), undefined);
});

test('projectLang: lang override, then first known language, then category', () => {
  assert.deepEqual(projectLang({ techStack: ['WPF', 'C#'], category: 'Desktop System' }), { name: 'C#', color: '#178600' });
  assert.deepEqual(
    projectLang({ techStack: ['Turbines'], category: 'Sustainability Project', lang: 'Hardware' }),
    { name: 'Hardware', color: '#7d8590' }
  );
  assert.deepEqual(
    projectLang({ techStack: ['Turbines'], category: 'Sustainability Project' }),
    { name: 'Sustainability Project', color: '#7d8590' }
  );
});

test('periodMonths expands a period into month keys', () => {
  assert.deepEqual(periodMonths({ from: '2026-07' }), ['2026-07']);
  assert.deepEqual(periodMonths({ from: '2025-11', to: '2026-02' }), ['2025-11', '2025-12', '2026-01', '2026-02']);
  assert.deepEqual(periodMonths(undefined), []);
});

test('levelFor maps item counts to graph shades', () => {
  assert.deepEqual([0, 1, 2, 3, 7].map(levelFor), [0, 2, 3, 4, 4]);
});

test('shortTitle drops the part after an em dash', () => {
  assert.equal(shortTitle('Token Gate — AMD Developer Hackathon'), 'Token Gate');
  assert.equal(shortTitle('Smart City Convergence 2025'), 'Smart City Convergence 2025');
});

test('buildGraph makes one row per year up to now, with levels and future months', () => {
  const now = new Date(2026, 9, 6); // 6 Oct 2026
  const years = buildGraph(
    [
      { title: 'A', period: { from: '2025-11', to: '2025-12' } },
      { title: 'B', period: { from: '2025-11' } },
      { title: 'C' },
    ],
    now
  );
  assert.deepEqual(years.map((y) => y.year), [2025, 2026]);
  assert.equal(years[0].months.length, 12);
  assert.deepEqual(years[0].months[10], { key: '2025-11', label: 'November 2025', items: ['A', 'B'], level: 3, future: false });
  assert.equal(years[0].months[11].level, 2);
  assert.equal(years[1].months[9].future, false); // current month is not "future"
  assert.equal(years[1].months[10].future, true);
  assert.deepEqual(buildGraph([{ title: 'C' }], now), []);
});

test('techColor: languages, other tech, then grey', () => {
  assert.equal(techColor('C#'), '#178600');
  assert.equal(techColor('Docker'), '#2496ed');
  assert.equal(techColor('Problem Solving'), '#7d8590');
});
