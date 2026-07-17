import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import CalculatorDisplay from "../../../components/calculator/CalculatorDisplay.vue";

describe("CalculatorDisplay", () => {
  it("shows the display value", () => {
    const wrapper = mount(CalculatorDisplay, {
      props: {
        display: "36",
      },
    });

    const display = wrapper.get(
      '[data-testid="calculator-display"]',
    );

    expect(display.text()).toBe("36");
    expect(display.element.tagName).toBe("OUTPUT");
  });

  it("shows the current operation", () => {
    const wrapper = mount(CalculatorDisplay, {
      props: {
        display: "36",
        operation: "12 × 3",
      },
    });

    expect(wrapper.text()).toContain("12 × 3");
  });

  it("does not show an error when the error prop is empty", () => {
    const wrapper = mount(CalculatorDisplay, {
      props: {
        display: "0",
      },
    });

    expect(wrapper.find('[role="alert"]').exists()).toBe(false);
  });

  it("shows an accessible error message", () => {
    const wrapper = mount(CalculatorDisplay, {
      props: {
        display: "Error",
        error: "Cannot divide by zero",
      },
    });

    const errorMessage = wrapper.get('[role="alert"]');

    expect(errorMessage.text()).toBe("Cannot divide by zero");
  });
});
