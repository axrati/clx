// theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    // Choose your overall theme mode: 'light' or 'dark'
    mode: "dark",
    primary: {
      main: "#1976d2",
      light: "#63a4ff",
      dark: "#004ba0",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#00FFA6",
      contrastText: "#111",
    },
    error: {
      main: "#D043FF",
      contrastText: "#111",
    },
    warning: {
      main: "#686868",
      light: "#686868",
      dark: "#686868",
      contrastText: "#ffffff",
    },
  },
});

export default theme;
