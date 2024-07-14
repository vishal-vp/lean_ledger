import { atom } from "jotai";
import { nanoid } from "nanoid";

export const BUDGET_TYPES = {
  MONTHLY: "MONTHLY",
  ANNUAL: "ANNUAL",
};

export const categoriesAtom = atom([
  {
    id: nanoid(),
    name: "Grocery",
    budgetAmount: 100,
    type: BUDGET_TYPES.MONTHLY,
    amountPending: 100,
  },
  {
    id: nanoid(),
    name: "Medical",
    budgetAmount: 50,
    type: BUDGET_TYPES.MONTHLY,
    amountPending: 40,
  },
  {
    id: nanoid(),
    name: "Food",
    budgetAmount: 82,
    type: BUDGET_TYPES.MONTHLY,
    amountPending: 33,
  },
  {
    id: nanoid(),
    name: "Entertainment",
    budgetAmount: 998,
    type: BUDGET_TYPES.MONTHLY,
    amountPending: 0,
  },
  {
    id: nanoid(),
    name: "Insurance",
    budgetAmount: 821,
    type: BUDGET_TYPES.MONTHLY,
    amountPending: 344,
  },
  {
    id: nanoid(),
    name: "Clothes",
    budgetAmount: 223,
    type: BUDGET_TYPES.MONTHLY,
    amountPending: 11,
  },
]);
