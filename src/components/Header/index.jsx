import logo from "@/assets/logo.svg";
import { Image } from "antd";
import styles from "./index.module.scss";

export const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <Image className={styles.logo} preview={false} src={logo} />
    </div>
  );
};
