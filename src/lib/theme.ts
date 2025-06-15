import { DefaultTheme } from 'styled-components';

// Erweiterung der DefaultTheme-Schnittstelle
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      gold: string;
      lightGold: string;
      paleGold: string;
      white: string;
      black: string;
      gray: string;
      lightGray: string;
      darkGray: string;
      text: string;
      textLight: string;
      background: string;
    };
    fonts: {
      primary: string;
      secondary: string;
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}

// Farbcodes aus dem Corporate Design
export const colors = {
  primary: '#048998', // Türkis/Teal
  secondary: '#333333',
  gold: '#b98847', // Gold-Farbcode
  lightGold: '#dbbe76', // Helles Gold
  paleGold: '#fdf5a6', // Blasses Gold
  white: '#FFFFFF',
  black: '#000000',
  gray: '#f5f5f5',
  lightGray: '#e9ecef',
  darkGray: '#495057',
  text: '#333333',
  textLight: '#6c757d',
  background: '#F8F9FA'
};

// Schriftarten
export const fonts = {
  primary: "'Roboto', 'Helvetica Neue', sans-serif",
  secondary: "'Roboto Slab', serif"
};

// Breakpoints für Responsive Design
export const breakpoints = {
  xs: '0px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px'
};

// Das vollständige Theme-Objekt
export const theme: DefaultTheme = {
  colors,
  fonts,
  breakpoints
};

export default theme;
