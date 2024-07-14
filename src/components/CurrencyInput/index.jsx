import { InputNumber } from "antd";
import styles from "./index.module.scss";

export const CurrencyInput = (props) => {
  return <InputNumber prefix="₹" className={styles.currencyInput} {...props} />;
};
