import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';

const TrendChart = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Colorful palette for zigzag bars: reddish-pink, blue, yellow, teal/cyan, purple, orange
  const colorPalette = [
    '#ef4444', // Reddish-pink
    '#3b82f6', // Blue
    '#eab308', // Yellow
    '#06b6d4', // Teal/Cyan
    '#a855f7', // Purple
    '#f97316', // Orange
  ];

  // Process data and assign colors
  const chartData = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) return [];
    
    return data.map((item, index) => ({
      ...item,
      count: Number(item.count) || 0,
      color: colorPalette[index % colorPalette.length],
    }));
  }, [data]);

  // Calculate max value for Y-axis
  const maxValue = useMemo(() => {
    if (!chartData.length) return 100;
    const max = Math.max(...chartData.map(item => item.count || 0));
    return Math.ceil(max * 1.2); // Add 20% padding
  }, [chartData]);

  if (!isMounted) {
    return <div className="w-full h-87.5 bg-slate-50 animate-pulse rounded-3xl" />
  }

  if (!chartData || chartData.length === 0) {
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
        <div className="flex items-center justify-center h-64 text-slate-400 font-bold">
          No enrollment data available
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-3xl p-6 border border-slate-100 shadow-sm" style={{ height: '450px' }}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 uppercase tracking-widest">
            <TrendingUp size={16} className="text-indigo-600" /> Candidate Enrollment Insights
          </h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Weekly Growth Analytics</p>
        </div>
      </div>

      <div className="w-full h-350px mt-4">
        <ResponsiveContainer width="100%" height={350} minWidth={0} minHeight={350}>
          <BarChart 
            data={chartData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            barCategoryGap="25%"
            barGap={8}
          >
            <defs>
              {/* Gradient for each color */}
              {colorPalette.map((color, index) => (
                <linearGradient key={`grad-${index}`} id={`grad-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={1} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.85} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#e5e7eb" 
              strokeWidth={1}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: '#374151', 
                fontSize: 11, 
                fontWeight: 'bold',
                angle: -15,
                textAnchor: 'end'
              }}
              height={50}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: '#374151', 
                fontSize: 10, 
                fontWeight: 'bold' 
              }}
              allowDecimals={false}
              domain={[0, maxValue]}
            />
            <Tooltip
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', 
                fontSize: '12px', 
                fontWeight: '800',
                backgroundColor: '#fff',
                padding: '10px 15px'
              }}
              cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
              formatter={(value) => [value, 'Enrollments']}
            />
            <Bar 
              dataKey="count" 
              radius={[10, 10, 0, 0]}
              fill="#3b82f6"
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color || colorPalette[index % colorPalette.length]} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;