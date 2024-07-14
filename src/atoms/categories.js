import { CATEGORY_TYPES } from "@/utils/constants";
import { atom } from "jotai";
import { nanoid } from "nanoid";

export const categoriesAtom = atom([
  {
    id: nanoid(),
    name: "Grocery",
    budgetAmount: 100,
    type: CATEGORY_TYPES.MONTHLY,
    amountPending: 100,
    createdAt: "2024-01-01T10:00:00.000Z",
  },
  {
    id: nanoid(),
    name: "Medical",
    budgetAmount: 50,
    type: CATEGORY_TYPES.MONTHLY,
    amountPending: 40,
    createdAt: "2023-02-01T11:00:00.000Z",
  },
  {
    id: nanoid(),
    name: "Food",
    budgetAmount: 82,
    type: CATEGORY_TYPES.MONTHLY,
    amountPending: 33,
    createdAt: "2023-03-01T12:00:00.000Z",
  },
  {
    id: nanoid(),
    name: "Entertainment",
    budgetAmount: 998,
    type: CATEGORY_TYPES.MONTHLY,
    amountPending: 0,
    createdAt: "2023-04-01T13:00:00.000Z",
  },
  {
    id: nanoid(),
    name: "Insurance",
    budgetAmount: 821,
    type: CATEGORY_TYPES.MONTHLY,
    amountPending: 344,
    createdAt: "2023-05-01T14:00:00.000Z",
  },
  {
    id: nanoid(),
    name: "Clothes",
    budgetAmount: 223,
    type: CATEGORY_TYPES.MONTHLY,
    amountPending: 11,
    createdAt: "2023-06-01T15:00:00.000Z",
  },
]);
