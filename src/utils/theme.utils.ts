import type { WeatherData } from "../types/weather.types";

export const getIsNight = (data: WeatherData) => {
    const hour = Number(data?.current?.time?.split('T')[1]?.split(':')[0]);
    return hour >= 19 || hour <= 6;
}

const THEMES: Record<string, Theme> = {
    night: {
        gradient: "from-[#0f172a] via-[#1e1b4b] to-[#312e81]",
        text: "text-white",
        accent: "#818cf8",
        card: "bg-slate-900/40 border-white/10 backdrop-blur-xl",
    },
    sunny: {
        gradient: "from-[#f59e0b] via-[#fbbf24] to-[#fef3c7]",
        text: "text-amber-950",
        accent: "#d97706",
        card: "bg-white/70 border-amber-100/50 shadow-lg backdrop-blur-md",
    },
    rain: {
        gradient: "from-[#475569] via-[#64748b] to-[#94a3b8]",
        text: "text-white",
        accent: "#38bdf8",
        card: "bg-slate-800/40 border-white/10",
    },
    thunder: {
        gradient: "from-[#111827] via-[#1f2937] to-[#374151]",
        text: "text-yellow-500",
        accent: "#eab308",
        card: "bg-black/40 border-yellow-500/20 backdrop-blur-2xl",
    },
    cloudy: {
        gradient: "from-[#0ea5e9] via-[#38bdf8] to-[#bae6fd]",
        text: "text-slate-900",
        accent: "#0284c7",
        card: "bg-white/60 border-white/40 shadow-xl",
    },
};

const getWeatherType = (code: number): keyof typeof THEMES => {
    if (code === 0 || code === 1) return "sunny";           // clear + mainly clear
    if (code >= 2 && code <= 3) return "cloudy";
    if (code >= 51 && code <= 82) return "rain";
    if (code >= 95) return "thunder";
    return "cloudy";
};

export const getTheme = (code: number = 0, isNight: boolean = false) => {
    if (isNight) return THEMES.night;

    const type = getWeatherType(code);
    return THEMES[type];
};

export default getTheme;
