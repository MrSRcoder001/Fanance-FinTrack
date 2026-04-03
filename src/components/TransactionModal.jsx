import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionModal = () => {
    const { isModalOpen, setIsModalOpen, addTransaction, updateTransaction, editingTransaction, setEditingTransaction } = useApp();
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        description: '',
        amount: '',
        category: 'Groceries',
        type: 'expense'
    });

    useEffect(() => {
        if (editingTransaction) {
            setFormData({
                date: editingTransaction.date,
                description: editingTransaction.description,
                amount: editingTransaction.amount,
                category: editingTransaction.category,
                type: editingTransaction.type
            });
        } else {
            setFormData({
                date: new Date().toISOString().split('T')[0],
                description: '',
                amount: '',
                category: 'Groceries',
                type: 'expense'
            });
        }
    }, [editingTransaction, isModalOpen]);

    const handleClose = () => {
        setIsModalOpen(false);
        setTimeout(() => setEditingTransaction(null), 300); // clear after animation
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            amount: parseFloat(formData.amount) || 0
        };

        if (editingTransaction) {
            updateTransaction(editingTransaction.id, payload);
        } else {
            addTransaction(payload);
        }
        handleClose();
    };

    return (
        <AnimatePresence>
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-[40px] shadow-2xl relative z-10 p-12 border border-slate-100 dark:border-slate-800"
                    >
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8">
                            {editingTransaction ? 'Edit Entry' : 'New Entry'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Description</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20 dark:text-white transition-all"
                                    placeholder="Rental, Salary, Dinner etc."
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Amount (₹)</label>
                                    <input
                                        required
                                        type="number"
                                        step="0.01"
                                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20 dark:text-white transition-all"
                                        placeholder="0.00"
                                        value={formData.amount}
                                        onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Date</label>
                                    <input
                                        required
                                        type="date"
                                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20 dark:text-white transition-all"
                                        value={formData.date}
                                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Flow</label>
                                    <select
                                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20 dark:text-white appearance-none transition-all"
                                        value={formData.type}
                                        onChange={e => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option value="expense">Expense (-)</option>
                                        <option value="income">Income (+)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Category</label>
                                    <select
                                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20 dark:text-white appearance-none transition-all"
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="Groceries">Groceries</option>
                                        <option value="Salary">Salary</option>
                                        <option value="Rent">Rent</option>
                                        <option value="Shopping">Shopping</option>
                                        <option value="Dining">Dining</option>
                                        <option value="Transport">Transport</option>
                                        <option value="Utilities">Utilities</option>
                                        <option value="Entertainment">Entertainment</option>
                                        <option value="Freelance">Freelance</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-8">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="flex-1 px-6 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl text-sm font-black hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-sm"
                                >
                                    Dismiss
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-2xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30 scale-100 hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    {editingTransaction ? 'Update' : 'Save Transaction'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default TransactionModal;
