import { Button, Divider } from "antd";
import { SectionHeading } from "../SectionHeading";
import { PlusOutlined } from "@ant-design/icons";
import { TransactionsTable } from "./TransactionsTable";
import { useState } from "react";
import { AddTransactionModal } from "./AddTransactionModal";

export const Transactions = () => {
  const [isAddTransactionModalVisible, setIsAddTransactionModalVisible] =
    useState(false);

  return (
    <>
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
      <Divider
        style={{ margin: "4px", borderWidth: "2px", borderColor: "#c4c4c4" }}
      />
      <TransactionsTable />
      {isAddTransactionModalVisible && (
        <AddTransactionModal
          onClose={() => setIsAddTransactionModalVisible(false)}
        />
      )}
    </>
  );
};
