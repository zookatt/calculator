export function convertCurrency(amount, fromCurrency, toCurrency, rates) {
  const numericAmount = Number(amount);

  if (
    amount === "" ||
    !Number.isFinite(numericAmount) ||
    numericAmount < 0
  ) {
    throw new Error("Invalid amount");
  }

  const fromRate = rates[fromCurrency];
  const toRate = rates[toCurrency];

  if (
    !Number.isFinite(fromRate) ||
    !Number.isFinite(toRate)
  ) {
    throw new Error("Currency rate not available");
  }

  const amountInDollars = numericAmount / fromRate;
  const convertedAmount = amountInDollars * toRate;

  return convertedAmount;
}