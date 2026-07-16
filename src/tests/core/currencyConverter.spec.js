// @vitest-environment node

import { describe, expect, it } from "vitest";

import { convertCurrency } from "../../core/currencyConverter";

const rates = {
  USD: 1,
  EUR: 0.8,
  JPY: 150,
};

describe("convertCurrency", () => {
  it("converts EUR to USD", () => {
    const result = convertCurrency(80, "EUR", "USD", rates);

    expect(result).toBe(100);
  });

  it("converts USD to JPY", () => {
    const result = convertCurrency(2, "USD", "JPY", rates);

    expect(result).toBe(300);
  });

  it("converts EUR to JPY", () => {
    const result = convertCurrency(80, "EUR", "JPY", rates);

    expect(result).toBe(15000);
  });

  it("returns the same amount for the same currency", () => {
    const result = convertCurrency(25, "EUR", "EUR", rates);

    expect(result).toBe(25);
  });

  it("accepts an amount received as a string", () => {
    const result = convertCurrency("2", "USD", "JPY", rates);

    expect(result).toBe(300);
  });

  it("accepts zero as an amount", () => {
    const result = convertCurrency(0, "EUR", "USD", rates);

    expect(result).toBe(0);
  });

  it("throws an error for an empty amount", () => {
    expect(() => {
      convertCurrency("", "EUR", "USD", rates);
    }).toThrow("Invalid amount");
  });

  it("throws an error for a negative amount", () => {
    expect(() => {
      convertCurrency(-10, "EUR", "USD", rates);
    }).toThrow("Invalid amount");
  });

  it("throws an error for a non-numeric amount", () => {
    expect(() => {
      convertCurrency("hello", "EUR", "USD", rates);
    }).toThrow("Invalid amount");
  });

  it("throws an error when the origin rate is missing", () => {
    expect(() => {
      convertCurrency(10, "GBP", "USD", rates);
    }).toThrow("Currency rate not available");
  });

  it("throws an error when the destination rate is missing", () => {
    expect(() => {
      convertCurrency(10, "EUR", "GBP", rates);
    }).toThrow("Currency rate not available");
  });
});