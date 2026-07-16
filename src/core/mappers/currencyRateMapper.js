import { CURRENCIES } from "../../tests/core/models/currencies";

export function mapCurrencyRates(apiRates) {
  const rates = {};

  for (const currency of CURRENCIES) {
    const rate = Number(apiRates?.[currency]);

    if (!Number.isFinite(rate)) {
      throw new Error("Invalid currency rates response");
    }

    rates[currency] = rate;
  }

  return rates;
}
