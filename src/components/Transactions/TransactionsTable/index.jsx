import React from "react";
import { Grid, Table } from "antd";
import { useAtomValue } from "jotai";
import { sortedAndFilteredTransactionsAtom } from "@/atoms/transactions";
import { categoriesAtom } from "@/atoms/categories";
import { TRANSACTION_TYPES } from "@/utils/constants";
import { TransactionActions } from "./TransactionActions";

import styles from "./index.module.scss";
import TransactionDetails from "./TransactionDetails";

const { useBreakpoint } = Grid;

const getColumns = (categories) => {
  return [
    {
      title: "Transaction Details",
      render: (transaction) => {
        return <TransactionDetails transaction={transaction} />;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      filters: Object.values(TRANSACTION_TYPES)?.map((transactionType) => ({
        text: transactionType,
        value: transactionType,
      })),
      onFilter: (value, record) => record?.type === value,
      responsive: ["md"],
    },
    {
      title: "Amount",
      dataIndex: "amount",
      align: "center",
      responsive: ["md"],
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      filters: categories?.map((category) => ({
        text: category?.name,
        value: category?.id,
      })),
      responsive: ["md"],
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
      responsive: ["md"],
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (value) => formatDate(new Date(value)),
      responsive: ["md"],
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, transaction) => (
        <TransactionActions transaction={transaction} />
      ),
      responsive: ["md"],
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
  const { md } = useBreakpoint();

  return (
    <Table
      showHeader={md}
      dataSource={transactions}
      columns={getColumns(categories)}
      rowKey="id"
      bordered
      className={styles.transactionsTable}
      pagination={md}
    />
  );
};
