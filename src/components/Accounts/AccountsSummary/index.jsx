import {
  accountBalanceAtom,
  formattedAccountBalanceAtom,
} from "@/atoms/accounts";
import { SectionHeading } from "@/components/SectionHeading";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useAtomValue } from "jotai";
import { AccountBalanceEditModal } from "./AccountBalanceEditModal";
import { useState } from "react";

export const AccountsSummary = () => {
  const balance = useAtomValue(formattedAccountBalanceAtom);
  const [isAccountBalanceEditModalOpen, setIsAccountBalanceEditModalOpen] =
    useState(false);

  return (
    <>
      <SectionHeading
        title={"Balance"}
        value={balance}
        actionButtons={[
          <Button
            title="Edit Total Balance"
            key="Edit Total Balance"
            icon={
              <EditOutlined
                onClick={() => setIsAccountBalanceEditModalOpen(true)}
              />
            }
          />,
        ]}
      />
      {isAccountBalanceEditModalOpen && (
        <AccountBalanceEditModal
          isModalOpen={isAccountBalanceEditModalOpen}
          onClose={() => setIsAccountBalanceEditModalOpen(false)}
        />
      )}
    </>
  );
};
