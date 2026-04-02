import React from 'react';
import { LayoutDashboard, ReceiptText, BarChart3, Target, PieChart, Settings, LogOut, Shield, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Sidebar = ({ currentPage, setCurrentPage }) => {
    const { role, setRole, isSidebarOpen, setIsSidebarOpen } = useApp();

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'transactions', label: 'Transactions', icon: ReceiptText },
        { id: 'insights', label: 'Insights', icon: BarChart3 },
        { id: 'budgets', label: 'Budgets', icon: Target },
        { id: 'reports', label: 'Reports', icon: PieChart },
    ];

    return (
        <aside className={`w-72 h-screen fixed left-0 top-0 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col p-6 lg:p-8 z-50 overflow-y-auto transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex items-center justify-between mb-10 px-2 lg:mb-12">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                        <BarChart3 size={24} strokeWidth={2.5} />
                    </div>
                    <h1 className="text-xl lg:text-2xl font-black tracking-tight text-slate-900 dark:text-white">FinTrack</h1>
                </div>
                {/* Close Button on Mobile */}
                <button
                    className="p-2 lg:hidden text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <X size={20} />
                </button>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setCurrentPage(item.id);
                            setIsSidebarOpen(false); // Close on click on mobile
                        }}
                        className={`w-full flex items-center gap-3.5 px-4 lg:px-5 py-3 lg:py-3.5 rounded-2xl transition-all duration-300 ${currentPage === item.id
                            ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/25 scale-[1.02]'
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold'
                            }`}
                    >
                        <item.icon size={20} strokeWidth={currentPage === item.id ? 2.5 : 2} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-800">
                <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-3xl mb-8 border border-blue-100/50 dark:border-blue-800/30">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-black uppercase tracking-wider text-blue-600/70 dark:text-blue-400/70">Current Role</p>
                        <Shield size={14} className="text-blue-500" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">{role}</h4>
                    <button
                        onClick={() => setRole(role === 'Admin' ? 'Viewer' : 'Admin')}
                        className="w-full py-2 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-xl shadow-sm border border-blue-100 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-700 transition-colors"
                    >
                        Switch to {role === 'Admin' ? 'Viewer' : 'Admin'}
                    </button>
                </div>

                <div className="space-y-1">
                    <button className="w-full flex items-center gap-3.5 px-5 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-all font-semibold">
                        <Settings size={20} />
                        <span>Settings</span>
                    </button>
                    <button className="w-full flex items-center gap-3.5 px-5 py-3 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 rounded-2xl transition-all font-semibold">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
