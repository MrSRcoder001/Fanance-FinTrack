import React, { createContext, useState, useContext, useEffect } from "react";
import { mockTransactions } from "../data/mockData";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem("transactions");
        return saved ? JSON.parse(saved) : mockTransactions;
    });

    const [role, setRole] = useState("Admin"); // Default role
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });
    const [filters, setFilters] = useState({
        search: "",
        type: "all",
        category: "all",
        sort: "date-desc"
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        const root = window.document.documentElement;
        const body = window.document.body;
        if (theme === 'dark') {
            root.classList.add('dark');
            body.classList.add('dark');
        } else {
            root.classList.remove('dark');
            body.classList.remove('dark');
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const addTransaction = (transaction) => {
        setTransactions([
            { ...transaction, id: Date.now() },
            ...transactions
        ]);
    };

    const deleteTransaction = (id) => {
        setTransactions(transactions.filter(t => t.id !== id));
    };

    const updateFilters = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const toggleTheme = () => {
        setTheme(prev => prev === "light" ? "dark" : "light");
    };

    const value = {
        transactions,
        role,
        setRole,
        filters,
        updateFilters,
        addTransaction,
        deleteTransaction,
        theme,
        toggleTheme,
        isSidebarOpen,
        setIsSidebarOpen
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
};
