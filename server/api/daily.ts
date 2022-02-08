import OpenWeatherApi from '../../open_weather_api/api';
import { useQuery } from 'h3';
import config from "#config";

/**
 * Sample result
 */
export default async (req, res) => {
  const query = await useQuery(req);
  const lat = query.lat;
  const lon = query.lon;

  return await $fetch(`${OpenWeatherApi.dataUrl}/onecall`, {
    params: {
      lat,
      lon,
      exclude: "current,minutely,hourly",
      appid: config.openWeatherApiKey,
      units: "metric",
    },
  });
};