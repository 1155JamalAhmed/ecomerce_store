import { createTheme, ThemeProvider } from "@mui/material/styles";

const appTheme = createTheme({
  palette: {
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
          fontWeight: "normal",
        },
      },
    },
    // MuiTextField: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: "lightgray",
    //       borderRadius: "6px",
    //       "::placeholder": "red"
    //     },
    //   },
    // },
  },
});

export const AppMuiThemeProvider = (props) => {
  return <ThemeProvider theme={appTheme}>{props.children}</ThemeProvider>;
};
