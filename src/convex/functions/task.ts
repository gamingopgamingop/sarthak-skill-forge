import type { Task } from '../schema';

/**
 * Server function to manage tasks in Convex.
 *
 * Signature:
 * export default async function task(
 *   ctx,
 *   params?: {
 *     action: 'create' | 'update' | 'delete' | 'complete';
 *     task?: Partial<Task>;
 *     id?: string;
 *   }
 * ): Promise<Task | null>
 *
 * Responsibilities / TODOs:
 * - Validate params and perform authorization checks (use ctx.auth if you track users).
 * - For 'create': validate required fields (title), add createdAt/createdBy, insert into 'tasks' collection.
 * - For 'update': apply allowed patches, set updatedAt, return updated document.
 * - For 'delete': remove by id (or soft-delete by setting a flag).
 * - For 'complete': set status to 'completed' and updatedAt.
 * - Use Convex DB operations (upsert/insert/replace/remove) and indexes as appropriate.
 * - Sanitize and normalize fields (dates as ISO strings or Date objects per your schema).
 * - Consider storing a history or audit entries if needed.
 *
 * Notes:
 * - Add a Task type to convex/schema.ts if it's not present:
 *   export type Task = {
 *     _id?: string;
 *     title: string;
 *     description?: string | null;
 *     status?: 'todo' | 'in_progress' | 'completed' | 'archived';
 *     dueDate?: string | null; // ISO timestamp
 *     assignedTo?: string | null; // user id
 *     createdBy?: string | null;
 *     createdAt?: string;
 *     updatedAt?: string;
 *   };
 *
 * - Keep token/secret use server-only and avoid leaking sensitive info to clients.
 */
export default async function task(
  ctx: any,
  params?: {
    action?: 'create' | 'update' | 'delete' | 'complete';
    task?: Partial<Task>;
    id?: string;
  }
): Promise<Task | null> {
  // TODO: implement with Convex DB API:
  // - Validate `params`
  // - Switch on params.action and perform the correct DB operation:
  //    - ctx.db.insert('tasks', doc)
  //    - ctx.db.patch('tasks', id, patch)
  //    - ctx.db.remove('tasks', id)
  //    - ctx.db.replace('tasks', id, newDoc) or similar
  // - Return the created/updated Task, or null for delete.
  // - Ensure timestamps (createdAt/updatedAt) and createdBy are recorded.
  //
  // Example (pseudocode):
  // if (!params || !params.action) throw new Error('Missing action');
  // if (params.action === 'create') {
  //   const doc = { ...params.task, createdAt: new Date().toISOString(), createdBy: ctx.auth?.userId ?? null };
  //   const id = await ctx.db.insert('tasks', doc);
  //   return { ...doc, _id: id };
  // }
  //
  // Keep this function server-only and call it from a scheduled sync, an authenticated API route,
  // or from other Convex server functions as needed.

  throw new Error('Not implemented');
}