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
                    <Search size={20} />
                </span>
                <input
                    type="text"
                    placeholder="Search transactions..."
                    className="w-full pl-14 pr-6 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[28px] text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/5 dark:text-white transition-all shadow-sm"
                    value={filters.search}
                    onChange={(e) => updateFilters({ search: e.target.value })}
                />
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 xl:pb-0 no-scrollbar">
                <div className="relative min-w-[140px]">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500">
                        <ListFilter size={18} />
                    </div>
                    <select
                        className="w-full pl-11 pr-10 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[24px] text-sm font-black focus:outline-none focus:ring-4 focus:ring-blue-500/5 dark:text-white cursor-pointer appearance-none shadow-sm transition-all"
                        value={filters.type}
                        onChange={(e) => updateFilters({ type: e.target.value })}
                    >
                        <option value="all">Every Flow</option>
                        <option value="income">Income Only</option>
                        <option value="expense">Expense Only</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative min-w-[160px]">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500">
                        <Filter size={18} />
                    </div>
                    <select
                        className="w-full pl-11 pr-10 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[24px] text-sm font-black focus:outline-none focus:ring-4 focus:ring-blue-500/5 dark:text-white cursor-pointer appearance-none shadow-sm transition-all"
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

                <div className="relative min-w-[160px]">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500">
                        <ArrowUpDown size={18} />
                    </div>
                    <select
                        className="w-full pl-11 pr-10 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[24px] text-sm font-black focus:outline-none focus:ring-4 focus:ring-blue-500/5 dark:text-white cursor-pointer appearance-none shadow-sm transition-all"
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
