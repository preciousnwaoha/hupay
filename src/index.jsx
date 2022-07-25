import React from "react";
import ReactDOM from "react-dom";
import { ContractContextProvider } from "./context/contract-context";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ContractContextProvider>
      <App />
    </ContractContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
