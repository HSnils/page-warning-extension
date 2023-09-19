import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Content } from "./Content";
import "./content.css";
import { addPrefixToId, createElement } from "./createElement";

const root = createElement(`<div id="${addPrefixToId("content-root")}"></div>`);
document.body.append(root);

const queryClient = new QueryClient();

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Content />
    </QueryClientProvider>
  </React.StrictMode>,
);
