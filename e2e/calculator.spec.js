import { expect, test } from "@playwright/test";

async function blockExternalApis(page) {
  await page.route("https://api.currencyfreaks.com/**", (route) =>
    route.abort(),
  );

  await page.route("https://api.el-tiempo.net/**", (route) => route.abort());
}

test.beforeEach(async ({ page }) => {
  await blockExternalApis(page);
  await page.goto("/");
});

test("performs a basic calculation", async ({ page }) => {
  await page.getByTestId("key-1").click();
  await page.getByTestId("key-2").click();
  await page.getByTestId("key-+").click();
  await page.getByTestId("key-3").click();
  await page.getByTestId("key-=").click();

  await expect(page.getByTestId("calculator-display")).toHaveText("15");
});

test("shows an error when dividing by zero", async ({ page }) => {
  await page.getByTestId("key-8").click();
  await page.getByTestId("key-÷").click();
  await page.getByTestId("key-0").click();
  await page.getByTestId("key-=").click();

  await expect(page.getByTestId("calculator-display")).toHaveText("Error");

  const calculator = page.locator(".calculator");

  await expect(calculator.getByRole("alert")).toHaveText(
    "Cannot divide by zero",
  );
});

test("clears the calculator", async ({ page }) => {
  await page.getByTestId("key-8").click();
  await page.getByTestId("key-CE").click();

  await expect(page.getByTestId("calculator-display")).toHaveText("0");
});

test("saves and recalls a number from memory", async ({ page }) => {
  await page.getByTestId("key-4").click();
  await page.getByTestId("key-2").click();
  await page.getByTestId("key-M+").click();
  await page.getByTestId("key-CE").click();
  await page.getByTestId("key-MR").click();

  await expect(page.getByTestId("calculator-display")).toHaveText("42");
});
