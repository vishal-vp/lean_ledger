import { Button } from "antd";
import { SectionHeading } from "../SectionHeading";
import { PlusOutlined } from "@ant-design/icons";
import { TransactionsTable } from "./TransactionsTable";
import { useState } from "react";
import { AddEditTransactionModal } from "./AddEditTransactionModal";

import styles from "./index.module.scss";

export const Transactions = () => {
  const [isAddTransactionModalVisible, setIsAddTransactionModalVisible] =
    useState(false);

  return (
    <div className={styles.transactions}>
      <SectionHeading
        title="Transactions"
        actionButtons={[
          <Button
            icon={<PlusOutlined />}
            onClick={() => setIsAddTransactionModalVisible(true)}
            title="Add Transaction"
            key={"Add Transaction"}
          />,
        ]}
      />
      <TransactionsTable />
      {isAddTransactionModalVisible && (
        <AddEditTransactionModal
          onClose={() => setIsAddTransactionModalVisible(false)}
        />
      )}
    </div>
  );
};
