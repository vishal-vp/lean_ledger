import { categoriesAtom } from "@/atoms/categories";
import { TRANSACTION_TYPES } from "@/utils/constants";
import { useAtomValue } from "jotai";

export const TransactionCategory = ({ transaction }) => {
  const categories = useAtomValue(categoriesAtom);

  const category = categories?.find(
    (category) => category?.id === transaction?.categoryId
  );
  if (transaction?.type === TRANSACTION_TYPES.INCOME) {
    TRANSACTION_TYPES.INCOME;
  } else if (category?.name) {
    return category?.name;
  } else {
    return "---";
  }
};
