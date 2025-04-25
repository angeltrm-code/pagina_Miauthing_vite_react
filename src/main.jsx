import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, UNSAFE_DataRouterContext, UNSAFE_DataRouterStateContext } from "react-router-dom";
import App from "./App";
import "./styles/variables.css";
import "./styles/index.css";

// Configuración de las futuras características de React Router v7
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter {...router}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
