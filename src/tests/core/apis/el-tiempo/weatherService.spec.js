// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from "vitest";
import axios from "axios";

import { getAsturiasWeather } from "../../../../core/apis/el-tiempo/weatherService";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

const apiResponse = {
  ciudades: [
    {
      name: "Oviedo",
      nameProvince: "Asturias",
      stateSky: {
        description: "Nuboso con lluvia",
      },
      temperatures: {
        max: "22",
        min: "15",
      },
    },
  ],
};

describe("getAsturiasWeather", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("requests the Asturias province", async () => {
    axios.get.mockResolvedValue({
      data: apiResponse,
    });

    await getAsturiasWeather();

    expect(axios.get).toHaveBeenCalledWith(
      "https://api.el-tiempo.net/json/v3/provincias/33",
    );
  });

  it("returns mapped weather data", async () => {
    axios.get.mockResolvedValue({
      data: apiResponse,
    });

    const weather = await getAsturiasWeather();

    expect(weather).toMatchObject({
      location: "Asturias",
      city: "Oviedo",
      minTemperature: 15,
      maxTemperature: 22,
    });
  });

  it("propagates network errors", async () => {
    axios.get.mockRejectedValue(new Error("Network error"));

    await expect(getAsturiasWeather()).rejects.toThrow("Network error");
  });
});
