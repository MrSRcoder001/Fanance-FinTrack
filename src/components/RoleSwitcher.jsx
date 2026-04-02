import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, User, ChevronDown } from 'lucide-react';

const RoleSwitcher = () => {
    const { role, setRole } = useApp();

    return (
        <div className="relative">
            <select
                className="appearance-none pl-10 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold active:ring-2 focus:ring-blue-500 dark:text-white cursor-pointer transition-all shadow-sm"
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="Admin">Admin</option>
                <option value="Viewer">Viewer</option>
            </select>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                {role === 'Admin' ? <Shield size={18} /> : <User size={18} />}
            </div>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
    );
};

export default RoleSwitcher;
