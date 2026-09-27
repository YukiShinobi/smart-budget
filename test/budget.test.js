import test from 'node:test';
import assert from 'node:assert/strict';
import { budgetStatus, forecastBalance, monthlySummary } from '../src/index.js';

test('summarises income and spending', () => {
  const summary = monthlySummary([{ amount: 1000 }, { amount: -250 }, { amount: -100 }]);
  assert.equal(summary.net, 650);
  assert.equal(summary.savingsRate, 65);
});

test('forecast applies recurring cash flow', () => {
  const rows = forecastBalance({ startingBalance: 500, recurring: [{ amount: 200 }, { amount: -100 }], months: 2 });
  assert.equal(rows[1].balance, 700);
});

test('budget state warns near the limit', () => {
  assert.equal(budgetStatus(100, 90).state, 'warning');
  assert.equal(budgetStatus(100, 101).state, 'over');
});
