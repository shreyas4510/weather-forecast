import { useQuery } from "@tanstack/react-query";
import fetchWeatherData from "../services/weatherApi";
import type { WeatherData, WeatherInput } from "../types/weather.types";
import { toast } from "react-toastify";

export const useWeather = (params: WeatherInput | null) => {
    return useQuery<WeatherData, Error>({
        queryKey: ["weather", params],
        queryFn: () => {
            if (!params) throw new Error("Params required");
            return fetchWeatherData(params);
        },
        enabled: !!params,
        staleTime: 1000 * 60 * 1,
        throwOnError(error) {
            toast.error(error.message || "Failed to fetch weather");
            return false;
        }
    });
};