// Validates Discord webhook URLs
function isValidDiscordWebhook(url) {
  if (!url || typeof url !== 'string') return false;
  
  try {
    const parsed = new URL(url);
    return parsed.hostname === 'discord.com' || parsed.hostname === 'discordapp.com';
  } catch {
    return false;
  }
}
 
// Parses and validates the SITES environment variable
function parseSites(sitesJson) {
  if (!sitesJson) {
    throw new Error('SITES environment variable is required');
  }
 
  let sites;
  try {
    sites = JSON.parse(sitesJson);
  } catch (error) {
    throw new Error(`Invalid SITES JSON format: ${error.message}`);
  }
 
  if (!Array.isArray(sites) || sites.length === 0) {
    throw new Error('SITES must be a non-empty JSON array of URLs');
  }
 
  // Validate each URL
  sites.forEach(site => {
    if (typeof site !== 'string') {
      throw new Error(`Invalid site URL: ${site} (must be string)`);
    }
    try {
      new URL(site);
    } catch {
      throw new Error(`Invalid site URL format: ${site}`);
    }
  });
 
  return sites;
}
 
export const config = {
  discordWebhook: process.env.DISCORD_WEBHOOK,
  sites: parseSites(process.env.SITES),
  cron: process.env.CHECK_INTERVAL_CRON || '*/1 * * * *',
  alertBurst: parseInt(process.env.ALERT_BURST) || 3,
  alertWindowSec: parseInt(process.env.ALERT_WINDOW_SEC) || 300
};