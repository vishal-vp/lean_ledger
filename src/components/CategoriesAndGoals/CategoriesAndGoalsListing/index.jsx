import { SectionHeading } from "@/components/SectionHeading";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

import styles from "./index.module.scss";
import { useAtomValue } from "jotai";
import { categoriesAtom } from "@/atoms/categories";
import { useState } from "react";
import { AddEditCategoryModal } from "./AddEditCategoryModal";
import { CategoriesListing } from "./CategoriesListing";

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
            <Button icon={<EditOutlined />} />,
            <Button
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
