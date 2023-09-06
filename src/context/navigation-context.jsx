// Redundant and this will be removed soon

import React, { useCallback, useState } from "react";

// Creating Context
const NavigationContext = React.createContext({
  activeNavOption: Number,
  changeActiveNavOption: (activeNav) => {},
});

// Creating Context Provider from context
export const NavigationContextProvider = (props) => {
  const [activeOption, setActiveOption] = useState(1);
  const changeActiveOptionHandler = useCallback((activeNav) => {
    setActiveOption(activeNav);
  }, []);

  const contextValue = {
    activeNavOption: activeOption,
    changeActiveNavOption: changeActiveOptionHandler,
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {props.children}
    </NavigationContext.Provider>
  );
};

export default NavigationContext;
