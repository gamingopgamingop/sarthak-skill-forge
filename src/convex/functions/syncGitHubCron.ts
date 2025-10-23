/**
 * Optional scheduled Convex function to run periodic syncs.
 *
 * Signature:
 * export default async function syncGitHubCron(ctx): Promise<void>
 *
 * TODOs:
 * - Call fetchGitHubProjects from here (invoke as an internal function or duplicate small orchestration).
 * - Set this function to run on a schedule using Convex's scheduler (or use an external scheduler that triggers a webhook).
 * - Store last successful run timestamp in AppSetting if you need monitoring.
 */
export default async function syncGitHubCron(ctx: any): Promise<void> {
  // TODO: call fetchGitHubProjects and persist last run metadata
  throw new Error('Not implemented');
}