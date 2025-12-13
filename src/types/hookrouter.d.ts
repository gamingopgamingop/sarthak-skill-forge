declare module "hookrouter" {
  import * as React from "react";

  export type RouteObject = Record<
    string,
    () => React.ReactElement
  >;

  export function useRoutes(
    routes: RouteObject
  ): React.ReactElement | null;

  export const A: React.FC<
    React.AnchorHTMLAttributes<HTMLAnchorElement>
  >;
}
