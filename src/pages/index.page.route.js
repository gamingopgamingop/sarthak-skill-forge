// /pages/index.page.route.js

// Note how the two files share the same base `/pages/index.page.`; this is how `vite-plugin-ssr`
// knows that `/pages/index.page.route.js` defines the route of `/pages/index.page.jsx`.

// Route Function
export default pageContext => pageContext.urlPathname === '/';

// If we don't create a `.page.route.js` file then vite-plugin-ssr does Filesystem Routing