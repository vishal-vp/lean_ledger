import { TRANSACTION_TYPES } from "@/utils/constants";
import { atom } from "jotai";
import { nanoid } from "nanoid";

export const transactionsAtom = atom([
  {
    id: nanoid(),
    amount: 100,
    createdAt: "2024-01-01T10:00:00.000Z",
    type: TRANSACTION_TYPES.INCOME,
    description: "Salary",
  },
  {
    id: nanoid(),
    categoryId: "1",
    amount: 50,
    createdAt: "2024-02-01T10:00:00.000Z",
    type: TRANSACTION_TYPES.EXPENSE,
    description: "Health Checkup",
  },
  {
    id: nanoid(),
    categoryId: "2",
    amount: 89,
    createdAt: "2024-03-12T10:00:00.000Z",
    type: TRANSACTION_TYPES.EXPENSE,
    description: "Restaurant",
  },
  {
    id: nanoid(),
    categoryId: "1",
    amount: 10,
    createdAt: "2024-04-21T10:00:00.000Z",
    type: TRANSACTION_TYPES.EXPENSE,
    description: "DMart Groceries",
  },
  {
    id: nanoid(),
    categoryId: "1",
    amount: 20,
    createdAt: "2024-04-01T10:00:00.000Z",
    type: TRANSACTION_TYPES.EXPENSE,
    description: "Travel",
  },
]);

const sortByKey = (array, key, isAscending = true) => {
  return array.sort((a, b) => {
    if (typeof a[key] === "string") {
      return isAscending
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]);
    }
    return isAscending ? a[key] - b[key] : b[key] - a[key];
  });
};

export const sortedTransactionsAtom = atom((get) => {
  const transactions = get(transactionsAtom);
  return sortByKey(transactions, "createdAt", false);
});
