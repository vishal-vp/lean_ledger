import React from "react";
import { Table } from "antd";
import { useAtomValue } from "jotai";
import { sortedTransactionsAtom } from "@/atoms/transactions";
import { categoriesAtom } from "@/atoms/categories";
import { TRANSACTION_TYPES } from "@/utils/constants";

const getColumns = (categories) => [
  {
    title: "Type",
    dataIndex: "type",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    align: "center",
  },
  {
    title: "Category",
    dataIndex: "categoryId",
    render: (categoryId, transaction) =>
      transaction?.type === TRANSACTION_TYPES.INCOME
        ? TRANSACTION_TYPES.INCOME
        : categories?.find((category) => category?.id === categoryId)?.name,
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    render: (value) => formatDate(new Date(value)),
  },
];

const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return date.toLocaleDateString("en-US", options);
};

export const TransactionsTable = () => {
  const transactions = useAtomValue(sortedTransactionsAtom);
  const categories = useAtomValue(categoriesAtom);

  return (
    <Table
      dataSource={transactions}
      columns={getColumns(categories)}
      rowKey="id"
    />
  );
};
