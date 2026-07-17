import { expect, test } from "@playwright/test";

async function mockExternalApis(page) {
  await page.route("https://api.currencyfreaks.com/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        rates: {
          EUR: "0.8",
          USD: "1",
          JPY: "150",
        },
      }),
    });
  });

  await page.route("https://api.el-tiempo.net/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ciudades: [
          {
            name: "Oviedo",
            nameProvince: "Asturias",
            stateSky: {
              description: "Cubierto con lluvia",
            },
            temperatures: {
              min: "14",
              max: "21",
            },
          },
        ],
      }),
    });
  });
}

test.beforeEach(async ({ page }) => {
  await mockExternalApis(page);
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

test("converts euros to dollars", async ({ page }) => {
  await page.getByTestId("currency-toggle").click();

  await expect(page.getByTestId("converted-amount")).toHaveText(
    "125.00 USD",
  );

  await page.getByTestId("currency-amount").fill("80");

  await expect(page.getByTestId("converted-amount")).toHaveText(
    "100.00 USD",
  );
});

test("shows the weather in Asturias", async ({ page }) => {
  await expect(page.getByText("Oviedo, Asturias")).toBeVisible();
  await expect(page.getByText("Min. 14°C")).toBeVisible();
  await expect(page.getByText("Max. 21°C")).toBeVisible();

  const weatherImage = page.getByRole("img", {
    name: "Weather in Oviedo",
  });

  await expect(weatherImage).toBeVisible();
  await expect(weatherImage).toHaveAttribute("src", /overcast-rain\.svg/);
});
