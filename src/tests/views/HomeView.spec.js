import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { describe, expect, it, vi } from "vitest";

import HomeView from "../../views/HomeView.vue";

vi.mock("../../core/apis/currency-freaks/currencyService", () => ({
  getCurrencyRates: vi.fn().mockResolvedValue({
    EUR: 0.8,
    USD: 1,
    JPY: 150,
  }),
}));

vi.mock("../../core/apis/el-tiempo/weatherService", () => ({
  getAsturiasWeather: vi.fn().mockResolvedValue({
    location: "Asturias",
    city: "Oviedo",
    minTemperature: 15,
    maxTemperature: 22,
    image: "weather-image.svg",
    imageAlt: "Rainy weather in Oviedo",
  }),
}));

describe("HomeView", () => {
  function createWrapper() {
    return mount(HomeView, {
      global: {
        plugins: [createPinia()],
      },
    });
  }

  it("renders the three main application sections", () => {
    const wrapper = createWrapper();

    expect(wrapper.find(".calculator").exists()).toBe(true);
    expect(wrapper.find(".currency").exists()).toBe(true);
    expect(wrapper.find(".weather").exists()).toBe(true);
  });

  it("places weather and currency before the calculator", () => {
    const wrapper = createWrapper();

    const panels = wrapper
      .findAll(".dashboard-panel")
      .map((panel) => panel.attributes("data-testid"));

    expect(panels).toEqual([
      "weather-panel",
      "currency-panel",
      "calculator-panel",
    ]);
  });

  it("renders the calculator required keys", () => {
    const wrapper = createWrapper();
    const keys = wrapper.findAll(".calc-button").map((button) => button.text());

    expect(keys).toEqual(
      expect.arrayContaining([
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "+",
        "-",
        "×",
        "÷",
        ".",
        "=",
        "CE",
        "M+",
        "MR",
        "MC",
      ]),
    );
  });
});
