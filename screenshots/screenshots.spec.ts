import { join } from 'node:path';
import { expect, test } from '@playwright/test';
import { chromeStub } from './chrome-stub';

/**
 * The options page with the default settings, light and dark, as the README and the store
 * listings show it. The built page runs as a plain page with a stand-in for the extension API
 * (chrome-stub.ts).
 */

// npm run screenshots runs in the project directory
const SCREENSHOTS = join(process.cwd(), 'store-assets', 'screenshots');

for (const colorScheme of ['light', 'dark'] as const) {
  test(`options, ${colorScheme}`, async ({ browser }) => {
    // Wide enough for the two-column layout; the picture is the settings card itself
    const page = await browser.newPage({ colorScheme, viewport: { width: 900, height: 1200 }, deviceScaleFactor: 2 });
    await page.addInitScript(chromeStub());
    await page.goto('/options.html');
    await expect(page.getByText('10 of 10 selected')).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await page
      .locator('main > *')
      .first()
      .screenshot({ path: join(SCREENSHOTS, `options-${colorScheme}.png`), animations: 'disabled', caret: 'hide' });
    await page.close();
  });
}
