# Smart Budget

A small budgeting engine for monthly summaries, category spending, recurring bills and forward cash-flow forecasting.

I built it around the question I actually care about when looking at money: **what is safe to spend, what is coming out next, and where will the balance be in a few months if nothing changes?**

## Includes

- income / spending / net summary
- savings-rate calculation
- category breakdowns
- budget warning states
- recurring-bill lookahead
- multi-month cash-flow forecast

```js
import { forecastBalance, budgetStatus } from './src/index.js';

console.table(forecastBalance({
  startingBalance: 3500,
  recurring: [
    { name: 'income', amount: 900 },
    { name: 'rent', amount: -600 },
    { name: 'subscriptions', amount: -45 }
  ],
  months: 4
}));

console.log(budgetStatus(400, 337));
```

Requires Node 20+. The engine has no runtime dependencies and is designed so a UI, CSV importer or bank integration can sit on top later.
