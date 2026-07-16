import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import CalculatorKeypad from "../../../components/calculator/CalculatorKeypad.vue";

describe("CalculatorKeypad", () => {
  it("shows all calculator buttons", () => {
    const wrapper = mount(CalculatorKeypad);
    const buttons = wrapper.findAll(".calc-button");

    expect(buttons).toHaveLength(20);
  });

  it("shows all required number buttons", () => {
    const wrapper = mount(CalculatorKeypad);

    const buttonTexts = wrapper
      .findAll(".calc-button")
      .map((button) => button.text());

    expect(buttonTexts).toEqual(
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
      ]),
    );
  });

  it("shows all required operation buttons", () => {
    const wrapper = mount(CalculatorKeypad);

    const buttonTexts = wrapper
      .findAll(".calc-button")
      .map((button) => button.text());

    expect(buttonTexts).toEqual(
      expect.arrayContaining([
        "+",
        "-",
        "×",
        "÷",
        ".",
        "=",
        "CE",
      ]),
    );
  });

  it("emits the pressed number", async () => {
    const wrapper = mount(CalculatorKeypad);

    await wrapper.get('[data-testid="key-7"]').trigger("click");

    expect(wrapper.emitted("press")).toEqual([["7"]]);
  });

  it("emits the pressed operator", async () => {
    const wrapper = mount(CalculatorKeypad);

    await wrapper.get('[data-testid="key-+"]').trigger("click");

    expect(wrapper.emitted("press")).toEqual([["+"]]);
  });

  it("provides accessible labels for operators", () => {
    const wrapper = mount(CalculatorKeypad);

    expect(wrapper.get('[aria-label="add"]').exists()).toBe(true);
    expect(wrapper.get('[aria-label="subtract"]').exists()).toBe(
      true,
    );
    expect(wrapper.get('[aria-label="multiply"]').exists()).toBe(
      true,
    );
    expect(wrapper.get('[aria-label="divide"]').exists()).toBe(
      true,
    );
  });

  it("sets the button type to button", () => {
    const wrapper = mount(CalculatorKeypad);
    const buttons = wrapper.findAll(".calc-button");

    const everyButtonHasCorrectType = buttons.every(
      (button) => button.attributes("type") === "button",
    );

    expect(everyButtonHasCorrectType).toBe(true);
  });
});