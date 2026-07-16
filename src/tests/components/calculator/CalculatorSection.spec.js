import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import CalculatorSection from "../../../components/calculator/CalculatorSection.vue";

describe("CalculatorSection", () => {
  function createWrapper() {
    return mount(CalculatorSection);
  }

  function getDisplay(wrapper) {
    return wrapper.get('[data-testid="calculator-display"]');
  }

  it("shows zero when the calculator starts", () => {
    const wrapper = createWrapper();

    expect(getDisplay(wrapper).text()).toBe("0");
  });

  it("enters numbers using the keypad", async () => {
    const wrapper = createWrapper();

    await wrapper.get('[data-testid="key-1"]').trigger("click");
    await wrapper.get('[data-testid="key-2"]').trigger("click");

    expect(getDisplay(wrapper).text()).toBe("12");
  });

  it("adds two numbers using the keypad", async () => {
    const wrapper = createWrapper();

    await wrapper.get('[data-testid="key-2"]').trigger("click");
    await wrapper.get('[data-testid="key-+"]').trigger("click");
    await wrapper.get('[data-testid="key-3"]').trigger("click");
    await wrapper.get('[data-testid="key-="]').trigger("click");

    expect(getDisplay(wrapper).text()).toBe("5");
  });

  it("multiplies two numbers using the keypad", async () => {
    const wrapper = createWrapper();

    await wrapper.get('[data-testid="key-6"]').trigger("click");
    await wrapper.get('[data-testid="key-×"]').trigger("click");
    await wrapper.get('[data-testid="key-7"]').trigger("click");
    await wrapper.get('[data-testid="key-="]').trigger("click");

    expect(getDisplay(wrapper).text()).toBe("42");
  });

  it("clears the display", async () => {
    const wrapper = createWrapper();

    await wrapper.get('[data-testid="key-8"]').trigger("click");
    await wrapper.get('[data-testid="key-CE"]').trigger("click");

    expect(getDisplay(wrapper).text()).toBe("0");
  });

  it("shows an error when dividing by zero", async () => {
    const wrapper = createWrapper();

    await wrapper.get('[data-testid="key-8"]').trigger("click");
    await wrapper.get('[data-testid="key-÷"]').trigger("click");
    await wrapper.get('[data-testid="key-0"]').trigger("click");
    await wrapper.get('[data-testid="key-="]').trigger("click");

    expect(getDisplay(wrapper).text()).toBe("Error");

    expect(wrapper.get('[role="alert"]').text()).toBe(
      "Cannot divide by zero",
    );
  });
});