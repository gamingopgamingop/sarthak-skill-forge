import type { Project } from '../schema';

/**
 * Query function: return a list of projects for frontend consumption.
 *
 * Signature:
 * export default async function getProjects(ctx, args?: { limit?: number; language?: string; pinnedOnly?: boolean }): Promise<Project[]>
 *
 * TODOs:
 * - Query the 'projects' collection with appropriate indexes (create indexes in Convex if needed).
 * - Support simple filters: language, pinnedOnly, search text (optional).
 * - Return a sanitized Project[] (omit internal fields if necessary).
 */
export default async function getProjects(ctx: any, args?: { limit?: number; language?: string; pinnedOnly?: boolean }): Promise<Project[]> {
  // TODO: implement query against Convex 'projects' collection
  throw new Error('Not implemented');
}