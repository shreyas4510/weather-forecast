import React from 'react';
import { Search } from 'lucide-react';

export default function WeatherApp() {
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const lat = Number(formData.get('lat'));
        const lon = Number(formData.get('lon'));
        const date = String(formData.get('date'));
        console.log({ lat, lon, date });
    };

    return (
        <div className={`min-h-screen transition-all duration-1000 bg-gradient-to-br from-[#0ea5e9] via-[#38bdf8] to-[#bae6fd] font-sans text-slate-900 p-4 md:p-8 lg:p-12`}>
            <div className={`max-w-7xl mx-auto transition-all duration-700 mt-[15vh]`}>
                <div className={`bg-white/60 border-white/40 shadow-xl backdrop-blur-3xl rounded-[2.5rem] p-6 shadow-2xl transition-all`}>
                    <div className="mb-8 text-center md:text-left">
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Weather Forecast</h1>
                        <p className="text-slate-500 font-medium">Global coordinates & precision forecasting</p>
                    </div>
                    <form onSubmit={handleOnSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-2">Latitude</label>
                            <input name="lat" type="number" step="any" placeholder="18.52" className="w-full bg-white/40 border border-white/20 rounded-2xl px-5 py-4 outline-none focus:bg-white text-slate-900 transition-all" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-2">Longitude</label>
                            <input name="lon" type="number" step="any" placeholder="73.85" className="w-full bg-white/40 border border-white/20 rounded-2xl px-5 py-4 outline-none focus:bg-white text-slate-900 transition-all" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-2">Date</label>
                            <input name="date" type="date" className="w-full bg-white/40 border border-white/20 rounded-2xl px-5 py-4 outline-none focus:bg-white text-slate-900 transition-all" />
                        </div>
                        <button
                            className="h-[60px] bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Search size={18} /> Get Forecast
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
