const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const sites = [
  { 
    slug: 'rx101', 
    url: 'https://rx101.org/',
    dir: 'public/images/singlePageProjects/web/rx101'
  },
  { 
    slug: 'drafidox', 
    url: 'https://drafidox.com/',
    dir: 'public/images/singlePageProjects/web/drafidox'
  }
];

async function run() {
  const browser = await puppeteer.launch({ 
    headless: 'new', 
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1920, height: 1080 } 
  });
  
  for (const site of sites) {
    console.log(`Processing ${site.slug} at ${site.url}...`);
    const dir = path.join(process.cwd(), site.dir);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const page = await browser.newPage();
    // Prevent blue outlines/shadows
    await page.evaluateOnNewDocument(() => {
      const style = document.createElement('style');
      style.innerHTML = `
        * {
          outline: none !important;
          box-shadow: none !important;
          -webkit-tap-highlight-color: transparent !important;
        }
        :focus {
          outline: none !important;
          box-shadow: none !important;
        }
        .blue-glow, [class*="glow"], [class*="blue"] {
           box-shadow: none !important;
        }
      `;
      document.head.appendChild(style);
    });

    try {
      await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 120000 });
      
      // Additional CSS injection after load just in case
      await page.addStyleTag({
        content: `
          * { outline: none !important; box-shadow: none !important; }
          :focus { outline: none !important; box-shadow: none !important; }
        `
      });

      // Scroll to trigger lazy loading
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 400;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if (totalHeight >= scrollHeight || totalHeight > 20000) {
              clearInterval(timer);
              resolve();
            }
          }, 200);
        });
        window.scrollTo(0, 0);
      });
      
      // Wait for animations/images to settle
      await new Promise(r => setTimeout(r, 5000));
      
      const mainPath = path.join(dir, 'main.png');
      const heroPath = path.join(dir, 'hero.png');
      const sneak1Path = path.join(dir, 'sneak-1.png');
      const sneak2Path = path.join(dir, 'sneak-2.png');

      await page.screenshot({ path: mainPath, fullPage: true });
      console.log(`- Saved main.png for ${site.slug}`);
      
      // Copy to others as requested in previous scripts
      fs.copyFileSync(mainPath, heroPath);
      fs.copyFileSync(mainPath, sneak1Path);
      fs.copyFileSync(mainPath, sneak2Path);
      
      console.log(`- Updated all assets for ${site.slug}`);

      // If it's drafidox, also update the appDev paths if they exist
      if (site.slug === 'drafidox') {
          const appDir = path.join(process.cwd(), 'public/images/singlePageProjects/app/drafidox');
          if (fs.existsSync(appDir)) {
              fs.copyFileSync(mainPath, path.join(appDir, 'drafidox.png'));
              fs.copyFileSync(mainPath, path.join(appDir, 'drafidox1.png'));
              fs.copyFileSync(mainPath, path.join(appDir, 'drafidox2.png'));
              fs.copyFileSync(mainPath, path.join(appDir, 'drafidox3.png'));
              console.log(`- Updated appDev assets for drafidox`);
          }
          // Also check root images if they are used
          const rootImg = path.join(process.cwd(), 'public/images/drafidox.png');
          fs.copyFileSync(mainPath, rootImg);
          console.log(`- Updated root image for drafidox`);
      }

    } catch (e) {
      console.error(`Error processing ${site.slug}:`, e.message);
    } finally {
      await page.close();
    }
  }
  
  await browser.close();
  console.log('All requested screenshots processed.');
}

run();
