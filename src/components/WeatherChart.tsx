import {
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Bar,
    ComposedChart,
} from 'recharts';
import CustomTooltip from "./CustomTooltip";
import type { WeatherChartProps } from '../types/weather.types';
import { useMemo } from 'react';

const WeatherChart = ({ hourlyData, theme }: WeatherChartProps) => {
    const chartData = useMemo(() => (
        hourlyData.time.slice(0, 24).map(
        (time, i) => ({
            time: time.split('T')[1],
            temp: Math.round(hourlyData.temperature_2m[i]),
            rain: hourlyData.precipitation ? hourlyData.precipitation[i] : 0,
        })
    )), [hourlyData]);

    return (
        <div className="bg-white/30 backdrop-blur-2xl rounded-[3rem] p-8 border border-white/50 shadow-xl mt-8">
            <div className="flex justify-between items-center mb-10 px-2">
                <div>
                    <h3 className="text-[11px] uppercase tracking-[0.4em] font-bold text-slate-500 mb-1">
                        Atmospheric Flow
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">24-hour temperature & rain projection</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Temp</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-300" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Rain</span>
                    </div>
                </div>
            </div>

            <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                        <defs>
                            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <XAxis
                            dataKey="time"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: '600' }}
                            interval={3}
                        />
                        <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />

                        <Bar
                            dataKey="rain"
                            fill={theme.accent}
                            opacity={0.3}
                            radius={[4, 4, 0, 0]}
                        />
                        <Area
                            type="monotone"
                            dataKey="temp"
                            stroke="rgba(255, 255, 255, 0.8)"
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#tempGradient)"
                            animationDuration={2000}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default WeatherChart;
