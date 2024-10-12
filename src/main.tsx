import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app";
import "./index.css";
import { Provider } from "react-redux";
import {configureStore} from "./services/store"

const store = configureStore()


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
