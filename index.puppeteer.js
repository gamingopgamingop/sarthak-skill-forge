'use strict'
 
const { lightpanda } = require('@lightpanda/browser');
const puppeteer = require('puppeteer-core');
 
const lpdopts = {
  host: '127.0.0.1',
  port: 9222,
};
 
const puppeteeropts = {
  browserWSEndpoint: 'ws://' + lpdopts.host + ':' + lpdopts.port,
};
 
(async () => {
  // Start Lightpanda browser in a separate process.
  const proc = await lightpanda.serve(lpdopts);
 
  // Connect Puppeteer to the browser.
  const browser = await puppeteer.connect(puppeteeropts);
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
 
  // Go to Wikipedia page.
  await page.goto("https://en.wikipedia.org/wiki/Web_browser");
 
  // Extract all links from the references list of the page.
  const reflist = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.reflist a.external')).map(row => {
      return row.getAttribute('href');
    });
  });
 
  // Display the result.
  console.log("all reference links", reflist);
 
  // Disconnect Puppeteer.
  await page.close();
  await context.close();
  await browser.disconnect();
 
  // Stop Lightpanda browser process.
  proc.stdout.destroy();
  proc.stderr.destroy();
  proc.kill();
})();