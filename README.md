<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=200&text=SMART%20BUDGET&fontAlignY=38&desc=CASHFLOW%20%E2%80%A2%20BILLS%20%E2%80%A2%20FORECASTS&descAlignY=58&color=0:050505,55:202020,100:5a1616&fontColor=f5f5f5&descColor=d4d4d4" width="100%" />

![Finance](https://img.shields.io/badge/focus-personal%20finance-111111?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-20%2B-2b2b2b?style=for-the-badge&logo=nodedotjs)
![Tests](https://img.shields.io/badge/tests-node:test-7a1f1f?style=for-the-badge)

**A budgeting engine built around one practical question: what is actually safe to spend?**

</div>

---

## Current logic

- income / spending / net summary
- savings-rate calculation
- category breakdowns
- budget warning states
- recurring-bill lookahead
- multi-month cash-flow forecasts
- automated tests

## Example

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

## Why I built it

Most finance dashboards show what already happened. I wanted the core logic to answer what matters next: what is due, which category is drifting, and where the balance lands if nothing changes.

## Test

```bash
npm test
```

The engine has no runtime dependencies and is designed so a UI, CSV importer or banking integration can sit on top later.

---

<div align="center"><sub>YukiShinobi // make the next balance visible before the money moves.</sub></div>
