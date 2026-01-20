// /renderer/_default.page.client.jsx
// Environment: browser

import ReactDOM from "react-dom/client";
import React from "react";

export { render };

async function render(pageContext) {
  const { Page, pageProps } = pageContext
  ReactDOM.hydrateRoot(
    document.getElementById("page-view"),
    <Page {...pageProps} />
  );
}
