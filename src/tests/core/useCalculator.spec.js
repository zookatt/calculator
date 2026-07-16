// @vitest-environment node

import { describe, expect, it } from "vitest";

import { useCalculator } from "../../core/useCalculator";

describe("useCalculator input", () => {
  it("starts with zero", () => {
    const calculator = useCalculator();

    expect(calculator.display.value).toBe("0");
  });

  it("enters one digit", () => {
    const calculator = useCalculator();

    calculator.inputDigit("7");

    expect(calculator.display.value).toBe("7");
  });

  it("enters multiple digits", () => {
    const calculator = useCalculator();

    calculator.inputDigit("1");
    calculator.inputDigit("2");
    calculator.inputDigit("3");

    expect(calculator.display.value).toBe("123");
  });

  it("ignores invalid characters", () => {
    const calculator = useCalculator();

    calculator.inputDigit("a");

    expect(calculator.display.value).toBe("0");
  });

  it("adds a decimal point", () => {
    const calculator = useCalculator();

    calculator.inputDigit("2");
    calculator.inputDecimal();
    calculator.inputDigit("5");

    expect(calculator.display.value).toBe("2.5");
  });

  it("ignores a second decimal point", () => {
    const calculator = useCalculator();

    calculator.inputDigit("2");
    calculator.inputDecimal();
    calculator.inputDecimal();
    calculator.inputDigit("5");

    expect(calculator.display.value).toBe("2.5");
  });

  it("starts a decimal value with zero", () => {
    const calculator = useCalculator();

    calculator.inputDecimal();
    calculator.inputDigit("5");

    expect(calculator.display.value).toBe("0.5");
  });

  it("clears the display", () => {
    const calculator = useCalculator();

    calculator.inputDigit("8");
    calculator.clear();

    expect(calculator.display.value).toBe("0");
  });
});

describe("useCalculator operations", () => {
  it("adds two numbers", () => {
    const calculator = useCalculator();

    calculator.inputDigit("2");
    calculator.selectOperator("+");
    calculator.inputDigit("3");
    calculator.equals();

    expect(calculator.display.value).toBe("5");
  });

  it("subtracts two numbers", () => {
    const calculator = useCalculator();

    calculator.inputDigit("9");
    calculator.selectOperator("-");
    calculator.inputDigit("4");
    calculator.equals();

    expect(calculator.display.value).toBe("5");
  });

  it("multiplies two numbers", () => {
    const calculator = useCalculator();

    calculator.inputDigit("6");
    calculator.selectOperator("×");
    calculator.inputDigit("7");
    calculator.equals();

    expect(calculator.display.value).toBe("42");
  });

  it("divides two numbers", () => {
    const calculator = useCalculator();

    calculator.inputDigit("8");
    calculator.selectOperator("÷");
    calculator.inputDigit("2");
    calculator.equals();

    expect(calculator.display.value).toBe("4");
  });

  it("shows the pending operation", () => {
    const calculator = useCalculator();

    calculator.inputDigit("1");
    calculator.inputDigit("2");
    calculator.selectOperator("+");

    expect(calculator.operation.value).toBe("12 +");
  });

  it("supports decimal operations", () => {
    const calculator = useCalculator();

    calculator.inputDigit("2");
    calculator.inputDecimal();
    calculator.inputDigit("5");
    calculator.selectOperator("×");
    calculator.inputDigit("2");
    calculator.equals();

    expect(calculator.display.value).toBe("5");
  });

  it("avoids floating point display errors", () => {
    const calculator = useCalculator();

    calculator.inputDigit("0");
    calculator.inputDecimal();
    calculator.inputDigit("1");
    calculator.selectOperator("+");
    calculator.inputDigit("0");
    calculator.inputDecimal();
    calculator.inputDigit("2");
    calculator.equals();

    expect(calculator.display.value).toBe("0.3");
  });

  it("shows an error when dividing by zero", () => {
    const calculator = useCalculator();

    calculator.inputDigit("8");
    calculator.selectOperator("÷");
    calculator.inputDigit("0");
    calculator.equals();

    expect(calculator.display.value).toBe("Error");
    expect(calculator.error.value).toBe("Cannot divide by zero");
  });

  it("starts a new calculation after an error", () => {
    const calculator = useCalculator();

    calculator.inputDigit("8");
    calculator.selectOperator("÷");
    calculator.inputDigit("0");
    calculator.equals();
    calculator.inputDigit("5");

    expect(calculator.display.value).toBe("5");
    expect(calculator.error.value).toBe("");
  });

  it("resolves chained operations from left to right", () => {
    const calculator = useCalculator();

    calculator.inputDigit("2");
    calculator.selectOperator("+");
    calculator.inputDigit("3");
    calculator.selectOperator("×");
    calculator.inputDigit("4");
    calculator.equals();

    expect(calculator.display.value).toBe("20");
  });

  it("ignores equals when the operation is incomplete", () => {
    const calculator = useCalculator();

    calculator.inputDigit("8");
    calculator.selectOperator("+");
    calculator.equals();

    expect(calculator.display.value).toBe("8");
  });

  it("clears the complete operation state", () => {
    const calculator = useCalculator();

    calculator.inputDigit("8");
    calculator.selectOperator("+");
    calculator.clear();

    expect(calculator.display.value).toBe("0");
    expect(calculator.operation.value).toBe("");
    expect(calculator.error.value).toBe("");
  });
});
describe("useCalculator display value", () => {
  it("sets a valid number in the display", () => {
    const calculator = useCalculator();

    calculator.setDisplay(42);

    expect(calculator.display.value).toBe("42");
  });

  it("does not set an invalid number", () => {
    const calculator = useCalculator();

    calculator.setDisplay(Number.NaN);

    expect(calculator.display.value).toBe("0");
  });

  it("allows using the restored number", () => {
    const calculator = useCalculator();

    calculator.setDisplay(10);
    calculator.selectOperator("+");
    calculator.inputDigit("5");
    calculator.equals();

    expect(calculator.display.value).toBe("15");
  });
});
