// @vitest-environment node

import { describe, expect, it } from "vitest";

import { mapCurrencyRates } from "../../../core/mappers/currencyRateMapper";
describe("mapCurrencyRates", () => {
  it("converts API rates to numbers", () => {
    const apiRates = {
      EUR: "0.8",
      USD: "1",
      JPY: "150",
    };

    const result = mapCurrencyRates(apiRates);

    expect(result).toEqual({
      EUR: 0.8,
      USD: 1,
      JPY: 150,
    });
  });

  it("throws an error when a rate is missing", () => {
    const apiRates = {
      EUR: "0.8",
      USD: "1",
    };

    expect(() => mapCurrencyRates(apiRates)).toThrow(
      "Invalid currency rates response",
    );
  });

  it("throws an error when a rate is invalid", () => {
    const apiRates = {
      EUR: "invalid",
      USD: "1",
      JPY: "150",
    };

    expect(() => mapCurrencyRates(apiRates)).toThrow(
      "Invalid currency rates response",
    );
  });
});
