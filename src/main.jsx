import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/system";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "./vendors/query-client.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
      <ReactQueryDevtools client={queryClient} />
    </NextUIProvider>
  </React.StrictMode>,
);
