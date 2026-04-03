import React from 'react';
import { useApp } from '../context/AppContext';
import TransactionTable from '../components/TransactionTable';
import Filters from '../components/Filters';
import Header from '../components/Header';
import { Plus, Download } from 'lucide-react';

const Transactions = () => {
    const { role, transactions, setIsModalOpen, setEditingTransaction } = useApp();

    const exportData = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(transactions));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "transactions.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Header />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Transactions</h2>
                    <p className="text-slate-400 font-bold mt-1">Manage and track every single detail</p>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={exportData}
                        className="flex items-center gap-2.5 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm font-black text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
                    >
                        <Download size={20} strokeWidth={2.5} />
                        Export
                    </button>

                    {role === 'Admin' && (
                        <button
                            onClick={() => {
                                setEditingTransaction(null);
                                setIsModalOpen(true);
                            }}
                            className="flex items-center gap-2.5 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-sm font-black text-white transition-all shadow-xl shadow-blue-500/30 scale-100 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Plus size={20} strokeWidth={2.5} />
                            Add New
                        </button>
                    )}
                </div>
            </div>

            <Filters />

            <div className="bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800/50 shadow-sm mt-8">
                <TransactionTable />
            </div>

        </div>
    );
};

export default Transactions;
