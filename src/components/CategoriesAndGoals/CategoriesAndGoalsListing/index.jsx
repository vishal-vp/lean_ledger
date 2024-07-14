import { ProgressIndicator } from "@/components/ProgressIndicator";
import { SectionHeading } from "@/components/SectionHeading";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

import styles from "./index.module.scss";

export const CategoriesAndGoalsListing = ({ title }) => {
  return (
    <div className={styles.categoriesAndGoalsListing}>
      <SectionHeading
        title={title}
        actionButtons={[
          <Button icon={<EditOutlined />} />,
          <Button icon={<PlusOutlined />} />,
        ]}
      />
      <div className={styles.progressListing}>
        {Array(50)
          .fill(1)
          .map(() => (
            <ProgressIndicator value={86} target={100} name={"Grocery"} />
          ))}
      </div>
    </div>
  );
};
