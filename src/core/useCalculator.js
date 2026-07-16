import { ref } from "vue";

export function useCalculator() {
  const display = ref("0");

  function inputDigit(digit) {
    const isDigit = /^\d$/.test(digit);

    if (!isDigit) {
      return;
    }

    if (display.value === "0") {
      display.value = digit;
      return;
    }

    display.value += digit;
  }

  function inputDecimal() {
    const alreadyHasDecimal = display.value.includes(".");

    if (alreadyHasDecimal) {
      return;
    }

    display.value += ".";
  }

  function clear() {
    display.value = "0";
  }

  return {
    display,
    inputDigit,
    inputDecimal,
    clear,
  };
}