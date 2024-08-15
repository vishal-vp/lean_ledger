import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const atomWithStorageAndReducer = (key, initialValue, reducer) => {
  const perisistentAtom = atomWithStorage(key, initialValue);
  const atomWithStorageAndReducer = atom(
    (get) => get(perisistentAtom),
    (get, set, action) => {
      set(perisistentAtom, reducer(get(perisistentAtom), action));
    }
  );
  return atomWithStorageAndReducer;
};
