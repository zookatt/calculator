import axios from "axios";

import { mapAsturiasWeather } from "../../mappers/weatherMapper";
import { ASTURIAS_PROVINCE_CODE } from "../../models/weather";

const WEATHER_API_URL =
  "https://api.el-tiempo.net/json/v3/provincias";

export async function getAsturiasWeather() {
  const response = await axios.get(
    `${WEATHER_API_URL}/${ASTURIAS_PROVINCE_CODE}`,
  );

  return mapAsturiasWeather(response.data);
}