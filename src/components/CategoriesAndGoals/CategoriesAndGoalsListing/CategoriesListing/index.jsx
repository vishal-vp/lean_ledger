import { ProgressIndicator } from "@/components/ProgressIndicator";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

import styles from "./index.module.scss";
import { useSetAtom } from "jotai";
import { categoriesAtom } from "@/atoms/categories";

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

  function handleDeleteCategory(deletedCategoryId) {
    setCategories((existingCategories) => {
      return existingCategories?.filter(({ id }) => id !== deletedCategoryId);
    });
  }

  return (
    <div className={styles.categoriesListing}>
      {categories?.map((category) => (
        <ProgressIndicator
          key={category.id}
          value={category.amountPending}
          target={category.budgetAmount}
          name={category.name}
          actionButtons={[
            <Button size="small" icon={<EditOutlined />} />,
            <DeleteButton onDelete={() => handleDeleteCategory(category.id)} />,
          ]}
        />
      ))}
    </div>
  );
};
