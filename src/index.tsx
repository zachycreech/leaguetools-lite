import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createGlobalStyle } from "styled-components";
//@ts-ignore
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Roboto:300,400,500,700,900"],
  },
});

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
  `;

window.React = React; // No idea why this is needed, but it is.

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <>
    <GlobalStyle />
    <App />
  </>,
);
