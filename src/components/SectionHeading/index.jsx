import { Grid, Typography } from "antd";

import styles from "./index.module.scss";

const { useBreakpoint } = Grid;

export const SectionHeading = ({ title, value, actionButtons }) => {
  const { md } = useBreakpoint();

  return (
    <div className={`${styles.sectionHeading} sectionHeading`}>
      <Typography.Title level={md ? 4 : 5}>{title}</Typography.Title>
      <div className={styles.actionButtonsContainer}>
        <span>{value}</span>
        {actionButtons}
      </div>
    </div>
  );
};
