import { config as envConfig } from '../lib/env.js';
 
export const config = {
  type: 'cron',
  name: 'UptimeCronTrigger',
  cron: envConfig.cron,
  emits: ['check.requested'],
  flows: ['uptime-monitoring']
};
 
export async function handler(context) {
  context.logger.info(`Starting uptime checks for ${envConfig.sites.length} sites`);
  context.logger.info(`Sites configured: ${JSON.stringify(envConfig.sites)}`);
 
  try {
    // Emit one check.requested event per configured site URL
    for (const url of envConfig.sites) {
      context.logger.info(`Scheduling check for: ${url}`);
      
      await context.emit({ 
        topic: 'check.requested', 
        data: { url: url } 
      });
      
      context.logger.info(`Successfully emitted for: ${url}`);
    }
 
    context.logger.info(`Successfully scheduled checks for all ${envConfig.sites.length} sites`);
  } catch (error) {
    context.logger.error('Error during cron execution:', error);
    throw error;
  }
}