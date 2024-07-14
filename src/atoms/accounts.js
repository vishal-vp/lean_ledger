import { atom } from "jotai";

export const accountBalanceAtom = atom(1002);

export const formattedAccountBalanceAtom = atom((get) => {
  const accountBalance = get(accountBalanceAtom);
  const rupeeFormat = Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  return rupeeFormat.format(accountBalance);
});
