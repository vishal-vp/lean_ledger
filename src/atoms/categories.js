import { atom } from "jotai";

export const BUDGET_TYPES = {
  MONTHLY: "MONTHLY",
  ANNUAL: "ANNUAL",
};

export const categoriesAtom = atom([
  {
    name: "Grocery",
    budgetAmount: 100,
    type: BUDGET_TYPES.MONTHLY,
    amountPending: 100,
  },
  {
    name: "Medical",
    budgetAmount: 50,
    type: BUDGET_TYPES.MONTHLY,
    amountPending: 40,
  },
  {
    name: "Food",
    budgetAmount: 82,
    type: BUDGET_TYPES.MONTHLY,
    amountPending: 33,
  },
  {
    name: "Entertainment",
    budgetAmount: 998,
    type: BUDGET_TYPES.MONTHLY,
    amountPending: 0,
  },
  {
    name: "Insurance",
    budgetAmount: 821,
    type: BUDGET_TYPES.MONTHLY,
    amountPending: 344,
  },
  {
    name: "Clothes",
    budgetAmount: 223,
    type: BUDGET_TYPES.MONTHLY,
    amountPending: 11,
  },
]);
