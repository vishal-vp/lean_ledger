import { SectionHeading } from "@/components/SectionHeading";
import { useAtomValue } from "jotai";
import { totalBalanceAtom } from "@/atoms/transactions";
import { CURRENCY_SYMBOL } from "@/utils/constants";

export const AccountsSummary = () => {
  const totalBalance = useAtomValue(totalBalanceAtom);

  return (
    <>
      <SectionHeading
        title={"Balance"}
        value={`${CURRENCY_SYMBOL} ${totalBalance}`}
      />
    </>
  );
};
