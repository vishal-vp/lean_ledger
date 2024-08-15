import logo from "@/assets/logo.svg";
import { Image, Layout, Typography } from "antd";
import styles from "./index.module.scss";

export const Header = () => {
  return (
    <Layout.Header className={styles.headerContainer}>
      <Image className={styles.logo} preview={false} src={logo} />
      <Typography.Title className={styles.productName} level={3}>
        Lean Ledger
      </Typography.Title>
    </Layout.Header>
  );
};
