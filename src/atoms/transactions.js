import { TRANSACTION_TYPES } from "@/utils/constants";
import { atom } from "jotai";
import { atomWithReducer } from "jotai/utils";
import { nanoid } from "nanoid";

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

export const TRANSACTIONS_ACTIONS = {
  ADD: "ADD",
  EDIT: "EDIT",
  DELETE: "DELETE",
};

const transactionsReducer = (existingTransactions, action) => {
  const currentDate = new Date();
  if (action.type === TRANSACTIONS_ACTIONS.ADD) {
    return [
      ...existingTransactions,
      {
        ...action?.newTransactionData,
        id: nanoid(),
        createdAt: currentDate.toISOString(),
        lastModifiedAt: currentDate.toISOString(),
      },
    ];
  } else if (action.type === TRANSACTIONS_ACTIONS.EDIT) {
    const transactionBeingEdited = action?.transactionBeingEdited;
    return existingTransactions.map((transaction) => {
      if (transaction?.id === transactionBeingEdited?.id) {
        return {
          ...transaction,
          ...action?.updatedTransactionData,
          lastModifiedAt: currentDate.toISOString(),
        };
      }
      return transaction;
    });
  } else if (action.type === TRANSACTIONS_ACTIONS.DELETE) {
    return existingTransactions?.filter((transaction) => {
      return transaction?.id !== action?.deletedTransactionId;
    });
  }

  throw new Error("Unknown action type");
};

export const transactionsAtom = atomWithReducer(
  [
    {
      id: nanoid(),
      amount: 1000,
      date: "2024-02-01T10:00:00.000Z",
      createdAt: "2024-01-01T10:00:00.000Z",
      type: TRANSACTION_TYPES.INCOME,
      description: "Salary",
    },
    {
      id: nanoid(),
      categoryId: "1",
      amount: 50,
      date: "2024-02-01T10:00:00.000Z",
      createdAt: "2024-02-01T10:00:00.000Z",
      type: TRANSACTION_TYPES.EXPENSE,
      description: "Health Checkup",
    },
    {
      id: nanoid(),
      categoryId: "2",
      amount: 89,
      date: "2024-02-01T10:00:00.000Z",
      createdAt: "2024-03-12T10:00:00.000Z",
      type: TRANSACTION_TYPES.EXPENSE,
      description: "Restaurant",
    },
    {
      id: nanoid(),
      categoryId: "1",
      amount: 10,
      date: "2024-02-01T10:00:00.000Z",
      createdAt: "2024-04-21T10:00:00.000Z",
      type: TRANSACTION_TYPES.EXPENSE,
      description: "DMart Groceries",
    },
    {
      id: nanoid(),
      categoryId: "1",
      amount: 20,
      date: "2024-02-01T10:00:00.000Z",
      createdAt: "2024-04-01T10:00:00.000Z",
      type: TRANSACTION_TYPES.EXPENSE,
      description: "Travel",
    },
    {
      id: nanoid(),
      categoryId: "1",
      amount: 20,
      date: "2024-02-01T10:00:00.000Z",
      createdAt: "2024-04-01T10:00:00.000Z",
      type: TRANSACTION_TYPES.EXPENSE,
      description: "Travel",
    },
    {
      id: nanoid(),
      categoryId: "1",
      amount: 20,
      date: "2024-02-01T10:00:00.000Z",
      createdAt: "2024-04-01T10:00:00.000Z",
      type: TRANSACTION_TYPES.EXPENSE,
      description: "Travel",
    },
    {
      id: nanoid(),
      categoryId: "1",
      amount: 20,
      date: "2024-02-01T10:00:00.000Z",
      createdAt: "2024-04-01T10:00:00.000Z",
      type: TRANSACTION_TYPES.EXPENSE,
      description: "Travel",
    },
    {
      id: nanoid(),
      categoryId: "1",
      amount: 20,
      date: "2024-02-01T10:00:00.000Z",
      createdAt: "2024-04-01T10:00:00.000Z",
      type: TRANSACTION_TYPES.EXPENSE,
      description: "Travel",
    },
    {
      id: nanoid(),
      categoryId: "1",
      amount: 20,
      date: "2024-02-01T10:00:00.000Z",
      createdAt: "2024-04-01T10:00:00.000Z",
      type: TRANSACTION_TYPES.EXPENSE,
      description: "Travel",
    },
    {
      id: nanoid(),
      categoryId: "1",
      amount: 20,
      date: "2024-02-01T10:00:00.000Z",
      createdAt: "2024-04-01T10:00:00.000Z",
      type: TRANSACTION_TYPES.EXPENSE,
      description: "Travel",
    },
    {
      id: nanoid(),
      categoryId: "1",
      amount: 20,
      date: "2024-02-01T10:00:00.000Z",
      createdAt: "2024-04-01T10:00:00.000Z",
      type: TRANSACTION_TYPES.EXPENSE,
      description: "Travel",
    },
    {
      id: nanoid(),
      categoryId: "1",
      amount: 20,
      date: "2024-02-01T10:00:00.000Z",
      createdAt: "2024-04-01T10:00:00.000Z",
      type: TRANSACTION_TYPES.EXPENSE,
      description: "Travel",
    },
    {
      id: nanoid(),
      categoryId: "1",
      amount: 20,
      date: "2024-02-01T10:00:00.000Z",
      createdAt: "2024-04-01T10:00:00.000Z",
      type: TRANSACTION_TYPES.EXPENSE,
      description: "Travel",
    },
    {
      id: nanoid(),
      categoryId: "1",
      amount: 20,
      date: "2024-02-01T10:00:00.000Z",
      createdAt: "2024-04-01T10:00:00.000Z",
      type: TRANSACTION_TYPES.EXPENSE,
      description: "Travel",
    },
    {
      id: nanoid(),
      categoryId: "1",
      amount: 20,
      date: "2024-02-01T10:00:00.000Z",
      createdAt: "2024-04-01T10:00:00.000Z",
      type: TRANSACTION_TYPES.EXPENSE,
      description: "Travel",
    },
  ],
  transactionsReducer
);

export const sortedTransactionsAtom = atom((get) => {
  const transactions = get(transactionsAtom);
  return sortByKey(transactions, "date", false);
});

export const totalBalanceAtom = atom((get) => {
  const transactions = get(transactionsAtom);
  return transactions?.reduce((total, transaction) => {
    if (transaction?.type === TRANSACTION_TYPES.INCOME) {
      return total + transaction?.amount;
    } else {
      return total - transaction?.amount;
    }
  }, 0);
});
