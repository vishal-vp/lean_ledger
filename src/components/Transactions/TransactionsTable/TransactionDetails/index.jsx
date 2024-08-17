import React from "react";
import { TransactionCategory } from "../TransactionCategory";
import { formatTransactionDate } from "@/utils/utils";
import { Descriptions } from "antd";

const TransactionDetails = ({ transaction }) => {
  const descriptionItems = [
    {
      key: "type",
      label: "Type",
      children: transaction?.type,
    },
    {
      key: "amount",
      label: "Amount",
      children: transaction?.amount,
    },
    {
      key: "date",
      label: "Date",
      children: formatTransactionDate(new Date(transaction?.date)),
    },
    {
      key: "category",
      label: "Category",
      children: <TransactionCategory transaction={transaction} />,
    },
  ];

  return <Descriptions items={descriptionItems} size="small" />;
};

export default TransactionDetails;
