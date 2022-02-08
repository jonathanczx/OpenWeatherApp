import OpenWeatherApi from '../../open_weather_api/api';
import { useQuery } from 'h3';
import config from "#config";

export default async (req, res) => {
  const query = await useQuery(req);

  return await $fetch(`${OpenWeatherApi.geoUrl}/direct`, {
    params: {
      q: query.query,
      appid: config.openWeatherApiKey,
      limit: 4,
    },
  });
};