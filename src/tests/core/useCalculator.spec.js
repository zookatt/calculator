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