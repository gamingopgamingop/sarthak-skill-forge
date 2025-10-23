/**
 * Frontend Convex client initialization blueprint.
 *
 * TODOs:
 * - Install `convex` and `convex/react` packages.
 * - Initialize a single Convex client instance (use createConvexClient) and export it.
 * - Wrap your app with <ConvexProvider client={client}> in _app.tsx or root layout.
 *
 * Suggested exports:
 * - export const convexClient = createConvexClient(process.env.NEXT_PUBLIC_CONVEX_URL);
 * - export type infered types from Convex if using codegen.
 */

// Example declarations only:
export declare const convexClient: unknown;
export declare function initializeConvexClient(url?: string): unknown;