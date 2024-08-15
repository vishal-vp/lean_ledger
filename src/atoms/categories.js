import { CATEGORY_TYPES } from "@/utils/constants";
import { atom } from "jotai";
import { atomWithReducer } from "jotai/utils";
import { nanoid } from "nanoid";

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

export const categoriesAtom = atomWithReducer(
  [
    {
      id: "1",
      name: "Grocery",
      budgetAmount: 100,
      type: CATEGORY_TYPES.MONTHLY,
      amountPending: 100,
      createdAt: "2024-01-01T10:00:00.000Z",
      lastModifiedAt: "2024-01-01T10:00:00.000Z",
    },
    {
      id: "2",
      name: "Medical",
      budgetAmount: 50,
      type: CATEGORY_TYPES.MONTHLY,
      amountPending: 40,
      createdAt: "2023-02-01T11:00:00.000Z",
      lastModifiedAt: "2024-01-01T10:00:00.000Z",
    },
    {
      id: nanoid(),
      name: "Food",
      budgetAmount: 82,
      type: CATEGORY_TYPES.MONTHLY,
      amountPending: 33,
      createdAt: "2023-03-01T12:00:00.000Z",
      lastModifiedAt: "2024-01-01T10:00:00.000Z",
    },
    {
      id: nanoid(),
      name: "Entertainment",
      budgetAmount: 998,
      type: CATEGORY_TYPES.MONTHLY,
      amountPending: 0,
      createdAt: "2023-04-01T13:00:00.000Z",
      lastModifiedAt: "2024-01-01T10:00:00.000Z",
    },
    {
      id: nanoid(),
      name: "Insurance",
      budgetAmount: 821,
      type: CATEGORY_TYPES.MONTHLY,
      amountPending: 344,
      createdAt: "2023-05-01T14:00:00.000Z",
      lastModifiedAt: "2024-01-01T10:00:00.000Z",
    },
    {
      id: nanoid(),
      name: "Clothes",
      budgetAmount: 223,
      type: CATEGORY_TYPES.MONTHLY,
      amountPending: 11,
      createdAt: "2023-06-01T15:00:00.000Z",
      lastModifiedAt: "2024-01-01T10:00:00.000Z",
    },
  ],
  categoriesReducer
);
