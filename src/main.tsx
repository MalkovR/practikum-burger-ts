import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "./services/store";
import { BrowserRouter as Router } from "react-router-dom";

const store = configureStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
);
