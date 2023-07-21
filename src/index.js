import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { NavigationContextProvider } from "./context/navigation-context";
import { AppMuiThemeProvider } from "./utils/MuiThemeProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <NavigationContextProvider>
    <Provider store={store}>
      <AppMuiThemeProvider>
        <App />
      </AppMuiThemeProvider>
    </Provider>
  </NavigationContextProvider>
);

reportWebVitals();
