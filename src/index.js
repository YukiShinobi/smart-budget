export function monthlySummary(transactions = []) {
  const income = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const spending = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));
  return {
    income,
    spending,
    net: income - spending,
    savingsRate: income ? Number((((income - spending) / income) * 100).toFixed(1)) : 0
  };
}

export function categoryBreakdown(transactions = []) {
  const totals = {};
  for (const item of transactions.filter(t => t.amount < 0)) {
    const key = item.category ?? 'uncategorised';
    totals[key] = Number(((totals[key] ?? 0) + Math.abs(item.amount)).toFixed(2));
  }
  return Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
}

export function forecastBalance({ startingBalance, recurring = [], months = 6 }) {
  const rows = [];
  let balance = startingBalance;
  for (let month = 1; month <= months; month += 1) {
    const income = recurring.filter(r => r.amount > 0).reduce((s, r) => s + r.amount, 0);
    const spending = Math.abs(recurring.filter(r => r.amount < 0).reduce((s, r) => s + r.amount, 0));
    balance += income - spending;
    rows.push({ month, income, spending, balance: Number(balance.toFixed(2)) });
  }
  return rows;
}

export function budgetStatus(limit, spent) {
  const remaining = Number((limit - spent).toFixed(2));
  const usedPercent = limit > 0 ? Math.round((spent / limit) * 100) : 0;
  return {
    remaining,
    usedPercent,
    state: spent > limit ? 'over' : usedPercent >= 85 ? 'warning' : 'healthy'
  };
}

export function upcomingBills(recurring = [], days = 14, now = new Date()) {
  const today = now.getUTCDate();
  return recurring
    .filter(item => item.amount < 0 && Number.isInteger(item.dayOfMonth))
    .map(item => {
      let delta = item.dayOfMonth - today;
      if (delta < 0) delta += 31;
      return { ...item, dueInDays: delta };
    })
    .filter(item => item.dueInDays <= days)
    .sort((a, b) => a.dueInDays - b.dueInDays);
}
