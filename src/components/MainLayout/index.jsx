import { Panel } from "../Panel";
import styles from "./index.module.scss";

export const MainLayout = () => {
  return (
    <div className={styles.mainLayout}>
      <Panel className={styles.sidePanel}>
        {Array(25)
          .fill(1)
          .map(() => (
            <div>HELLO WORLD</div>
          ))}
      </Panel>
      <Panel className={styles.mainPanel}>
        {Array(55)
          .fill(1)
          .map(() => (
            <div>HELLO WORLD</div>
          ))}
      </Panel>
    </div>
  );
};
