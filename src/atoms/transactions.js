import { ATOM_PERISISTENCE_KEYS, TRANSACTION_TYPES } from "@/utils/constants";
import { atom } from "jotai";
import { nanoid } from "nanoid";
import { atomWithStorageAndReducer } from "./utils";

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

export const transactionsAtom = atomWithStorageAndReducer(
  ATOM_PERISISTENCE_KEYS.TRANSACTIONS,
  [],
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
