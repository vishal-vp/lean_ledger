import { AccountsSummary } from "../Accounts/AccountsSummary";
import { Panel } from "../Panel";
import styles from "./index.module.scss";

export const MainLayout = () => {
  return (
    <div className={styles.mainLayout}>
      <Panel className={styles.sidePanel}>
        <AccountsSummary />
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
