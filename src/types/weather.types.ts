export type WeatherInput = {
    lat: number;
    lon: number;
    date: string;
}

export type StatCardProps = {
    icon: React.ReactNode;
    label: string;
    value: string | number;
}

export type WeatherIconType = "sun" | "cloud" | "fog" | "drizzle" | "rain" | "snow" | "storm" | "default";
type hourlyData = {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    windspeed_10m: number[];
    precipitation: number[];
    weathercode: number[];
}
export type WeatherData = {
    timezone: string;
    current: {
        time: string;
        temperature: number;
        weathercode: number;
        windspeed: number;
        relative_humidity_2m: number;
    },
    daily: {
        sunrise: string[];
        sunset: string[];
    },
    hourly: hourlyData
}

export type WeatherChartProps = {
    hourlyData: hourlyData;
    theme: Theme;
}

export type Theme = {
    gradient: string;
    text: string;
    accent: string;
    card: string;
};
