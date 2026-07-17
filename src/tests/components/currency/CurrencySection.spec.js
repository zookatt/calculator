import { flushPromises, mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";

import CurrencySection from "../../../components/currency/CurrencySection.vue";
import { getCurrencyRates } from "../../../core/apis/currency-freaks/currencyService";

vi.mock(
  "../../../core/apis/currency-freaks/currencyService",
  () => ({
    getCurrencyRates: vi.fn(),
  }),
);

const rates = {
  EUR: 0.8,
  USD: 1,
  JPY: 150,
};

describe("CurrencySection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getCurrencyRates.mockResolvedValue(rates);
  });

  it("loads the currency rates", async () => {
    mount(CurrencySection);

    await flushPromises();

    expect(getCurrencyRates).toHaveBeenCalledOnce();
  });

  it("expands and collapses the converter", async () => {
    const wrapper = mount(CurrencySection);
    const toggle = wrapper.get('[data-testid="currency-toggle"]');

    expect(toggle.attributes("aria-expanded")).toBe("false");

    await toggle.trigger("click");

    expect(toggle.attributes("aria-expanded")).toBe("true");
    expect(wrapper.get("#currency-content").isVisible()).toBe(true);
  });

  it("shows the converted amount", async () => {
    const wrapper = mount(CurrencySection);

    await flushPromises();

    expect(
      wrapper.get('[data-testid="converted-amount"]').text(),
    ).toBe("125.00 USD");
  });

  it("updates the result when the amount changes", async () => {
    const wrapper = mount(CurrencySection);

    await flushPromises();

    await wrapper
      .get('[data-testid="currency-amount"]')
      .setValue("80");

    expect(
      wrapper.get('[data-testid="converted-amount"]').text(),
    ).toBe("100.00 USD");
  });

  it("swaps the selected currencies", async () => {
    const wrapper = mount(CurrencySection);

    await flushPromises();

    await wrapper
      .get('[data-testid="swap-currencies"]')
      .trigger("click");

    expect(
      wrapper.get('[data-testid="from-currency"]').element.value,
    ).toBe("USD");

    expect(
      wrapper.get('[data-testid="to-currency"]').element.value,
    ).toBe("EUR");
  });

  it("shows an error for an invalid amount", async () => {
    const wrapper = mount(CurrencySection);

    await flushPromises();

    await wrapper
      .get('[data-testid="currency-amount"]')
      .setValue("-10");

    expect(wrapper.get('[role="alert"]').text()).toBe(
      "Enter a valid amount",
    );
  });

  it("shows an error when rates cannot be loaded", async () => {
    getCurrencyRates.mockRejectedValue(
      new Error("Network error"),
    );

    const wrapper = mount(CurrencySection);

    await flushPromises();

    expect(wrapper.get('[role="alert"]').text()).toBe(
      "Unable to load currency rates",
    );
  });
});
