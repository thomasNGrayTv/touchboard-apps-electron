// example.spec.ts
import { test, expect } from "@playwright/test";
import { env } from "../package.json";
const VITE_SERVER_ADDRESS = `http://127.0.0.1:${env.PORT || 3344}`;

test("example test case", async ({ page }) => {
  await page.goto(VITE_SERVER_ADDRESS);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Touchboard Apps/);
  await page.waitForSelector("h2.navTitle");
  // Expect #app wrapper to exist on page.
  await expect(page.locator(".navTitle")).toContainText("Nav Bar");
});

// test("second example",async ({page}) => {
//   await page.goto(VITE_SERVER_ADDRESS)
// })
