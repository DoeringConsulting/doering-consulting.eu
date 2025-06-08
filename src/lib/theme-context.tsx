import React, { createContext, useContext, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import theme from './theme';

// Erstellen eines Kontexts für das Theme
const ThemeContext = createContext(theme);

// Hook für den einfachen Zugriff auf das Theme
export const useTheme = () => useContext(ThemeContext);

// ThemeProvider-Komponente
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
