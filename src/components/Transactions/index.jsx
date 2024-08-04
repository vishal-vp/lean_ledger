import { Button, Divider } from "antd";
import { SectionHeading } from "../SectionHeading";
import { PlusOutlined } from "@ant-design/icons";
import { TransactionsTable } from "./TransactionsTable";

export const Transactions = () => {
  return (
    <>
      <SectionHeading
        title="Transactions"
        actionButtons={[
          <Button
            icon={<PlusOutlined />}
            title="Add Transaction"
            key={"Add Transaction"}
          />,
        ]}
      />
      <Divider
        style={{ margin: "4px", borderWidth: "2px", borderColor: "#c4c4c4" }}
      />
      <TransactionsTable />
    </>
  );
};
