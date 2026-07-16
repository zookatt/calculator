import axios from "axios";

import { mapCurrencyRates } from "../../mappers/currencyRateMapper";
import { CURRENCY_SYMBOLS } from "../../models/currencies";

const CURRENCY_API_URL = "https://api.currencyfreaks.com/v2.0/rates/latest";

export async function getCurrencyRates(
  apiKey = import.meta.env.VITE_CURRENCY_FREAKS_API_KEY,
) {
  if (!apiKey) {
    throw new Error("CurrencyFreaks API key is missing");
  }

  const response = await axios.get(CURRENCY_API_URL, {
    params: {
      apikey: apiKey,
      symbols: CURRENCY_SYMBOLS,
    },
  });

  return mapCurrencyRates(response.data?.rates);
}
