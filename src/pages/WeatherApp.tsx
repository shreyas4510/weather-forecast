import React, { useState } from 'react';
import {
    Wind, Droplets, Sun, Sunrise, Sunset,
    Navigation, Clock, Search,
    Cloud, CloudFog, CloudDrizzle,
    CloudRain, CloudSnow, Zap, HelpCircle
} from 'lucide-react';
import getTheme, { getIsNight } from '../utils/theme.utils';
import { useWeather } from '../hooks/useWeather';
import { getWeatherIcon, getWeatherMessage } from '../utils/weather.utils';
import StatCard from '../components/StatCard';
import WeatherChart from '../components/WeatherChart';
import type { WeatherData, WeatherInput } from '../types/weather.types';
import { toast } from 'react-toastify';

const iconMap = {
    sun: <Sun size={20} className="text-yellow-400" />,
    cloud: <Cloud size={20} className="text-slate-400" />,
    fog: <CloudFog size={20} className="text-slate-300" />,
    drizzle: <CloudDrizzle size={20} className="text-blue-300" />,
    rain: <CloudRain size={20} className="text-blue-500" />,
    snow: <CloudSnow size={20} className="text-blue-100" />,
    storm: <Zap size={20} className="text-yellow-500" />,
    default: <HelpCircle size={20} className="text-slate-400" />,
};

export default function WeatherApp() {

    const [params, setParams] = useState<WeatherInput | null>(null);
    const { data, isLoading } = useWeather(params);

    const isNight = getIsNight(data as WeatherData);
    const activeTheme = getTheme(data?.current?.weathercode || -1, isNight);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const lat = Number(formData.get('lat'));
        const lon = Number(formData.get('lon'));
        if (isNaN(Number(lat)) || isNaN(Number(lon))) {
            toast.error("Please enter valid coordinates");
            return;
        }

        const date = String(formData.get('date'));
        setParams({ lat, lon, date });
    };

    return (
        <div className={`min-h-screen transition-all duration-1000 bg-gradient-to-br ${activeTheme.gradient} font-sans ${activeTheme.text} p-4 md:p-8 lg:p-12`}>
            <div className={`max-w-7xl mx-auto transition-all duration-700 ${data ? 'mb-8' : 'mt-[15vh]'}`}>
                <div className={`${activeTheme.card} backdrop-blur-3xl rounded-[2.5rem] p-6 shadow-2xl transition-all`}>
                    {!data && (
                        <div className="mb-8 text-center md:text-left">
                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Weather Forecast</h1>
                            <p className="text-slate-500 font-medium">Global coordinates & precision forecasting</p>
                        </div>
                    )}

                    <form onSubmit={handleOnSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-2">Latitude</label>
                            <input
                                name="lat"
                                type="text"
                                inputMode="decimal"
                                placeholder="18.52"
                                className="w-full bg-white/40 border border-white/20 rounded-2xl px-5 py-4 outline-none focus:bg-white text-slate-900 transition-all" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-2">Longitude</label>
                            <input
                                name="lon"
                                type="text"
                                inputMode="decimal"
                                placeholder="73.85"
                                className="w-full bg-white/40 border border-white/20 rounded-2xl px-5 py-4 outline-none focus:bg-white text-slate-900 transition-all" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-2">Date</label>
                            <input name="date" type="date" className="w-full bg-white/40 border border-white/20 rounded-2xl px-5 py-4 outline-none focus:bg-white text-slate-900 transition-all" />
                        </div>
                        <button
                            className="h-[60px] bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                            disabled={isLoading}
                        >
                            <Search size={18} /> Get Forecast
                        </button>
                    </form>
                </div>
            </div>

            {data && (
                <div className="max-w-7xl mx-auto space-y-6 lg:space-y-10">

                    <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
                        <div className={`${activeTheme.card} backdrop-blur-2xl rounded-[3.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col min-h-[400px]`}>
                            <div className="flex items-center gap-2 opacity-70">
                                <Navigation size={16} />
                                <span className="font-black text-[10px] tracking-[0.3em] uppercase">{data.timezone}</span>
                            </div>
                            <div className="flex items-start">
                                <p className="text-[7rem] md:text-[10rem] font-black leading-[0.8] tracking-tighter drop-shadow-2xl">
                                    {Math.round(data.current.temperature)}
                                </p>
                                <span className="text-4xl md:text-6xl font-light mt-4 md:mt-8 opacity-40">°C</span>
                            </div>
                            <p className="text-3xl md:text-5xl font-light mt-4 opacity-90">
                                {getWeatherMessage(data.current.temperature, data.current.weathercode)}
                            </p>
                            <div className="flex mt-4 gap-10 bg-black/10 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/10 mx-auto md:mr-0 md:ml-auto">
                                <div className="text-center">
                                    <Sunrise size={24} className="text-yellow-400 mx-auto mb-1" />
                                    <p className="font-bold text-lg">{data.daily.sunrise[0].split('T')[1]}</p>
                                </div>
                                <div className="text-center border-l border-white/10 pl-10">
                                    <Sunset size={24} className="text-orange-400 mx-auto mb-1" />
                                    <p className="font-bold text-lg">{data.daily.sunset[0].split('T')[1]}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
                            <StatCard
                                icon={<Droplets className="text-red-400" />}
                                label="Humidity"
                                value={`${data.current.relative_humidity_2m}%`}
                            />
                            <StatCard
                                icon={<Wind className="text-blue-400" />}
                                label="Wind"
                                value={`${data.current.windspeed} km/h`}
                            />
                            <StatCard
                                icon={<Clock className="text-purple-400" />}
                                label="Time"
                                value={data.current.time.split('T')[1]}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
                        <div className="xl:col-span-3">
                            <WeatherChart
                                hourlyData={data.hourly}
                                theme={activeTheme}
                            />
                        </div>
                        <div className={`xl:col-span-2 ${activeTheme.card} backdrop-blur-xl rounded-[3rem] p-8 shadow-xl h-full`}>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50 mb-8">24H Timeline</h3>
                            <div className="flex xl:flex-col overflow-x-auto xl:overflow-y-auto gap-4 no-spinner max-h-[400px] pr-2">
                                {data.hourly.time.slice(0, 24).map((time, i) => (
                                    <div key={i} className="flex flex-col xl:flex-row items-center justify-between min-w-[80px] p-4 rounded-3xl bg-white/5 hover:bg-white/10 transition-all border border-white/5">
                                        <span className="text-[10px] font-bold opacity-60">{time.split('T')[1]}</span>
                                        <div className="my-2 xl:my-0">{iconMap[getWeatherIcon(data.hourly.weathercode[i])]}</div>
                                        <span className="font-bold">{Math.round(data.hourly.temperature_2m[i])}°</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
