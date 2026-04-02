import React, { useState } from 'react';
import { Search, Bell, Moon, Sun, ChevronDown, Shield, User, Menu } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header = () => {
    const { theme, toggleTheme, role, setRole, filters, updateFilters, setIsSidebarOpen } = useApp();
    const [showRoleDropdown, setShowRoleDropdown] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3 w-full md:w-96">
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2.5 lg:hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 shadow-sm flex-shrink-0 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                    <Menu size={20} />
                </button>
                <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                        <Search size={20} />
                    </span>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={filters.search}
                        onChange={(e) => updateFilters({ search: e.target.value })}
                        className="w-full pl-12 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-white shadow-sm transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-3 md:gap-4 w-full md:w-auto">
                <div className="relative">
                    <button
                        onClick={() => { setShowRoleDropdown(!showRoleDropdown); setShowNotifications(false); }}
                        className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                        <div className="text-blue-500 bg-blue-50 dark:bg-blue-900/20 p-1 rounded-lg">
                            {role === 'Admin' ? <Shield size={16} /> : <User size={16} />}
                        </div>
                        <span>Role: {role}</span>
                        <ChevronDown size={14} className="text-slate-400 ml-1" />
                    </button>
                    {showRoleDropdown && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 py-2 z-50">
                            {['Admin', 'User'].map((r) => (
                                <button
                                    key={r}
                                    onClick={() => {
                                        setRole(r);
                                        setShowRoleDropdown(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${role === r ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    onClick={toggleTheme}
                    className="p-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                <div className="relative">
                    <button
                        onClick={() => { setShowNotifications(!showNotifications); setShowRoleDropdown(false); }}
                        className="p-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm text-slate-600 dark:text-slate-300 relative group hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                        <Bell size={20} />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
                    </button>
                    {showNotifications && (
                        <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-4 z-50">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-3">Notifications</h4>
                            <div className="space-y-3">
                                <div className="text-sm p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700">
                                    <p className="font-semibold text-slate-900 dark:text-white">Budget limit alert</p>
                                    <p className="text-xs text-slate-500 mt-1">You've reached 80% of your entertainment budget.</p>
                                </div>
                                <div className="text-sm p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700">
                                    <p className="font-semibold text-slate-900 dark:text-white">New feature added</p>
                                    <p className="text-xs text-slate-500 mt-1">Check out the new monthly comparison charts!</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{role === 'Admin' ? 'Admin User' : 'Standard User'}</p>
                        <p className="text-xs font-semibold text-slate-400">{role === 'Admin' ? 'Finance Manager' : 'Team Member'}</p>
                    </div>
                    <img
                        src={`https://ui-avatars.com/api/?name=${role === 'Admin' ? 'Admin+User' : 'Standard+User'}&background=${role === 'Admin' ? '3b82f6' : '10b981'}&color=fff`}
                        alt="Profile"
                        className="w-10 h-10 rounded-2xl shadow-md border-2 border-white dark:border-slate-800"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
