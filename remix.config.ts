// Remix v1.15+ and v2
// @ts-ignore
// @ts-nocheck

import { createRoutesFromFolders } from "@remix-run/v1-route-convention";
/** @type {import('@remix-run/dev').AppConfig} */
export default {
  future: {
    v2_dev: true,
  },

  routes(defineRoutes) {
    // uses the v1 convention, works in v1.15+ and v2
    return createRoutesFromFolders(defineRoutes);
  },
};
