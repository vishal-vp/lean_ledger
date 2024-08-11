import { Typography } from "antd";

import styles from "./index.module.scss";

export const SectionHeading = ({ title, value, actionButtons }) => {
  return (
    <div className={`${styles.sectionHeading} sectionHeading`}>
      <Typography.Title level={4}>{title}</Typography.Title>
      <div className={styles.actionButtonsContainer}>
        <span>{value}</span>
        {actionButtons}
      </div>
    </div>
  );
};
