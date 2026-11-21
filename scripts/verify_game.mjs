import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const URL = process.env.GAME_URL || 'http://127.0.0.1:5173/';
const OUT_DIR = path.resolve('verify_shots');
fs.mkdirSync(OUT_DIR, { recursive: true });

async function run() {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/chromium',
    headless: true,
    args: [
      '--use-gl=angle',
      '--use-angle=swiftshader',
      '--enable-unsafe-swiftshader',
      '--enable-webgl',
      '--ignore-gpu-blocklist',
      '--no-sandbox',
    ],
  });

  const errors = [];
  const failedRequests = [];

  try {
    // 1. Desktop test (1280x720)
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    page.on('pageerror', (err) => errors.push(`PAGEERROR: ${err.message}`));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(`CONSOLE_ERROR: ${msg.text()}`);
    });
    page.on('requestfailed', (req) => {
      failedRequests.push(`REQ_FAIL: ${req.url()} (${req.failure()?.errorText || 'unknown'})`);
    });
    page.on('response', (res) => {
      if (res.status() >= 400) failedRequests.push(`HTTP_${res.status()}: ${res.url()}`);
    });

    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1400);

    await page.screenshot({ path: path.join(OUT_DIR, '01_title_desktop.png') });

    // Start Wedding Stage
    await page.click('#btn-start');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(OUT_DIR, '02_wedding_play_initial.png') });

    // Orbit camera left & upward to test high-angle & showoff luring
    await page.mouse.move(640, 360);
    await page.mouse.down();
    await page.mouse.move(430, 260, { steps: 12 });
    await page.mouse.up();
    await page.waitForTimeout(1400);
    await page.screenshot({ path: path.join(OUT_DIR, '03_wedding_after_orbit.png') });

    // Take Shot #1
    await page.click('#btn-shutter');
    await page.waitForTimeout(650);
    await page.screenshot({ path: path.join(OUT_DIR, '04_wedding_shutter_toast.png') });

    // Trigger "Say Cheese!"
    await page.click('#btn-cheese');
    await page.waitForTimeout(550);
    await page.screenshot({ path: path.join(OUT_DIR, '05_wedding_say_cheese.png') });

    // Swing slightly right & take Shot #2 during cheese window
    await page.mouse.move(640, 360);
    await page.mouse.down();
    await page.mouse.move(760, 330, { steps: 10 });
    await page.mouse.up();
    await page.waitForTimeout(350);
    await page.click('#btn-shutter');
    await page.waitForTimeout(700);

    // Wait for post-cheese jumpers/chaos & take Shot #3
    await page.waitForTimeout(1900);
    await page.click('#btn-shutter');
    await page.waitForTimeout(700);

    // Finish early -> Result Photo Album
    await page.click('#btn-finish-early');
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT_DIR, '06_wedding_result_album.png') });

    const desktopResultCheck = await page.evaluate(() => {
      const titleBtn = document.getElementById('btn-title');
      const rect = titleBtn ? titleBtn.getBoundingClientRect() : null;
      const polaroid = document.querySelector('.polaroid-img');
      const thumbs = document.querySelectorAll('.filmstrip-item').length;
      const emptySlots = document.querySelectorAll('.filmstrip-empty').length;
      const score = document.querySelector('.result-score-value')?.textContent?.trim() || '';
      const caption = document.querySelector('.result-caption')?.textContent?.trim() || '';
      return {
        btnTitleBottomY: rect ? Math.round(rect.bottom) : -1,
        fitsIn720p: rect ? rect.bottom <= 720 && rect.top >= 0 : false,
        polaroidLoaded: Boolean(polaroid && polaroid.complete && polaroid.naturalWidth > 500),
        thumbs,
        emptySlots,
        score,
        caption,
      };
    });

    // Return to title, select School Trip stage & play!
    await page.click('#btn-title');
    await page.waitForTimeout(500);
    await page.click('#stage-card-school_trip');
    await page.waitForTimeout(350);
    await page.click('#btn-start');
    await page.waitForTimeout(1100);
    await page.screenshot({ path: path.join(OUT_DIR, '07_school_trip_play.png') });

    await page.click('#btn-cheese');
    await page.waitForTimeout(600);
    await page.click('#btn-shutter');
    await page.waitForTimeout(700);
    await page.click('#btn-finish-early');
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT_DIR, '08_school_trip_result.png') });

    const stage2Score = await page.evaluate(() => {
      return {
        score: document.querySelector('.result-score-value')?.textContent?.trim() || '',
        caption: document.querySelector('.result-caption')?.textContent?.trim() || '',
      };
    });

    await context.close();

    // 2. Mobile Portrait test (390x844)
    const mobileCtx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      hasTouch: true,
      isMobile: true,
    });
    const mPage = await mobileCtx.newPage();
    mPage.on('pageerror', (err) => errors.push(`MOBILE_PAGEERROR: ${err.message}`));
    mPage.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(`MOBILE_CONSOLE_ERROR: ${msg.text()}`);
    });
    mPage.on('requestfailed', (req) => {
      failedRequests.push(`MOBILE_REQ_FAIL: ${req.url()}`);
    });
    mPage.on('response', (res) => {
      if (res.status() >= 400) failedRequests.push(`MOBILE_HTTP_${res.status()}: ${res.url()}`);
    });

    await mPage.goto(URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await mPage.waitForTimeout(1100);
    await mPage.screenshot({ path: path.join(OUT_DIR, '09_mobile_title.png') });

    await mPage.click('#btn-start');
    await mPage.waitForTimeout(1000);
    await mPage.screenshot({ path: path.join(OUT_DIR, '10_mobile_play.png') });

    const mobilePlayInfo = await mPage.evaluate(() => {
      return {
        faceBadge: document.querySelector('.face-count-text')?.textContent?.trim() || '',
      };
    });

    await mPage.click('#btn-cheese');
    await mPage.waitForTimeout(550);
    await mPage.click('#btn-shutter');
    await mPage.waitForTimeout(750);
    await mPage.click('#btn-finish-early');
    await mPage.waitForTimeout(800);
    await mPage.screenshot({ path: path.join(OUT_DIR, '11_mobile_result.png') });

    const mobileResultInfo = await mPage.evaluate(() => {
      return {
        score: document.querySelector('.result-score-value')?.textContent?.trim() || '',
        caption: document.querySelector('.result-caption')?.textContent?.trim() || '',
      };
    });

    await mobileCtx.close();

    console.log(
      JSON.stringify(
        {
          ok: errors.length === 0 && failedRequests.length === 0,
          desktopResultCheck,
          stage2Score,
          mobilePlayInfo,
          mobileResultInfo,
          errorCount: errors.length,
          errors,
          failedRequests,
        },
        null,
        2,
      ),
    );
    if (errors.length > 0 || failedRequests.length > 0) process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
