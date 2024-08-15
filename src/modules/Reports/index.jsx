import { transactionsAtom } from "@/atoms/transactions";
import { useAtomValue } from "jotai";
import { Label, LabelList, Legend, Pie, PieChart, Tooltip } from "recharts";
import { categoriesAtom } from "@/atoms/categories";
import { schemeCategory10 } from "d3-scale-chromatic";
import { Typography } from "antd";

import styles from "./index.module.scss";
import { CURRENCY_SYMBOL } from "@/utils/constants";

const TooltipContent = ({ payload }) => {
  const data = payload?.[0] || {};
  const { name, value } = data;

  return (
    <div className={styles.tooltipContent}>
      <p className={styles.tooltipName}>{name}</p>
      <p className={styles.tooltipValue}>
        {CURRENCY_SYMBOL} {value?.toLocaleString()}
      </p>
    </div>
  );
};

export const Reports = () => {
  const transactions = useAtomValue(transactionsAtom);
  const categories = useAtomValue(categoriesAtom);

  const colors = schemeCategory10;

  const data = categories.map((category, index) => {
    const categoryTransactions = transactions?.filter(
      (transaction) => transaction.categoryId === category.id
    );
    const totalAmount = categoryTransactions?.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
    return {
      name: category.name,
      value: totalAmount,
      fill: colors[index % colors.length], // Use the colors scheme to get the fill color
    };
  });

  return (
    <>
      <Typography.Title className={styles.reportTitle} level={4}>
        Spending by Category
      </Typography.Title>
      <PieChart width={400} height={250} styles={{ textAlign: "left" }}>
        <Legend verticalAlign="top" align="center" />
        <Tooltip content={<TooltipContent />} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={80}
          fill="#82ca9d"
        >
          <LabelList dataKey="value" position="inside" />
        </Pie>
      </PieChart>
    </>
  );
};
