import { ProgressIndicator } from "@/components/ProgressIndicator";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

import styles from "./index.module.scss";
import { useSetAtom } from "jotai";
import { categoriesAtom } from "@/atoms/categories";
import { AddEditCategoryModal } from "../AddEditCategoryModal";
import { useState } from "react";

const DeleteButton = ({ onDelete }) => {
  return (
    <Popconfirm
      title="Delete Category"
      description="Are you sure you want to delete this category?"
      onConfirm={onDelete}
    >
      <Button size="small" icon={<DeleteOutlined />} />
    </Popconfirm>
  );
};

export const CategoriesListing = ({ categories }) => {
  const setCategories = useSetAtom(categoriesAtom);
  const [categoryBeingEdited, setCategoryBeingEdited] = useState();
  const [isEditCategoryModalVisible, setIsEditCategoryModalVisible] =
    useState(false);

  function handleDeleteCategory(deletedCategoryId) {
    setCategories((existingCategories) => {
      return existingCategories?.filter(({ id }) => id !== deletedCategoryId);
    });
  }

  return (
    <>
      <div className={styles.categoriesListing}>
        {categories
          ?.sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
          })
          ?.map((category) => (
            <ProgressIndicator
              key={category.id}
              value={category.amountPending}
              target={category.budgetAmount}
              name={category.name}
              actionButtons={[
                <Button
                  size="small"
                  onClick={() => {
                    setIsEditCategoryModalVisible(true);
                    setCategoryBeingEdited(category);
                  }}
                  icon={<EditOutlined />}
                />,
                <DeleteButton
                  onDelete={() => handleDeleteCategory(category.id)}
                />,
              ]}
            />
          ))}
      </div>
      {isEditCategoryModalVisible && (
        <AddEditCategoryModal
          onClose={() => {
            setIsEditCategoryModalVisible(false);
            setCategoryBeingEdited(undefined);
          }}
          isOpen={isEditCategoryModalVisible}
          categoryBeingEdited={categoryBeingEdited}
        />
      )}
    </>
  );
};
