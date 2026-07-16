export function calculate(firstNumber, secondNumber, operator) {
  if (
    !Number.isFinite(firstNumber) ||
    !Number.isFinite(secondNumber)
  ) {
    throw new Error("Invalid operation");
  }

  switch (operator) {
    case "+":
      return firstNumber + secondNumber;
    case "-":
      return firstNumber - secondNumber;
    case "×":
      return firstNumber * secondNumber;
    case "÷":
      if (secondNumber === 0) {
        throw new Error("Cannot divide by zero");
      }

      return firstNumber / secondNumber;
    default:
      throw new Error("Invalid operator");
  }
}
