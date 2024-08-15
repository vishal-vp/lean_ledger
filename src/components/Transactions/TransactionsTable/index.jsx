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
    render: (categoryId, transaction) => {
      const category = categories?.find(
        (category) => category?.id === categoryId
      );
      return transaction?.type === TRANSACTION_TYPES.INCOME
        ? TRANSACTION_TYPES.INCOME
        : category?.name;
    },
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
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export const TransactionsTable = () => {
  const transactions = useAtomValue(sortedTransactionsAtom);
  const categories = useAtomValue(categoriesAtom);

  return (
    <Table
      dataSource={transactions}
      columns={getColumns(categories)}
      rowKey="id"
      bordered
    />
  );
};
