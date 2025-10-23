import type { Project } from '../schema';

/**
 * Server function: fetch GitHub repos from the GitHub API and upsert into Convex.
 *
 * Signature:
 * export default async function fetchGitHubProjects(ctx, params?: { username?: string; token?: string; perPage?: number }): Promise<void>
 *
 * TODOs (implement inside):
 * - Use the provided token (from environment variables stored in Convex secrets) for authenticated requests.
 * - Paginate through repos if needed.
 * - Map GitHub repo fields to the Project type above.
 * - Upsert into the 'projects' collection (create or update by githubId).
 * - Handle rate limiting and backoff; persist last sync time in an AppSetting doc if desired.
 * - Consider filtering by topics or a `pinned` list.
 *
 * Note: keep this function server-only (no client exposure of tokens).
 */
export default async function fetchGitHubProjects(ctx: any, params?: { username?: string; token?: string; perPage?: number }): Promise<void> {
  // TODO: implement body
  throw new Error('Not implemented');
}