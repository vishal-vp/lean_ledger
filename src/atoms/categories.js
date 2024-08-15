import { ATOM_PERISISTENCE_KEYS, CATEGORY_TYPES } from "@/utils/constants";
import { nanoid } from "nanoid";
import { atomWithStorageAndReducer } from "./utils";

export const CATEGORIES_ACTIONS = {
  LOG_EXPENSE: "LOG_EXPENSE",
  UPDATE_EXPENSE: "UPDATE_EXPENSE",
  EDIT: "EDIT",
  ADD: "ADD",
  DELETE: "DELETE",
  REFILL: "REFILL",
};

function popCategory(categories, categoryId) {
  const remainingCategories = [];
  let poppedCategory;
  categories.forEach((category) => {
    if (category?.id === categoryId) {
      poppedCategory = category;
    } else {
      remainingCategories?.push(category);
    }
  });
  return { poppedCategory, remainingCategories };
}

const categoriesReducer = (existingCategories, action) => {
  const currentDate = new Date();
  if (action.type === CATEGORIES_ACTIONS.LOG_EXPENSE) {
    const { poppedCategory, remainingCategories } = popCategory(
      existingCategories,
      action?.transaction?.categoryId
    );
    return [
      ...remainingCategories,
      {
        ...poppedCategory,
        amountPending:
          poppedCategory?.amountPending - action?.transaction?.amount,
        lastModifiedAt: currentDate.toISOString(),
      },
    ];
  } else if (action.type === CATEGORIES_ACTIONS.UPDATE_EXPENSE) {
    const { poppedCategory, remainingCategories } = popCategory(
      existingCategories,
      action?.oldTransactionData?.categoryId
    );
    return [
      ...remainingCategories,
      {
        ...poppedCategory,
        amountPending:
          poppedCategory?.amountPending +
          action?.oldTransactionData?.amount -
          action?.newTransactionData?.amount,
        lastModifiedAt: currentDate.toISOString(),
      },
    ];
  } else if (action.type === CATEGORIES_ACTIONS.ADD) {
    return [
      ...existingCategories,
      {
        ...action?.newCategoryData,
        id: nanoid(),
        createdAt: currentDate.toISOString(),
        lastModifiedAt: currentDate.toISOString(),
      },
    ];
  } else if (action.type === CATEGORIES_ACTIONS.EDIT) {
    const categoryBeingEdited = action?.categoryBeingEdited;
    return [
      ...existingCategories?.filter(({ id }) => id !== categoryBeingEdited?.id),
      {
        ...existingCategories?.find(({ id }) => id === categoryBeingEdited?.id),
        ...action?.updatedCategoryData,
        lastModifiedAt: currentDate.toISOString(),
      },
    ];
  } else if (action.type === CATEGORIES_ACTIONS.DELETE) {
    return existingCategories?.filter(
      ({ id }) => id !== action?.deletedCategoryId
    );
  } else if (action.type === CATEGORIES_ACTIONS.REFILL) {
    return existingCategories?.map((category) => ({
      ...category,
      amountPending: category?.budgetAmount,
      lastModifiedAt: currentDate.toISOString(),
    }));
  }

  throw new Error("Unknown action type");
};

export const categoriesAtom = atomWithStorageAndReducer(
  ATOM_PERISISTENCE_KEYS.CATEGORIES,
  [],
  categoriesReducer
);
