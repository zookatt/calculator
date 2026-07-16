import axios from "axios";

const CURRENCY_API_URL =
  "https://api.currencyfreaks.com/v2.0/rates/latest";

export async function getCurrencyRates(
  apiKey = import.meta.env.VITE_CURRENCY_FREAKS_API_KEY,
) {
  if (!apiKey) {
    throw new Error("CurrencyFreaks API key is missing");
  }

  const response = await axios.get(CURRENCY_API_URL, {
    params: {
      apikey: apiKey,
      symbols: "EUR,USD,JPY",
    },
  });

  const apiRates = response.data?.rates;

  const rates = {
    EUR: Number(apiRates?.EUR),
    USD: Number(apiRates?.USD),
    JPY: Number(apiRates?.JPY),
  };

  const allRatesAreValid = Object.values(rates).every((rate) =>
    Number.isFinite(rate),
  );

  if (!allRatesAreValid) {
    throw new Error("Invalid currency rates response");
  }

  return rates;
}