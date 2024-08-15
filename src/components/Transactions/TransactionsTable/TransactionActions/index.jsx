import { TRANSACTIONS_ACTIONS, transactionsAtom } from "@/atoms/transactions";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { useAtom } from "jotai";
import { AddEditTransactionModal } from "../../AddEditTransactionModal";
import { useState } from "react";

export const TransactionActions = ({ transaction }) => {
  const dispatchTransactions = useAtom(transactionsAtom)[1];
  const [
    isAddEditTransactionModalVisible,
    setIsAddEditTransactionModalVisible,
  ] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsAddEditTransactionModalVisible(true)}
        title="Edit Transaction"
        key="Edit Transaction"
        size="small"
        icon={<EditOutlined />}
      />
      <Popconfirm
        title="Delete Transaction"
        description="Are you sure you want to delete this transaction?"
        onConfirm={() => {
          dispatchTransactions({
            type: TRANSACTIONS_ACTIONS.DELETE,
            deletedTransactionId: transaction.id,
          });
        }}
      >
        <Button
          title="Delete Transaction"
          key="Delete Transaction"
          size="small"
          icon={<DeleteOutlined />}
        />
      </Popconfirm>
      {isAddEditTransactionModalVisible && (
        <AddEditTransactionModal
          transactionBeingEdited={transaction}
          onClose={() => setIsAddEditTransactionModalVisible(false)}
        />
      )}
    </>
  );
};
