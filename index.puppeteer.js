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
 
  // Go to hackernews home page.
  await page.goto("https://news.ycombinator.com/");
 
  // Find the search box at the bottom of the page and type the term lightpanda
  // to search.
  await page.type('input[name="q"]','lightpanda');
  // Press enter key to run the search.
  await page.keyboard.press('Enter');
 
  // Wait until the search results are loaded on the page, with a 5 seconds
  // timeout limit.
  await page.waitForFunction(() => {
      return document.querySelector('.Story_container') != null;
  }, {timeout: 5000});
 
  // Loop over search results to extract data.
  const res = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.Story_container')).map(row => {
      return {
        // Extract the title.
        title: row.querySelector('.Story_title span').textContent,
        // Extract the URL.
        url: row.querySelector('.Story_title a').getAttribute('href'),
        // Extract the list of meta data.
        meta: Array.from(row.querySelectorAll('.Story_meta > span:not(.Story_separator, .Story_comment)')).map(row => {
          return row.textContent;
        }),
      }
    });
  });
 
  // Display the result.
  console.log(res);
 
  // Disconnect Puppeteer.
  await page.close();
  await context.close();
  await browser.disconnect();
 
  // Stop Lightpanda browser process.
  proc.stdout.destroy();
  proc.stderr.destroy();
  proc.kill();
})();