import React from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, Edit, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const TransactionTable = ({ limit, hideHeader = false }) => {
    const { transactions, role, deleteTransaction, filters, setEditingTransaction, setIsModalOpen } = useApp();

    const filteredTransactions = transactions
        .filter(t => {
            if (filters.type !== 'all' && t.type !== filters.type) return false;
            if (filters.category !== 'all' && t.category !== filters.category) return false;
            if (filters.search && !t.description.toLowerCase().includes(filters.search.toLowerCase())) return false;
            return true;
        })
        .sort((a, b) => {
            if (filters.sort === 'date-desc') return new Date(b.date) - new Date(a.date);
            if (filters.sort === 'date-asc') return new Date(a.date) - new Date(b.date);
            if (filters.sort === 'amount-desc') return b.amount - a.amount;
            if (filters.sort === 'amount-asc') return a.amount - b.amount;
            return 0;
        })
        .slice(0, limit || transactions.length);

    const getCategoryColor = (cat) => {
        const colors = {
            Salary: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
            Groceries: 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400',
            Rent: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
            Transport: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
            Entertainment: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
            Income: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
            Freelance: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400',
            Utilities: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
        };
        return colors[cat] || 'bg-slate-50 text-slate-600';
    };

    return (
        <div className="w-full">
            {/* Desktop View: Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    {!hideHeader && (
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Description</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Type</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                            </tr>
                        </thead>
                    )}
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                        {filteredTransactions.length > 0 ? (
                            filteredTransactions.map((t) => (
                                <tr key={t.id} className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-all duration-300">
                                    <td className="p-6 text-sm text-slate-500 dark:text-slate-400 font-bold whitespace-nowrap">
                                        {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td className="p-6 text-sm text-slate-900 dark:text-white font-black">{t.description}</td>
                                    <td className="p-6">
                                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black ${getCategoryColor(t.category)} shadow-sm`}>
                                            {t.category}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <div className={`flex items-center gap-1.5 font-black text-[10px] uppercase tracking-wider ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {t.type === 'income' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                            {t.type}
                                        </div>
                                    </td>
                                    <td className={`p-6 text-sm font-black whitespace-nowrap ${t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                                        }`}>
                                        {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex justify-end space-x-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                            {role === 'Admin' && (
                                                <>
                                                    <button
                                                        onClick={() => {
                                                            setEditingTransaction(t);
                                                            setIsModalOpen(true);
                                                        }}
                                                        className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all"
                                                    >
                                                        <Edit size={18} strokeWidth={2.5} />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteTransaction(t.id)}
                                                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all"
                                                    >
                                                        <Trash2 size={18} strokeWidth={2.5} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="p-12 text-center text-slate-500 dark:text-slate-400 italic font-bold">
                                    No records match your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile View: Card List */}
            <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
                {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((t) => (
                        <div key={t.id} className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all group">
                            <div className="flex justify-between items-start mb-3">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        <span className={`px-2 py-0.5 rounded-lg ${getCategoryColor(t.category)}`}>
                                            {t.category}
                                        </span>
                                    </p>
                                    <h4 className="text-base font-black text-slate-900 dark:text-white leading-tight">{t.description}</h4>
                                </div>
                                <div className="text-right">
                                    <p className={`text-base font-black ${t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                                        {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
                                    </p>
                                    <div className={`flex items-center justify-end gap-1 font-black text-[10px] uppercase tracking-wider mt-0.5 ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                        {t.type === 'income' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                        {t.type}
                                    </div>
                                </div>
                            </div>

                            {role === 'Admin' && (
                                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-50 dark:border-slate-800/50">
                                    <button
                                        onClick={() => {
                                            setEditingTransaction(t);
                                            setIsModalOpen(true);
                                        }}
                                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 rounded-xl text-xs font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100"
                                    >
                                        <Edit size={14} /> Edit
                                    </button>
                                    <button
                                        onClick={() => deleteTransaction(t.id)}
                                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 rounded-xl text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600 transition-all border border-transparent hover:border-rose-100"
                                    >
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="p-12 text-center text-slate-500 dark:text-slate-400 italic font-bold">
                        No records match your criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionTable;
