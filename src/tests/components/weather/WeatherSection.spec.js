import { flushPromises, mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";

import WeatherSection from "../../../components/weather/WeatherSection.vue";
import { getAsturiasWeather } from "../../../core/apis/el-tiempo/weatherService";

vi.mock("../../../core/apis/el-tiempo/weatherService", () => ({
  getAsturiasWeather: vi.fn(),
}));

const weather = {
  location: "Asturias",
  city: "Oviedo",
  minTemperature: 15,
  maxTemperature: 22,
  image: "weather-image.svg",
  imageAlt: "Rainy weather in Oviedo",
};

describe("WeatherSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getAsturiasWeather.mockResolvedValue(weather);
  });

  it("loads the Asturias weather", async () => {
    mount(WeatherSection);

    await flushPromises();

    expect(getAsturiasWeather).toHaveBeenCalledOnce();
  });

  it("shows the weather data", async () => {
    const wrapper = mount(WeatherSection);

    await flushPromises();

    expect(wrapper.text()).toContain("Oviedo, Asturias");
    expect(wrapper.text()).toContain("Min. 15°C");
    expect(wrapper.text()).toContain("Max. 22°C");
  });

  it("shows an image for the sky state", async () => {
    const wrapper = mount(WeatherSection);

    await flushPromises();

    const image = wrapper.get("img");

    expect(image.attributes("src")).toBe("weather-image.svg");
    expect(image.attributes("alt")).toBe("Rainy weather in Oviedo");
  });

  it("shows an error when the API fails", async () => {
    getAsturiasWeather.mockRejectedValue(new Error("Network error"));

    const wrapper = mount(WeatherSection);

    await flushPromises();

    expect(wrapper.get('[role="alert"]').text()).toBe(
      "Unable to load Asturias weather",
    );
  });
});
