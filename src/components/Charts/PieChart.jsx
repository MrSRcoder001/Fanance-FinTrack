import React from 'react';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#94a3b8'];

const PieChart = ({ data }) => {
    const total = data.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <div className="h-[400px] w-full bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800/50">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Spending by Category</h3>
                <select className="bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 border dark:border-slate-700/50 border-slate-200 rounded-xl px-4 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer outline-none transition-all shadow-sm">
                    <option>This Month</option>
                    <option>This Quarter</option>
                </select>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 h-[calc(100%-80px)]">
                <div className="h-full w-1/2 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <RePieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={85}
                                paddingAngle={6}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        cornerRadius={8}
                                        stroke="none"
                                        style={{ cursor: 'pointer', outline: 'none' }}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '16px',
                                    border: 'none',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                }}
                            />
                        </RePieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl font-black text-slate-900 dark:text-white">₹{total.toLocaleString()}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total</span>
                    </div>
                </div>

                <div className="flex-1 space-y-3 w-full max-h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-2">
                    {data.map((item, index) => (
                        <div key={item.name} className="flex items-center justify-between group">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors truncate max-w-[100px]">
                                    {item.name}
                                </span>
                            </div>
                            <div className="text-right shrink-0 ml-3">
                                <p className="text-xs font-black text-slate-900 dark:text-white">₹{item.value.toLocaleString()}</p>
                                <p className="text-[10px] font-bold text-slate-400">{Math.round((item.value / total) * 100)}%</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PieChart;
