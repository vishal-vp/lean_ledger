import { InputNumber } from "antd";
import styles from "./index.module.scss";
import { CURRENCY_SYMBOL } from "@/utils/constants";

export const CurrencyInput = (props) => {
  return (
    <InputNumber
      prefix={CURRENCY_SYMBOL}
      className={styles.currencyInput}
      {...props}
    />
  );
};
