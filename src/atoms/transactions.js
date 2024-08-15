import { ATOM_PERISISTENCE_KEYS, TRANSACTION_TYPES } from "@/utils/constants";
import { atom } from "jotai";
import { nanoid } from "nanoid";
import { atomWithStorageAndReducer } from "./utils";
import { filtersAtom } from "./filters";
import dayjs from "dayjs";

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

export const sortedAndFilteredTransactionsAtom = atom((get) => {
  const transactions = get(transactionsAtom);
  const filters = get(filtersAtom);
  const filteredTransactions = transactions?.filter((transaction) => {
    const isDateRangeFilterPresent =
      filters?.dateRange?.[0] && filters?.dateRange?.[1];
    const isDateInRange =
      !isDateRangeFilterPresent ||
      (dayjs(transaction.date) >= filters.dateRange[0] &&
        dayjs(transaction.date) <= filters.dateRange[1]);
    return isDateInRange;
  });
  return sortByKey(filteredTransactions, "date", false);
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
