import type { Task } from '../schema';

/**
 * Server function to manage tasks in Convex.
 *
 * NOTE: Renamed from `task.ts` to `manageTask.ts` to avoid name collisions
 * with existing frontend hooks (e.g., useProjects) and to make intent clearer.
 *
 * Signature:
 * export default async function manageTask(
 *   ctx,
 *   params?: {
 *     action: 'create' | 'update' | 'delete' | 'complete' | 'reopen';
 *     task?: Partial<Task>;
 *     id?: string;
 *   }
 * ): Promise<Task | null>
 *
 * Responsibilities / TODOs:
 * - Validate `params` and perform authorization checks (use ctx.auth if you track users).
 * - For 'create': validate required fields (title), add createdAt/createdBy, insert into 'tasks' collection.
 * - For 'update': apply allowed patches, set updatedAt, and return the updated document.
 * - For 'delete': remove by id (or soft-delete by setting a flag).
 * - For 'complete'/'reopen': set status accordingly and updatedAt.
 * - Use Convex DB operations (insert/patch/remove/replace) and indexes as appropriate.
 * - Sanitize/normalize fields (dates as ISO strings or Date objects per your schema).
 * - Consider writing audit entries or emitting events if needed.
 *
 * Implementation guidance (pseudocode comments inside):
 */
export default async function manageTask(
  ctx: any,
  params?: {
    action?: 'create' | 'update' | 'delete' | 'complete' | 'reopen';
    task?: Partial<Task>;
    id?: string;
  }
): Promise<Task | null> {
  // TODO: Validate input
  // if (!params || !params.action) throw new Error('Missing action');

  // TODO: Optionally check authorization
  // const userId = ctx.auth?.userId ?? null;
  // if (!userId) throw new Error('Authentication required');

  // Example pseudocode flow:
  // switch (params.action) {
  //   case 'create':
  //     // validate required fields: params.task?.title
  //     // const doc = { ...params.task, status: params.task?.status ?? 'todo', createdAt: new Date().toISOString(), createdBy: userId };
  //     // const id = await ctx.db.insert('tasks', doc);
  //     // return { ...doc, _id: id };
  //
  //   case 'update':
  //     // ensure params.id present
  //     // const patch = { ...allowed fields from params.task, updatedAt: new Date().toISOString() };
  //     // await ctx.db.patch('tasks', params.id, patch);
  //     // const updated = await ctx.db.get('tasks', params.id);
  //     // return updated;
  //
  //   case 'complete':
  //     // await ctx.db.patch('tasks', params.id, { status: 'completed', updatedAt: new Date().toISOString() });
  //     // return await ctx.db.get('tasks', params.id);
  //
  //   case 'reopen':
  //     // await ctx.db.patch('tasks', params.id, { status: 'todo', updatedAt: new Date().toISOString() });
  //     // return await ctx.db.get('tasks', params.id);
  //
  //   case 'delete':
  //     // Option A: hard delete: await ctx.db.remove('tasks', params.id); return null;
  //     // Option B: soft delete: await ctx.db.patch('tasks', params.id, { deleted: true, updatedAt: new Date().toISOString() }); return await ctx.db.get('tasks', params.id);
  //
  //   default:
  //     throw new Error(`Unsupported action: ${params.action}`);
  // }

  // Keep this function server-only and call it from a scheduler, API route, or from the frontend with proper auth.
  throw new Error('Not implemented');
}