import { Header } from "./components/Header";
import { Dashboard } from "./modules/Dashboard";
import { NAVIGATION_MODULES } from "./utils/constants";
import { useAtomValue } from "jotai";
import { NavigationModuleAtom } from "./atoms/navigationModule";
import { Reports } from "./modules/Reports";

function App() {
  const navigationModule = useAtomValue(NavigationModuleAtom);
  const moduleComponentMapping = {
    [NAVIGATION_MODULES.DASHBOARD.key]: <Dashboard />,
    [NAVIGATION_MODULES.REPORTS.key]: <Reports />,
  };

  return (
    <>
      <Header />
      {/* {moduleComponentMapping[navigationModule]} */}
      <div className="module">{moduleComponentMapping[navigationModule]}</div>
    </>
  );
}

export default App;
