const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const sites = [
  { slug: 'rx101', url: 'https://rx101.org/', folder: 'rx101' },
  { slug: 'iqra-quran', url: 'https://www.theiqraquran.com/', folder: 'iqra-quran' },
  { slug: 'smart-logo-maker', url: 'https://smart-logomaker.com/', folder: 'smart-logo-maker' },
  { slug: 'drm', url: 'https://drm-website.vercel.app/', folder: 'drm' }
];

const basePath = path.join(__dirname, '../public/images/singlePageProjects/web');

async function run() {
  // Use a tall viewport to capture a long, beautiful screenshot without fullPage bugs
  const browser = await puppeteer.launch({ headless: 'new', defaultViewport: { width: 1920, height: 3500 } });

  for (const site of sites) {
    console.log(`Processing ${site.slug}...`);
    const dir = path.join(basePath, site.folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const page = await browser.newPage();
    try {
      await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 60000 });

      // Scroll to trigger lazy loading
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 500;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight || 3500;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if (totalHeight >= scrollHeight || totalHeight > 5000) {
              clearInterval(timer);
              resolve();
            }
          }, 100);
        });
        window.scrollTo(0, 0);
      });

      // Wait for images to render
      await new Promise(r => setTimeout(r, 4000));

      // Capture the 1920x3500 viewport
      const filePath = path.join(dir, 'main.png');
      await page.screenshot({ path: filePath });
      fs.copyFileSync(filePath, path.join(dir, 'hero.png'));
      fs.copyFileSync(filePath, path.join(dir, 'sneak-1.png'));
      fs.copyFileSync(filePath, path.join(dir, 'sneak-2.png'));

      console.log(`- Saved screenshots for ${site.slug}`);
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
