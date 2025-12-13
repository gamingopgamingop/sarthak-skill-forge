declare module "hookrouter" {
  import * as React from "react";

  export type RouteObject = Record<
    string,
    () => React.ReactElement
  >;

  export function useRoutes(
    routes: RouteObject
  ): React.ReactElement | null;
  export function useRedirect(
    uri: string,
    redirectUri: string
  ): void;
  export function useNotFound(
    handler: () => React.ReactElement
  ): void;
  export function usePath(): string;
  export function useMatch(pattern: string): boolean;
  export function useBasePath(): string;
  export function useQueryString(): URLSearchParams;
  export function useQueryParam(key: string): string | null;
  export function useQueryParams(): URLSearchParams;
  export function navigate(
    uri: string,
    replace?: boolean
  ): void;
  export function refresh(): void;
  export function persist(): void;
  export function setQueryParams(
    params: URLSearchParams
  ): void;
  export function setQueryParam(
    key: string,
    value: string
  ): void;
  export function setBasePath(basePath: string): void;
  export function persistQueryParams(): void;
  export function persistQueryParam(key: string): void;
  export function persistQueryParamsAndNavigate(
    uri: string,
    replace?: boolean
  ): void;
  export function persistQueryParamAndNavigate(
    key: string,
    value: string,
    replace?: boolean
  ): void;
  export function persistBasePathAndNavigate(
    uri: string,
    replace?: boolean
  ): void;
  export function persistBasePath(): void;
  export function useLocation(): {
    uri: string;
    query: URLSearchParams;
    hash: string;
  };
  export function useResolvedPath(path: string): string;

  export const A: React.FC<
    React.AnchorHTMLAttributes<HTMLAnchorElement>
  >;
}
