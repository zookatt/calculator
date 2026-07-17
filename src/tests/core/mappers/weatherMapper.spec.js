// @vitest-environment node

import { describe, expect, it } from "vitest";

import {
  getWeatherImage,
  mapAsturiasWeather,
} from "../../../core/mappers/weatherMapper";
import { WEATHER_IMAGES } from "../../../core/models/weather";

const apiResponse = {
  ciudades: [
    {
      name: "Gijón",
      nameProvince: "Asturias",
      stateSky: {
        description: "Nuboso",
      },
      temperatures: {
        max: "23",
        min: "16",
      },
    },
    {
      name: "Oviedo",
      nameProvince: "Asturias",
      stateSky: {
        description: "Cubierto con lluvia",
      },
      temperatures: {
        max: "21",
        min: "14",
      },
    },
  ],
};

describe("mapAsturiasWeather", () => {
  it("maps the weather of Oviedo", () => {
    const result = mapAsturiasWeather(apiResponse);

    expect(result).toEqual({
      location: "Asturias",
      city: "Oviedo",
      minTemperature: 14,
      maxTemperature: 21,
      image: WEATHER_IMAGES.rain,
    });
  });

  it("throws when the cities list is missing", () => {
    expect(() => mapAsturiasWeather({})).toThrow(
      "Invalid weather response",
    );
  });

  it("throws when Oviedo is missing", () => {
    expect(() =>
      mapAsturiasWeather({
        ciudades: [
          {
            name: "Gijón",
          },
        ],
      }),
    ).toThrow("Asturias capital weather not found");
  });
});

describe("getWeatherImage", () => {
  it("returns a rain image", () => {
    expect(getWeatherImage("Nuboso con lluvia")).toBe(
      WEATHER_IMAGES.rain,
    );
  });

  it("returns a cloudy image", () => {
    expect(getWeatherImage("Intervalos nubosos")).toBe(
      WEATHER_IMAGES.cloudy,
    );
  });

  it("returns a clear image by default", () => {
    expect(getWeatherImage("Despejado")).toBe(
      WEATHER_IMAGES.clear,
    );
  });
});