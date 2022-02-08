import OpenWeatherApi from '../../open_weather_api/api';
import { useQuery } from 'h3';

export default async (req, res) => {
    const query = await useQuery(req);

    return await $fetch(`${OpenWeatherApi.geoUrl}/direct`, {
        params: {
            q: query.query,
            appid: OpenWeatherApi.apiKey,
            limit: 4
        }
    });
}