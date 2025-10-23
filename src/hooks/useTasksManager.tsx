import { useQuery, useMutation } from 'convex/react';
import type { Task } from '../../convex/schema';

export type TasksFilter = {
  assignedTo?: string;
  status?: Task['status'];
  includeDeleted?: boolean;
  limit?: number;
};

export type UseTasksManagerOpts = {
  filter?: TasksFilter;
};

/**
 * useTasksManager
 *
 * - Subscribes to the Convex server function `tasksController` using the 'list' action to read tasks.
 * - Uses a mutation against the same server function for create/update/delete/complete/assign actions.
 *
 * Notes:
 * - `tasksController` should implement the actions: 'list' | 'create' | 'update' | 'delete' | 'complete' | 'reopen' | 'assign'
 * - Keep sensitive checks and authorization server-side (use ctx.auth in tasksController).
 * - This hook assumes tasksController returns Task[] for the 'list' action and Task for create/update/complete/etc.
 *
 * TODO:
 * - Ensure convex/functions/tasksController.ts exists and matches the action shapes used below.
 * - Add proper error handling and UI-facing messages where needed.
 */
export function useTasksManager(opts?: UseTasksManagerOpts) {
  const queryArgs = { action: 'list', filter: opts?.filter ?? {} };

  // Subscribe to the server-side list action. While loading, `tasksFromServer` will be undefined.
  const tasksFromServer = useQuery('tasksController', queryArgs) as Task[] | undefined;

  // Mutation used to perform state-changing actions on tasksController.
  const mutate = useMutation('tasksController');

  const loading = tasksFromServer === undefined;
  const tasks = tasksFromServer ?? null;

  // CRUD helpers that call the server mutation. All server-side logic (validation/auth) must run in tasksController.
  async function createTask(task: Partial<Task>) {
    // Must include required fields (title) on the caller side or rely on server validation.
    const result = await mutate({ action: 'create', task });
    return result as Task;
  }

  async function updateTask(id: string, patch: Partial<Task>) {
    const result = await mutate({ action: 'update', id, task: patch });
    return result as Task;
  }

  async function deleteTask(id: string, hard = false) {
    if (hard) {
      // If you support hard delete in server by using a different flag/action, adjust accordingly.
      const result = await mutate({ action: 'delete', id });
      return result as Task | null;
    } else {
      // Soft delete is default in tasksController pseudocode earlier
      const result = await mutate({ action: 'delete', id });
      return result as Task | null;
    }
  }

  async function completeTask(id: string) {
    const result = await mutate({ action: 'complete', id });
    return result as Task;
  }

  async function reopenTask(id: string) {
    const result = await mutate({ action: 'reopen', id });
    return result as Task;
  }

  async function assignTask(id: string, assignedTo: string | null) {
    const result = await mutate({ action: 'assign', id, task: { assignedTo } });
    return result as Task;
  }

  // Manual refetch: call the list action via mutation (server should return the list).
  // Note: Convex queries are reactive; usually you don't need to call this. Use when you trigger a server-side sync
  // that does not change the DB directly or when you want to force the controller to recompute.
  async function refetch(): Promise<Task[] | null> {
    const result = await mutate({ action: 'list', filter: opts?.filter ?? {} });
    return (result as Task[]) ?? null;
  }

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
    reopenTask,
    assignTask,
    refetch,
  };
}