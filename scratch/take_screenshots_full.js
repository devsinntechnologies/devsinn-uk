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
      await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 60000 });
      // Scroll down and up to trigger lazy loading
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 500;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              resolve();
            }
          }, 100);
        });
        window.scrollTo(0, 0);
      });
      
      await new Promise(r => setTimeout(r, 2000));
      
      // FULL PAGE Screenshot
      const fullPagePath = path.join(dir, 'main.png');
      await page.screenshot({ path: fullPagePath, fullPage: true });
      fs.copyFileSync(fullPagePath, path.join(dir, 'hero.png'));
      fs.copyFileSync(fullPagePath, path.join(dir, 'sneak-1.png'));
      fs.copyFileSync(fullPagePath, path.join(dir, 'sneak-2.png'));
      
      console.log(`- Saved full page screenshots for ${site.slug}`);
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
