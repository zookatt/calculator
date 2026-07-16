// @vitest-environment node

import { describe, expect, it } from "vitest";

import { calculate } from "../../../core/calculate/calculator";

describe("calculate", () => {
  it("adds two numbers", () => {
    expect(calculate(2, 3, "+")).toBe(5);
  });

  it("subtracts two numbers", () => {
    expect(calculate(10, 4, "-")).toBe(6);
  });

  it("multiplies two numbers", () => {
    expect(calculate(6, 7, "×")).toBe(42);
  });

  it("divides two numbers", () => {
    expect(calculate(8, 2, "÷")).toBe(4);
  });

  it("throws an error when dividing by zero", () => {
    expect(() => calculate(8, 0, "÷")).toThrow("Cannot divide by zero");
  });

  it("throws an error for an invalid operator", () => {
    expect(() => calculate(2, 2, "%")).toThrow("Invalid operator");
  });

  it("throws an error for invalid values", () => {
    expect(() => calculate(Number.NaN, 2, "+")).toThrow("Invalid operation");
  });
});
