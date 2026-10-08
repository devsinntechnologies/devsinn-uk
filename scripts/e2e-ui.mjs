import { chromium } from "playwright-core";

const BASE = process.env.E2E_BASE || "http://localhost:3001";
const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const ROUTES = [
  "/",
  "/contact",
  "/about",
  "/ai-consultant",
  "/ai-projects",
  "/ai-specialist",
  "/services",
  "/blog",
  "/faq",
  "/privacy-policy",
];

async function inspect(page) {
  return page.evaluate(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const docW = document.documentElement.scrollWidth;
    const careerAnchors = [...document.querySelectorAll('a[href*="careers"]')].map(
      (a) => a.getAttribute("href")
    );
    const oldCalendly = [...document.querySelectorAll("iframe, a")].filter((el) =>
      (el.getAttribute("src") || el.getAttribute("href") || "").includes(
        "calendly.com/devsinntechnologies"
      )
    ).length;
    const helloLinks = [...document.querySelectorAll('a[href^="mailto:"]')].map(
      (a) => a.getAttribute("href")
    );
    const text = document.body.innerText || "";
    const header = document.querySelector("header");
    const h1 = document.querySelector("h1");
    let heroCovered = false;
    if (header && h1) {
      const hr = header.getBoundingClientRect();
      const r = h1.getBoundingClientRect();
      heroCovered = r.top < hr.bottom - 8 && r.bottom > hr.top && r.height > 20;
    }

    const overflowers = [...document.querySelectorAll("section, header, footer, main, nav")].filter(
      (el) => {
        const rect = el.getBoundingClientRect();
        return rect.right > vw + 8 || rect.left < -8;
      }
    ).slice(0, 8).map((el) => el.id || el.className?.toString?.().slice(0, 80));

    return {
      title: document.title,
      overflowX: docW > vw + 4,
      docW,
      vw,
      careerAnchors,
      oldCalendly,
      helloLinks,
      hasHello: text.includes("hello@devsinn.co.uk"),
      hasOldInbox: /hello@devsinntechnologies|info@devsinn|careers@/i.test(text),
      heroCovered,
      overflowers,
      showcase: !!document.getElementById("product-platform"),
      showcaseButtons: [...document.querySelectorAll("#product-platform button")].map(
        (b) => b.innerText.replace(/\s+/g, " ").trim()
      ),
    };
  });
}

async function runViewport(browser, width, height, label) {
  const page = await browser.newPage({ viewport: { width, height } });
  const consoleErrors = [];
  const pageErrors = [];
  const failed = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => pageErrors.push(err.message));
  page.on("requestfailed", (req) => {
    const url = req.url();
    if (/analytics|gtag|facebook|hotjar|sentry/i.test(url)) return;
    failed.push(`${req.failure()?.errorText || "fail"} ${url}`);
  });

  const results = [];
  for (const path of ROUTES) {
    try {
      const res = await page.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForTimeout(700);
      const info = await inspect(page);
      results.push({
        label,
        path,
        status: res?.status() ?? 0,
        finalUrl: page.url().replace(BASE, ""),
        ...info,
      });
    } catch (err) {
      results.push({
        label,
        path,
        status: 0,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  try {
    const careers = await page.goto(BASE + "/careers", {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });
    results.push({
      label,
      path: "/careers",
      status: careers?.status() ?? 0,
      finalUrl: page.url().replace(BASE, ""),
      redirected: !page.url().includes("/careers"),
    });
  } catch (err) {
    results.push({
      label,
      path: "/careers",
      error: err instanceof Error ? err.message : String(err),
    });
  }

  if (label === "desktop") {
    await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);
    let before = "";
    let after = "";
    try {
      before = await page.locator("#product-platform h2").first().innerText({ timeout: 8000 });
      const forecastBtn = page.getByRole("button", { name: /Forecasts/i });
      if (await forecastBtn.count()) {
        await forecastBtn.click();
        await page.waitForTimeout(400);
      }
      after = await page.locator("#product-platform h2").first().innerText({ timeout: 8000 });
    } catch {
      before = "";
      after = "";
    }
    const hire = await page.getByRole("link", { name: /Hire Us/i }).count();
    const careerNav = await page.getByRole("link", { name: /^Careers$/i }).count();
    results.push({
      label,
      path: "/#showcase-interaction",
      headingBefore: before,
      headingAfter: after,
      tabChanged: before !== after,
      hireUsCount: hire,
      careerNavCount: careerNav,
    });
  }

  await page.close();
  return {
    label,
    consoleErrors: [...new Set(consoleErrors)].slice(0, 20),
    pageErrors: [...new Set(pageErrors)].slice(0, 10),
    failed: failed.slice(0, 20),
    results,
  };
}

const browser = await chromium.launch({
  executablePath: CHROME,
  headless: true,
});

try {
  const desktop = await runViewport(browser, 1440, 900, "desktop");
  const mobile = await runViewport(browser, 390, 844, "mobile");
  console.log(JSON.stringify({ desktop, mobile }, null, 2));
} finally {
  await browser.close();
}
