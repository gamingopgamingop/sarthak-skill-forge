import type { Task } from '../schema';

/**
 * Server function to manage Task lifecycle in Convex.
 *
 * NOTE: Renamed to `tasksController.ts` to avoid colliding with other existing files.
 *
 * Signature:
 * export default async function tasksController(
 *   ctx,
 *   params?: {
 *     action: 'create' | 'update' | 'delete' | 'complete' | 'reopen' | 'assign' | 'list';
 *     task?: Partial<Task>;
 *     id?: string;
 *     filter?: { assignedTo?: string; status?: Task['status']; includeDeleted?: boolean; limit?: number };
 *   }
 * ): Promise<Task | Task[] | null>
 *
 * Responsibilities / TODOs:
 * - Validate `params` and perform auth checks (use ctx.auth if your app tracks users).
 * - 'create': require title, set createdAt/createdBy, insert into 'tasks' collection, return created doc.
 * - 'update': require id, apply allowed patches, set updatedAt, return updated doc.
 * - 'delete': support hard delete or soft delete (set deleted flag); return null or updated doc.
 * - 'complete' / 'reopen': set status and updatedAt, return updated doc.
 * - 'assign': set assignedTo and updatedAt, return updated doc.
 * - 'list': query tasks collection with simple filters (status, assignedTo, includeDeleted, limit).
 * - Use Convex DB APIs: ctx.db.insert, ctx.db.patch, ctx.db.get, ctx.db.remove, ctx.db.query.
 * - Ensure timestamps use ISO strings (new Date().toISOString()) or Date objects consistently per your schema.
 * - Sanitize inputs (trim strings, validate dueDate format).
 * - Emit events or write audit entries if your application needs history.
 *
 * Authorization notes:
 * - If ctx.auth exists, use ctx.auth.userId to set createdBy and to restrict operations (e.g., only creator or assignee can modify).
 * - For admin capabilities (delete/hard-delete), check a role flag on the auth token or a list in AppSetting.
 *
 * Indexing:
 * - Add Convex indexes on 'assignedTo', 'status', and 'createdAt' for efficient listing and sorting.
 *
 * Error handling:
 * - Throw informative errors for missing params, not found, or unauthorized actions.
 *
 * Keep tokens and secrets server-side; never return sensitive fields to clients.
 */
export default async function tasksController(
  ctx: any,
  params?: {
    action?: 'create' | 'update' | 'delete' | 'complete' | 'reopen' | 'assign' | 'list';
    task?: Partial<Task>;
    id?: string;
    filter?: { assignedTo?: string; status?: Task['status']; includeDeleted?: boolean; limit?: number };
  }
): Promise<Task | Task[] | null> {
  // Basic validation
  if (!params || !params.action) {
    throw new Error('Missing action parameter');
  }

  // Example helpers (implement these or inline)
  // const now = new Date().toISOString();
  // const userId = ctx.auth?.userId ?? null;

  // TODO: Implement actual DB operations using ctx.db.*
  // PSEUDOCODE EXAMPLES:
  //
  // if (params.action === 'create') {
  //   if (!params.task?.title) throw new Error('Task title is required');
  //   const doc = {
  //     title: params.task.title.trim(),
  //     description: params.task?.description ?? null,
  //     status: params.task?.status ?? 'todo',
  //     dueDate: params.task?.dueDate ?? null,
  //     assignedTo: params.task?.assignedTo ?? null,
  //     createdBy: userId,
  //     createdAt: now,
  //     updatedAt: now,
  //     deleted: false,
  //   };
  //   const id = await ctx.db.insert('tasks', doc);
  //   return { ...doc, _id: id };
  // }
  //
  // if (params.action === 'update') {
  //   if (!params.id) throw new Error('Task id is required for update');
  //   const patch: any = {};
  //   if (params.task?.title) patch.title = params.task.title.trim();
  //   if (params.task?.description !== undefined) patch.description = params.task.description;
  //   if (params.task?.dueDate !== undefined) patch.dueDate = params.task.dueDate;
  //   patch.updatedAt = now;
  //   await ctx.db.patch('tasks', params.id, patch);
  //   return await ctx.db.get('tasks', params.id);
  // }
  //
  // if (params.action === 'complete' || params.action === 'reopen') {
  //   if (!params.id) throw new Error('Task id is required');
  //   const newStatus = params.action === 'complete' ? 'completed' : 'todo';
  //   await ctx.db.patch('tasks', params.id, { status: newStatus, updatedAt: now });
  //   return await ctx.db.get('tasks', params.id);
  // }
  //
  // if (params.action === 'assign') {
  //   if (!params.id || typeof params.task?.assignedTo !== 'string') throw new Error('id and assignedTo are required');
  //   await ctx.db.patch('tasks', params.id, { assignedTo: params.task!.assignedTo, updatedAt: now });
  //   return await ctx.db.get('tasks', params.id);
  // }
  //
  // if (params.action === 'delete') {
  //   if (!params.id) throw new Error('Task id is required for delete');
  //   // Soft delete:
  //   await ctx.db.patch('tasks', params.id, { deleted: true, updatedAt: now });
  //   return await ctx.db.get('tasks', params.id);
  //   // Or hard delete:
  //   // await ctx.db.remove('tasks', params.id);
  //   // return null;
  // }
  //
  // if (params.action === 'list') {
  //   const filter = params.filter ?? {};
  //   // Example: query tasks where deleted != true unless includeDeleted true
  //   // Build query with filters for assignedTo and status, and limit results
  //   // const q = ctx.db.query('tasks').order('createdAt', 'desc');
  //   // if (filter.assignedTo) q.eq('assignedTo', filter.assignedTo);
  //   // if (filter.status) q.eq('status', filter.status);
  //   // if (!filter.includeDeleted) q.ne('deleted', true);
  //   // const results = await q.take(filter.limit ?? 50).asArray();
  //   // return results;
  // }
  //
  // Default: unsupported action
  throw new Error(`Not implemented: action=${params.action}`);
}