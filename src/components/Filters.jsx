import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, Filter, ChevronDown, ListFilter, ArrowUpDown } from 'lucide-react';
import { categories } from '../data/mockData';

const Filters = () => {
    const { filters, updateFilters } = useApp();

    return (
        <div className="flex flex-col xl:flex-row gap-4 mb-0">
            <div className="relative flex-1 group">
                <span className="absolute inset-y-0 left-0 pl-5 flex items-center text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <Search size={18} />
                </span>
                <input
                    type="text"
                    placeholder="Search transactions..."
                    className="w-full pl-14 pr-6 py-3.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[28px] text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/5 dark:text-white transition-all shadow-sm placeholder:text-slate-400"
                    value={filters.search}
                    onChange={(e) => updateFilters({ search: e.target.value })}
                />
            </div>

            <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-4 xl:pb-0 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth snap-x">
                <div className="relative min-w-[130px] sm:min-w-[140px] snap-start">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none">
                        <ListFilter size={16} />
                    </div>
                    <select
                        className="w-full pl-10 pr-9 py-3.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[24px] text-[11px] sm:text-xs font-black uppercase tracking-wider focus:outline-none focus:ring-4 focus:ring-blue-500/5 dark:text-white cursor-pointer appearance-none shadow-sm transition-all"
                        value={filters.type}
                        onChange={(e) => updateFilters({ type: e.target.value })}
                    >
                        <option value="all">Every Flow</option>
                        <option value="income">Income Only</option>
                        <option value="expense">Expense Only</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative min-w-[150px] sm:min-w-[160px] snap-start">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500 pointer-events-none">
                        <Filter size={16} />
                    </div>
                    <select
                        className="w-full pl-10 pr-9 py-3.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[24px] text-[11px] sm:text-xs font-black uppercase tracking-wider focus:outline-none focus:ring-4 focus:ring-blue-500/5 dark:text-white cursor-pointer appearance-none shadow-sm transition-all"
                        value={filters.category}
                        onChange={(e) => updateFilters({ category: e.target.value })}
                    >
                        <option value="all">All Channels</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative min-w-[150px] sm:min-w-[160px] snap-start">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none">
                        <ArrowUpDown size={16} />
                    </div>
                    <select
                        className="w-full pl-10 pr-9 py-3.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[24px] text-[11px] sm:text-xs font-black uppercase tracking-wider focus:outline-none focus:ring-4 focus:ring-blue-500/5 dark:text-white cursor-pointer appearance-none shadow-sm transition-all"
                        value={filters.sort}
                        onChange={(e) => updateFilters({ sort: e.target.value })}
                    >
                        <option value="date-desc">Latest Dates</option>
                        <option value="date-asc">Oldest Dates</option>
                        <option value="amount-desc">High Amount</option>
                        <option value="amount-asc">Low Amount</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
            </div>
        </div>
    );
};

export default Filters;
