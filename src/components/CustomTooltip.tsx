import type { TooltipProps } from "recharts";

const CustomTooltip = (props: TooltipProps) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-2xl border border-blue-50 min-w-[120px]">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    {data.time}
                </p>
                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500">Temp</span>
                        <span className="text-xl font-black text-slate-900">{data.temp}°</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                        <span className="text-[10px] font-bold text-blue-400 uppercase">Rain</span>
                        <span className="text-sm font-bold text-blue-600">{data.rain}mm</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export default CustomTooltip;
