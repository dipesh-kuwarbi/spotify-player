import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  shadows: {
    xs: "0 0 5px rgba(255, 0, 0, 0.5)",
    "dark-lg": "0 20px 25px rgba(0, 0, 0, 0.5)",
    inner: "inset 0 2px 4px 0 rgba(255, 255, 255, 0.5)",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
