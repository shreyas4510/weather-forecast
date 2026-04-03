import React from 'react';
import type { StatCardProps } from "../types/weather.types";

const StatCard = ({ icon, label, value }: StatCardProps) => (
    <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-6 border border-white/20 hover:bg-white/20 transition-all shadow-xl shadow-black/5 flex flex-col justify-between min-h-[140px] group overflow-hidden relative">
        <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 blur-2xl group-hover:bg-white/20 transition-all" />
        <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">{label}</span>
        </div>
        <p className="text-4xl font-light tracking-tighter text-white">{value}</p>
    </div>
);

export default StatCard;
