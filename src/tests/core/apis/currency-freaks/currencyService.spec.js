// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from "vitest";
import axios from "axios";

import { getCurrencyRates } from "../../../../core/apis/currency-freaks/currencyService";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("getCurrencyRates", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("requests EUR, USD and JPY rates", async () => {
    axios.get.mockResolvedValue({
      data: {
        rates: {
          EUR: "0.8",
          USD: "1",
          JPY: "150",
        },
      },
    });

    await getCurrencyRates("test-api-key");

    expect(axios.get).toHaveBeenCalledWith(
      "https://api.currencyfreaks.com/v2.0/rates/latest",
      {
        params: {
          apikey: "test-api-key",
          symbols: "EUR,USD,JPY",
        },
      },
    );
  });

  it("returns the rates as numbers", async () => {
    axios.get.mockResolvedValue({
      data: {
        rates: {
          EUR: "0.8",
          USD: "1",
          JPY: "150",
        },
      },
    });

    const rates = await getCurrencyRates("test-api-key");

    expect(rates).toEqual({
      EUR: 0.8,
      USD: 1,
      JPY: 150,
    });
  });

  it("throws an error when the API key is missing", async () => {
    await expect(getCurrencyRates("")).rejects.toThrow(
      "CurrencyFreaks API key is missing",
    );

    expect(axios.get).not.toHaveBeenCalled();
  });

  it("throws an error when the response is invalid", async () => {
    axios.get.mockResolvedValue({
      data: {
        rates: {
          EUR: "0.8",
          USD: "1",
        },
      },
    });

    await expect(getCurrencyRates("test-api-key")).rejects.toThrow(
      "Invalid currency rates response",
    );
  });

  it("propagates network errors", async () => {
    axios.get.mockRejectedValue(new Error("Network error"));

    await expect(getCurrencyRates("test-api-key")).rejects.toThrow(
      "Network error",
    );
  });
});
