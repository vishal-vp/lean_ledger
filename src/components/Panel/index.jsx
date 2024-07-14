import classNames from "classnames";
import styles from "./index.module.scss";

export const Panel = ({ children, className }) => {
  return <div className={classNames(styles.panel, className)}>{children}</div>;
};
