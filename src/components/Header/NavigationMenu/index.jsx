import { NavigationModuleAtom } from "@/atoms/navigationModule";
import { NAVIGATION_MODULES } from "@/utils/constants";
import { Menu } from "antd";
import { useAtom } from "jotai";

import styles from "./index.module.scss";

export const NavigationMenu = () => {
  const [navigationModule, setNavigationModule] = useAtom(NavigationModuleAtom);

  return (
    <Menu
      className={styles.navigationMenu}
      mode="horizontal"
      selectedKeys={[navigationModule]}
      onClick={(event) => setNavigationModule(event.key)}
      items={Object.values(NAVIGATION_MODULES)}
    />
  );
};
