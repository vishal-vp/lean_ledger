import { NAVIGATION_MODULES } from "@/utils/constants";
import { atom } from "jotai";

export const NavigationModuleAtom = atom(NAVIGATION_MODULES.DASHBOARD.key);
