import { AccountsSummary } from "../../components/Accounts/AccountsSummary";
import { CategoriesAndGoals } from "../../components/CategoriesAndGoals";
import { Panel } from "../../components/Panel";
import { Transactions } from "../../components/Transactions";
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
