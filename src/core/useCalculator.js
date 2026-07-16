import { computed, ref } from "vue";

import { calculate } from "./calculator";

export function useCalculator() {
  const display = ref("0");
  const previousNumber = ref(null);
  const selectedOperator = ref(null);
  const waitingForNumber = ref(false);
  const error = ref("");

  const operation = computed(() => {
    if (previousNumber.value === null || selectedOperator.value === null) {
      return "";
    }

    return `${previousNumber.value} ${selectedOperator.value}`;
  });

  function inputDigit(digit) {
    const isDigit = /^\d$/.test(digit);

    if (!isDigit) {
      return;
    }

    if (error.value) {
      clear();
    }

    if (display.value === "0" || waitingForNumber.value) {
      display.value = digit;
      waitingForNumber.value = false;
      return;
    }

    display.value += digit;
  }

  function inputDecimal() {
    if (error.value) {
      clear();
    }

    if (waitingForNumber.value) {
      display.value = "0.";
      waitingForNumber.value = false;
      return;
    }

    const alreadyHasDecimal = display.value.includes(".");

    if (!alreadyHasDecimal) {
      display.value += ".";
    }
  }

  function selectOperator(operator) {
    const validOperators = ["+", "-", "×", "÷"];
    const isValidOperator = validOperators.includes(operator);

    if (!isValidOperator || error.value) {
      return;
    }

    const currentNumber = Number(display.value);

    if (previousNumber.value === null) {
      previousNumber.value = currentNumber;
    } else if (selectedOperator.value !== null && !waitingForNumber.value) {
      const operationWasSuccessful = performCalculation();

      if (!operationWasSuccessful) {
        return;
      }

      previousNumber.value = Number(display.value);
    }

    selectedOperator.value = operator;
    waitingForNumber.value = true;
  }

  function equals() {
    const operationIsIncomplete =
      previousNumber.value === null ||
      selectedOperator.value === null ||
      waitingForNumber.value;

    if (operationIsIncomplete || error.value) {
      return;
    }

    const operationWasSuccessful = performCalculation();

    if (!operationWasSuccessful) {
      return;
    }

    previousNumber.value = null;
    selectedOperator.value = null;
    waitingForNumber.value = true;
  }

  function performCalculation() {
    const currentNumber = Number(display.value);

    try {
      const result = calculate(
        previousNumber.value,
        currentNumber,
        selectedOperator.value,
      );

      display.value = formatResult(result);

      return true;
    } catch (calculationError) {
      display.value = "Error";
      error.value = calculationError.message;
      previousNumber.value = null;
      selectedOperator.value = null;
      waitingForNumber.value = false;

      return false;
    }
  }

  function formatResult(result) {
    const roundedResult = Number(result.toFixed(10));

    return String(roundedResult);
  }

  function clear() {
    display.value = "0";
    previousNumber.value = null;
    selectedOperator.value = null;
    waitingForNumber.value = false;
    error.value = "";
  }

  return {
    display,
    operation,
    error,
    inputDigit,
    inputDecimal,
    selectOperator,
    equals,
    clear,
  };
}
