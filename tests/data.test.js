const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { buildGraph, shortTitle, winFor } = require('../js/logic.js');

// data.js is a browser script of top-level consts; run it and pull them out.
const source = fs.readFileSync(path.join(__dirname, '..', 'js', 'data.js'), 'utf8');
const { PROFILE, PROJECTS, EXTRACURRICULAR } = vm.runInNewContext(`${source}\n;({ PROFILE, PROJECTS, EXTRACURRICULAR })`);
const MONTH = /^\d{4}-(0[1-9]|1[0-2])$/;

test('every period is YYYY-MM and ends after it starts', () => {
  for (const entry of [...PROJECTS, ...EXTRACURRICULAR]) {
    if (!entry.period) continue;
    assert.match(entry.period.from, MONTH, entry.id);
    if (entry.period.to) {
      assert.match(entry.period.to, MONTH, entry.id);
      assert.ok(entry.period.to >= entry.period.from, entry.id);
    }
  }
});

test('profile has the facts-strip fields', () => {
  assert.equal(typeof PROFILE.focus, 'string');
  assert.equal(typeof PROFILE.status, 'string');
});

test('July 2026 holds the AMD hackathon, Token Gate and the SEO skill', () => {
  const entries = [...PROJECTS, ...EXTRACURRICULAR].map((x) => ({ title: shortTitle(x.title), period: x.period }));
  const july = buildGraph(entries, new Date(2026, 9, 6)).find((y) => y.year === 2026).months[6];
  assert.equal(july.items.length, 3);
  assert.equal(july.level, 4);
});

test('ARCHIVe and RainWatt get win pills; Token Gate does not', () => {
  assert.ok(winFor('aim-ready', EXTRACURRICULAR));
  assert.ok(winFor('rainwatt', EXTRACURRICULAR));
  assert.equal(winFor('token-gate', EXTRACURRICULAR), undefined);
});

test('every video project has a cover poster', () => {
  for (const p of PROJECTS.filter((p) => p.video)) assert.ok(p.cover, p.id);
});
