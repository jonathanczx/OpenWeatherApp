import OpenWeatherApi from '../../open_weather_api/api';
import { useQuery } from 'h3';
import config from "#config";

/**
 * Sample result
 * {
    "coord": {
        "lon": 153.0248,
        "lat": -27.4706
    },
    "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 20.99,
        "feels_like": 21.05,
        "temp_min": 19.02,
        "temp_max": 21.88,
        "pressure": 1016,
        "humidity": 73
    },
    "visibility": 10000,
    "wind": {
        "speed": 0.45,
        "deg": 143,
        "gust": 1.34
    },
    "clouds": {
        "all": 0
    },
    "dt": 1644233281,
    "sys": {
        "type": 2,
        "id": 2005393,
        "country": "AU",
        "sunrise": 1644175503,
        "sunset": 1644223141
    },
    "timezone": 36000,
    "id": 2174003,
    "name": "Brisbane",
    "cod": 200
    }
 */
export default async (req, res) => {
  const query = await useQuery(req);
  const lat = query.lat;
  const lon = query.lon;

  return await $fetch(`${OpenWeatherApi.dataUrl}/weather`, {
    params: {
      lat,
      lon,
      appid: config.openWeatherApiKey,
      units: "metric",
    },
  });
};