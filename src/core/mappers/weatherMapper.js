import { ASTURIAS_CAPITAL, WEATHER_IMAGES } from "../models/weather";

export function getWeatherImage(description) {
  const normalizedDescription = description.toLowerCase();

  if (
    normalizedDescription.includes("tormenta") ||
    normalizedDescription.includes("granizo")
  ) {
    return WEATHER_IMAGES.extreme;
  }

  if (normalizedDescription.includes("lluvia")) {
    return WEATHER_IMAGES.rain;
  }

  if (normalizedDescription.includes("cubierto")) {
    return WEATHER_IMAGES.overcast;
  }

  if (normalizedDescription.includes("nuboso")) {
    return WEATHER_IMAGES.cloudy;
  }

  return WEATHER_IMAGES.clear;
}

export function mapAsturiasWeather(apiData) {
  const cities = apiData?.ciudades;

  if (!Array.isArray(cities)) {
    throw new Error("Invalid weather response");
  }

  const capital = cities.find((city) => city.name === ASTURIAS_CAPITAL);

  if (!capital) {
    throw new Error("Asturias capital weather not found");
  }

  const description = capital.stateSky?.description;
  const minTemperature = Number(capital.temperatures?.min);
  const maxTemperature = Number(capital.temperatures?.max);

  const weatherIsInvalid =
    !description ||
    !Number.isFinite(minTemperature) ||
    !Number.isFinite(maxTemperature);

  if (weatherIsInvalid) {
    throw new Error("Invalid weather response");
  }

  return {
    location: capital.nameProvince,
    city: capital.name,
    description,
    minTemperature,
    maxTemperature,
    image: getWeatherImage(description),
  };
}
