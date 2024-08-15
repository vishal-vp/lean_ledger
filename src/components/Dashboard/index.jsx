import { AccountsSummary } from "../Accounts/AccountsSummary";
import { CategoriesAndGoals } from "../CategoriesAndGoals";
import { Panel } from "../Panel";
import { Transactions } from "../Transactions";
import styles from "./index.module.scss";

export const Dashboard = () => {
  return (
    <div className={styles.mainLayout}>
      <Panel className={styles.sidePanel}>
        <AccountsSummary />
        <CategoriesAndGoals />
      </Panel>
      <Panel className={styles.mainPanel}>
        <Transactions />
      </Panel>
    </div>
  );
};
