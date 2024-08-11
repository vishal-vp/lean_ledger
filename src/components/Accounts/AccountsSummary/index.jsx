import { SectionHeading } from "@/components/SectionHeading";
import { useAtomValue } from "jotai";
import { totalBalanceAtom } from "@/atoms/transactions";
import { CURRENCY_SYMBOL } from "@/utils/constants";

import styles from "./index.module.scss";

export const AccountsSummary = () => {
  const totalBalance = useAtomValue(totalBalanceAtom);

  return (
    <div className={styles.accountSummary}>
      <SectionHeading
        title={"Balance"}
        value={`${CURRENCY_SYMBOL} ${totalBalance}`}
      />
    </div>
  );
};
