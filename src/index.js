import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { NavigationContextProvider } from "./context/navigation-context";
import { AppMuiThemeProvider } from "./utils/MuiThemeProvider";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <NavigationContextProvider>
      <Provider store={store}>
        <AppMuiThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AppMuiThemeProvider>
      </Provider>
    </NavigationContextProvider>
  </LocalizationProvider>
);

reportWebVitals();
