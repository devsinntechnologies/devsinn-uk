const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const sites = [
  { slug: 'certainli', url: 'https://certainli.se/' },
  { slug: 'jiffy_new', url: 'https://jiffy.ae/' },
  { slug: 'rx101', url: 'https://rx101.org/' },
  { slug: 'alttext_ai', url: 'https://alttext.ai/' },
  { slug: 'hpappen', url: 'https://www.hpappen.se/' }
];

const basePath = path.join(__dirname, '../public/images/singlePageProjects/web');

async function run() {
  const browser = await puppeteer.launch({ headless: 'new', defaultViewport: { width: 1920, height: 1080 } });

  for (const site of sites) {
    console.log(`Processing ${site.slug}...`);
    const dir = path.join(basePath, site.slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const page = await browser.newPage();
    try {
      await page.goto(site.url, { waitUntil: 'networkidle0', timeout: 60000 });
      // Wait a bit extra for animations/images
      await new Promise(r => setTimeout(r, 5000));

      // Hero image
      await page.screenshot({ path: path.join(dir, 'hero.png') });
      await page.screenshot({ path: path.join(dir, 'main.png') });
      console.log(`- Saved hero.png and main.png for ${site.slug}`);

      // Scroll down for sneak peek 1
      await page.evaluate(() => window.scrollBy(0, 1080));
      await new Promise(r => setTimeout(r, 2000));
      await page.screenshot({ path: path.join(dir, 'sneak-1.png') });
      console.log(`- Saved sneak-1.png for ${site.slug}`);

      // Scroll down for sneak peek 2
      await page.evaluate(() => window.scrollBy(0, 1080));
      await new Promise(r => setTimeout(r, 2000));
      await page.screenshot({ path: path.join(dir, 'sneak-2.png') });
      console.log(`- Saved sneak-2.png for ${site.slug}`);

    } catch (e) {
      console.error(`Error processing ${site.slug}:`, e);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('Done screenshots.');
}

run();
