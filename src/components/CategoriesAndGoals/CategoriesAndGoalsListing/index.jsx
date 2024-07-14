import { ProgressIndicator } from "@/components/ProgressIndicator";
import { SectionHeading } from "@/components/SectionHeading";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

import styles from "./index.module.scss";
import { useAtom } from "jotai";
import { categoriesAtom } from "@/atoms/categories";
import { useState } from "react";
import { AddEditCategoryModal } from "./AddEditCategoryModal";

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
            <Button icon={<EditOutlined />} />,
            <Button
              icon={
                <PlusOutlined
                  onClick={() => setIsAddCategoryModalVisible(true)}
                />
              }
            />,
          ]}
        />
        <div className={styles.progressListing}>
          {categories?.map((category) => (
            <ProgressIndicator
              key={category.id}
              value={category.amountPending}
              target={category.budgetAmount}
              name={category.name}
            />
          ))}
        </div>
      </div>
      <AddEditCategoryModal
        isOpen={isAddCategoryModalVisible}
        onClose={() => setIsAddCategoryModalVisible(false)}
      />
    </>
  );
};
