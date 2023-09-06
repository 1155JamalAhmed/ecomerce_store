import { useLocation } from "react-router-dom";

const useActiveTab = (activeTabMapping) => {
  const location = useLocation();

  const activeTab = activeTabMapping[location.pathname] || 1;

  return activeTab;
};

export default useActiveTab;
