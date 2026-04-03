import type { WeatherInput } from "../types/weather.types";

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const fetchWeatherData = async (input: WeatherInput) => {
    const url = `${BASE_URL}?latitude=${input.lat}&longitude=${input.lon}&current=weathercode,temperature,windspeed,relative_humidity_2m&daily=sunrise,sunset&hourly=temperature_2m,relative_humidity_2m,windspeed_10m,precipitation,weathercode&timezone=auto&start_date=${input.date}&end_date=${input.date}`;
    
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to fetch weather data');
    }
    return res.json();
}

export default fetchWeatherData;
