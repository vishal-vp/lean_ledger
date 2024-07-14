import { Progress } from "antd";

import styles from "./index.module.scss";

export const ProgressIndicator = ({ name, value, target }) => {
  const progressPercentage = (value / target) * 100;
  let strokeColor;
  if (progressPercentage > 75) {
    strokeColor = "#52c41a";
  } else if (progressPercentage > 50) {
    strokeColor = "blue";
  } else if (progressPercentage > 25) {
    strokeColor = "orange";
  } else {
    strokeColor = "red";
  }

  return (
    <div>
      <div className={styles.progressIndicatorInfo}>
        <span>{name}</span>
        <span>{value}</span>
      </div>
      <Progress
        showInfo={false}
        percent={progressPercentage}
        strokeColor={strokeColor}
        size={{ height: 5 }}
      />
    </div>
  );
};
