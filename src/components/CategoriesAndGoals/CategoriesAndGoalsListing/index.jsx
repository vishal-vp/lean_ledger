import { SectionHeading } from "@/components/SectionHeading";
import { PlusOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons";
import { Button } from "antd";

import styles from "./index.module.scss";
import { useAtomValue } from "jotai";
import { categoriesAtom } from "@/atoms/categories";
import { useState } from "react";
import { AddEditCategoryModal } from "./AddEditCategoryModal";
import { CategoriesListing } from "./CategoriesListing";
import DepositIcon from "@/assets/deposit-icon.svg?react";

export const CategoriesAndGoalsListing = ({ title }) => {
  const categories = useAtomValue(categoriesAtom);
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] =
    useState(false);

  return (
    <>
      <div className={styles.categoriesAndGoalsListing}>
        <SectionHeading
          title={title}
          actionButtons={[
            <Button
              title="Allocate Budget"
              icon={<Icon component={DepositIcon} />}
            />,
            <Button
              title="Add New Category"
              onClick={() => setIsAddCategoryModalVisible(true)}
              icon={<PlusOutlined />}
            />,
          ]}
        />
        <CategoriesListing categories={categories} />
      </div>
      {isAddCategoryModalVisible && (
        <AddEditCategoryModal
          isOpen={isAddCategoryModalVisible}
          onClose={() => setIsAddCategoryModalVisible(false)}
        />
      )}
    </>
  );
};
