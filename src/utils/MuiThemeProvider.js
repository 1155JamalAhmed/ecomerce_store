import { createTheme, ThemeProvider } from "@mui/material/styles";

const appTheme = createTheme({
  palette: {
    // primary: {
    //   main: "#f50057",
    // },
    // secondary: {
    //   main: "#4caf50",
    // },
    tertiary: {
      main: "#000",
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export const AppMuiThemeProvider = (props) => {
  return <ThemeProvider theme={appTheme}>{props.children}</ThemeProvider>;
};
