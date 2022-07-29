import React from "react";
import ReactDOM from "react-dom";
import { ContractContextProvider } from "./context/contract-context";
import { ThemeContextProvider } from "./context/theme-context";
import { TransactionContextProvider } from "./context/trx-context";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ThemeContextProvider >
    <ContractContextProvider>
      <TransactionContextProvider >
        <App />
      </TransactionContextProvider>
    </ContractContextProvider>
    </ThemeContextProvider>
    
  </React.StrictMode>,
  document.getElementById("root")
);
