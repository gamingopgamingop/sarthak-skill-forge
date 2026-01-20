// /renderer/_default.page.server.jsx
// Environment: server

import ReactDOMServer from "react-dom/server";
import React from "react";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr/server";

export { render };

async function render(pageContext) {
  const { Page, pageProps } = pageContext;
  const viewHtml = ReactDOMServer.renderToString(
    <Page {...pageProps} />
  );

  const title = "Vite SSR";

  return escapeInject`<!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(viewHtml)}</div>
      </body>
    </html>`;
}
