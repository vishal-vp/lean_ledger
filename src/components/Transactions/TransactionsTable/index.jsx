import React from "react";
import { Grid, Table } from "antd";
import { useAtomValue } from "jotai";
import { sortedAndFilteredTransactionsAtom } from "@/atoms/transactions";
import { TRANSACTION_TYPES } from "@/utils/constants";
import { TransactionActions } from "./TransactionActions";

import styles from "./index.module.scss";
import TransactionDetails from "./TransactionDetails";
import { categoriesAtom } from "@/atoms/categories";
import { TransactionCategory } from "./TransactionCategory";
import { formatTransactionDate } from "@/utils/utils";

const { useBreakpoint } = Grid;

const getColumns = (categories) => {
  const { md } = useBreakpoint();

  return [
    {
      title: "Transaction Details",
      render: (transaction) => {
        return <TransactionDetails transaction={transaction} />;
      },
      hidden: md,
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
      filters: categories?.map((category) => ({
        text: category?.name,
        value: category?.id,
      })),
      responsive: ["md"],
      onFilter: (value, record) => record?.categoryId === value,
      render: (transaction) => (
        <TransactionCategory transaction={transaction} />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      responsive: ["md"],
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (value) => formatTransactionDate(new Date(value)),
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
