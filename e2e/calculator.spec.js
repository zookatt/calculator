import { test, expect } from "@playwright/test";

test("La aplicación carga correctamente", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/calculator/);
});
