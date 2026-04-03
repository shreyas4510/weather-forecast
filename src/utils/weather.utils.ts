import type { WeatherIconType } from "../types/weather.types";

export const getWeatherMessage = (temp: number, code: number): string => {
    switch (true) {
        case code === 0:
            if (temp > 35) return "🔥 Scorching Sun";
            if (temp > 25) return "☀️ Warm & Sunny";
            return "🌤 Pleasant Clear Skies";
        case code === 1:
            return "🌤 Partly Cloudy";
        case code === 2:
        case code === 3:
            return "☁️ Overcast Skies";
        case code === 45 || code === 48:
            return "🌫 Foggy Conditions";
        case code >= 51 && code <= 57:
            return "🌦 Light Drizzle";
        case code >= 61 && code <= 67:
            return temp < 10 ? "🥶 Cold Rain" : "🌧 Rainy Day";
        case code >= 71 && code <= 77:
            return temp < 0 ? "❄️ Freezing Snow" : "🌨 Snowfall";
        case code >= 80 && code <= 82:
            return "🌦 Passing Showers";
        case code >= 95:
            return "⛈ Thunderstorm Alert";
        default:
            return "🌍 Variable Conditions";
    }
};

export const getWeatherIcon = (code: number): WeatherIconType => {
        switch (true) {
        case code === 0:
            return 'sun';
        case code > 0 && code <= 3:
            return 'cloud';
        case code === 45 || code === 48:
            return 'fog';
        case code >= 51 && code <= 57:
            return 'drizzle';
        case code >= 61 && code <= 67:
            return 'rain';
        case code >= 71 && code <= 77:
            return 'snow';
        case code >= 80 && code <= 82:
            return 'rain';
        case code >= 95:
            return 'storm';
        default:
            return 'default';
    }
};
