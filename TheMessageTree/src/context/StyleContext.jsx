import { createContext, useContext, useState } from 'react';

// Create context with default values
const StyleContext = createContext({
  styleOptions: [1, 2],
  currentStyle: 1,
  setCurrentStyle: () => {}
});

// Create a provider component
export const StyleProvider = ({ children }) => {
    const [currentStyle, setCurrentStyle] = useState(1);
    const styleOptions = [1, 2];
    
    // Value to be provided to consumers
    const value = {
      styleOptions,
      currentStyle,
      setCurrentStyle
    };
    
    return (
      <StyleContext.Provider value={value}>
        {children}
      </StyleContext.Provider>
    );
  };
  
  // Custom hook for using this context
  export const useStyleContext = () => useContext(StyleContext);