import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const appTheme = createTheme({
  palette: {
    primary: {
      main: "#f50057",
    },
    secondary: {
      main: "#4caf50",
    },
    tertiary: "#4caf50",
  },
});

export const AppMuiThemeProvider = (props) => {
  return <ThemeProvider theme={appTheme}>{props.children}</ThemeProvider>;
};
