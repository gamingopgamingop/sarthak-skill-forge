'use strict'
 
const { lightpanda } = require('@lightpanda/browser');
const { chromium } = require('playwright-core');
 
const lpdopts = {
  host: '127.0.0.1',
  port: 9222,
};
 
const playwrightopts = {
  endpointURL: 'ws://' + lpdopts.host + ':' + lpdopts.port,
};
 
(async () => {
  // Start Lightpanda browser in a separate process.
  const proc = await lightpanda.serve(lpdopts);
 
  // Connect using Playwright's chromium driver to the browser.
  const browser = await chromium.connectOverCDP(playwrightopts);
  const context = await browser.newContext({});
  const page = await context.newPage();
 
  // Go to Wikipedia page.
  await page.goto("https://en.wikipedia.org/wiki/Web_browser");
 
  // Extract all links from the references list of the page.
  const reflist = await page.locator('.reflist a.external').evaluateAll(links =>
    links.map(link => link.getAttribute('href'))
  );
 
  // Display the result.
  console.log("all reference links", reflist);
 
  // Disconnect Playwright.
  await page.close();
  await context.close();
  await browser.close();
 
  // Stop Lightpanda browser process.
  proc.stdout.destroy();
  proc.stderr.destroy();
  proc.kill();
})();