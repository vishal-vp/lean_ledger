import React from "react";
import styles from "./index.module.scss";

const TransactionDetails = ({ transaction }) => {
  return (
    <div className={styles.transactionDetails}>
      <div className={styles.transactionItem}>
        <span className={styles.label}>Type:</span>
        <span className={styles.value}>{transaction.type}</span>
      </div>
      <div className={styles.transactionItem}>
        <span className={styles.label}>Amount:</span>
        <span className={styles.value}>{transaction.amount}</span>
      </div>
      <div className={styles.transactionItem}>
        <span className={styles.label}>Date:</span>
        <span className={styles.value}>{transaction.date}</span>
      </div>
      <div className={styles.transactionItem}>
        <span className={styles.label}>Category:</span>
        <span className={styles.value}>{transaction.category}</span>
      </div>
    </div>
  );
};

export default TransactionDetails;
