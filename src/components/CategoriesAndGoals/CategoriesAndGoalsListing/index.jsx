import { SectionHeading } from "@/components/SectionHeading";
import { PlusOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

import styles from "./index.module.scss";
import { useAtom } from "jotai";
import { categoriesAtom } from "@/atoms/categories";
import { useState } from "react";
import { AddEditCategoryModal } from "./AddEditCategoryModal";
import { CategoriesListing } from "./CategoriesListing";
import DepositIcon from "@/assets/deposit-icon.svg?react";

function refillCategories(categories) {
  return categories?.map((category) => ({
    ...category,
    amountPending: category?.budgetAmount,
  }));
}

export const CategoriesAndGoalsListing = ({ title }) => {
  const [categories, setCategories] = useAtom(categoriesAtom);
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] =
    useState(false);

  return (
    <>
      <div className={styles.categoriesAndGoalsListing}>
        <SectionHeading
          title={title}
          actionButtons={[
            <Popconfirm
              title="Refill categories?"
              key="Allocate Budget"
              onConfirm={() =>
                setCategories((existingCategories) =>
                  refillCategories(existingCategories)
                )
              }
            >
              <Button
                title="Allocate Budget"
                icon={<Icon component={DepositIcon} title="Allocate Budget" />}
              />
            </Popconfirm>,
            <Button
              title="Add New Category"
              key="Add New Category"
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
