import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { NAVIGATION_MODULES } from "./utils/constants";
import { useAtomValue } from "jotai";
import { NavigationModuleAtom } from "./atoms/navigationModule";

function App() {
  const navigationModule = useAtomValue(NavigationModuleAtom);
  const moduleComponentMapping = {
    [NAVIGATION_MODULES.DASHBOARD.key]: <Dashboard />,
  };

  return (
    <>
      <Header />
      {moduleComponentMapping[navigationModule]}
    </>
  );
}

export default App;
