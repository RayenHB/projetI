import React from "react";
import { createRoot } from "react-dom/client";
import Layout from "./components/layout";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Layout />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
