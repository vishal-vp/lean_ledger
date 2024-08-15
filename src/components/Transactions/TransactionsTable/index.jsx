import React from "react";
import { Table } from "antd";
import { useAtomValue } from "jotai";
import { sortedAndFilteredTransactionsAtom } from "@/atoms/transactions";
import { categoriesAtom } from "@/atoms/categories";
import { TRANSACTION_TYPES } from "@/utils/constants";
import { TransactionActions } from "./TransactionActions";

const getColumns = (categories) => {
  return [
    {
      title: "Type",
      dataIndex: "type",
      filters: Object.values(TRANSACTION_TYPES)?.map((transactionType) => ({
        text: transactionType,
        value: transactionType,
      })),
      onFilter: (value, record) => record?.type === value,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      filters: categories?.map((category) => ({
        text: category?.name,
        value: category?.id,
      })),
      onFilter: (value, record) => record?.categoryId === value,
      render: (categoryId, transaction) => {
        const category = categories?.find(
          (category) => category?.id === categoryId
        );
        if (transaction?.type === TRANSACTION_TYPES.INCOME) {
          TRANSACTION_TYPES.INCOME;
        } else if (category?.name) {
          return category?.name;
        } else {
          return "---";
        }
      },
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (value) => formatDate(new Date(value)),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, transaction) => (
        <TransactionActions transaction={transaction} />
      ),
    },
  ];
};

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
  const transactions = useAtomValue(sortedAndFilteredTransactionsAtom);
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
