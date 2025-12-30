import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const TrendChart = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return <div className="w-full h-87.5 bg-slate-50 animate-pulse rounded-3xl" />
  }
  return (
    <div className="w-full bg-white rounded-3xl p-6 border border-slate-100 shadow-sm" style={{ height: '400px' }}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 uppercase tracking-widest">
            <TrendingUp size={16} className="text-indigo-600" /> Candidate Enrollment Insights
          </h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Weekly Growth Analytics</p>
        </div>
      </div>

      <div className="w-full h-350px mt-4">
        <ResponsiveContainer width="100%" height={300} minWidth={0} minHeight={300}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#020617', fontSize: 10, fontWeight: 'bold' }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#020617', fontSize: 10, fontWeight: 'bold' }}
              allowDecimals={false}
              domain={[0, 'auto']}
            />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '11px', fontWeight: '800' }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#4f46e5"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorCount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;