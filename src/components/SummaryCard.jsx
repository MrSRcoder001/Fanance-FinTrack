import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const SummaryCard = ({ title, amount, trend, trendValue, icon: Icon, colorClass, bgClass }) => {
    const isPositive = trend === 'up';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800/50 bg-white dark:bg-slate-900 flex flex-col justify-between h-full group hover:shadow-md transition-all duration-300"
        >
            <div className="flex justify-between items-start gap-4 mb-3 sm:mb-4">
                <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 leading-snug break-words flex-1 pr-2 uppercase tracking-wider">{title}</p>
                <div className={`shrink-0 p-2 sm:p-2.5 rounded-2xl ${bgClass} ${colorClass} group-hover:scale-110 transition-transform shadow-sm`}>
                    <Icon size={18} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
                </div>
            </div>

            <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                    ₹{amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h3>

                <div className="flex items-center gap-1.5 mt-auto">
                    <div className={`flex items-center px-1.5 py-0.5 rounded-lg text-[10px] sm:text-xs font-black ${isPositive ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400'
                        }`}>
                        {isPositive ? <TrendingUp size={12} className="mr-0.5" /> : <TrendingDown size={12} className="mr-0.5" />}
                        {trendValue}%
                    </div>
                    <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-bold">vs last month</span>
                </div>
            </div>
        </motion.div>
    );
};

export default SummaryCard;
