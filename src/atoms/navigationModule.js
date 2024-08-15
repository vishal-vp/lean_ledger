import { ATOM_PERISISTENCE_KEYS, NAVIGATION_MODULES } from "@/utils/constants";
import { atomWithStorage } from "jotai/utils";

export const NavigationModuleAtom = atomWithStorage(
  ATOM_PERISISTENCE_KEYS.NAVIGATION,
  NAVIGATION_MODULES.DASHBOARD.key
);
