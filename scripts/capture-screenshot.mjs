import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const artifactsDir = path.resolve(root, "artifacts");
const outputPath = path.resolve(artifactsDir, "head-unit-ui.png");
const indexPath = path.resolve(root, "index.html");

async function main() {
  await fs.mkdir(artifactsDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto(`file://${indexPath}`);
  await page.waitForTimeout(500);

  await page.screenshot({
    path: outputPath,
    fullPage: true,
  });

  await browser.close();
  console.log(`Screenshot saved to ${outputPath}`);
}

main().catch((error) => {
  console.error("Failed to capture screenshot:", error.message);
  process.exit(1);
});
