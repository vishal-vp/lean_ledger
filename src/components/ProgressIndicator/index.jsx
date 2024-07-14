import { Progress } from "antd";

import styles from "./index.module.scss";

export const ProgressIndicator = ({ name, value = 0, target }) => {
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
  const isProgressAtLowerExtreme = progressPercentage <= 0;
  const isProgressAtUpperExtreme = progressPercentage >= 100;

  return (
    <div>
      <div className={styles.progressIndicatorInfo}>
        <span>{name}</span>
        <span>{target}</span>
      </div>
      <Progress
        title={value}
        showInfo={isProgressAtLowerExtreme || isProgressAtUpperExtreme}
        status={isProgressAtLowerExtreme ? "exception" : "success"}
        percent={progressPercentage}
        strokeColor={strokeColor}
        size={{ height: 5 }}
      />
    </div>
  );
};
