import React from 'react';
import { useApp } from '../context/AppContext';
import SummaryCard from '../components/SummaryCard';
import LineChart from '../components/Charts/LineChart';
import PieChart from '../components/Charts/PieChart';
import TransactionTable from '../components/TransactionTable';
import Header from '../components/Header';
import { Wallet, TrendingUp, TrendingDown, Landmark, Trash2, Edit, ChevronRight, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, ResponsiveContainer, Tooltip, Cell, XAxis } from 'recharts';

const Dashboard = () => {
    const { transactions } = useApp();

    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);

    const balance = totalIncome - totalExpenses;
    const savings = totalIncome - totalExpenses;

    // Prepare area chart data
    const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    let runningBalance = 0;
    const areaChartData = sortedTransactions.map(t => {
        runningBalance += t.type === 'income' ? t.amount : -t.amount;
        return { date: t.date, balance: runningBalance };
    });

    // Prepare donut chart data
    const categoryTotals = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {});

    const pieChartData = Object.keys(categoryTotals).map(cat => ({
        name: cat,
        value: categoryTotals[cat]
    }));

    const highestCategory = Object.entries(categoryTotals)
        .sort((a, b) => b[1] - a[1])[0];

    // Calculate monthly comparison data (both income and expenses)
    const monthlyDataMap = transactions.reduce((acc, t) => {
        const date = new Date(t.date);
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        if (!acc[monthYear]) acc[monthYear] = { income: 0, expense: 0 };
        if (t.type === 'income') acc[monthYear].income += t.amount;
        if (t.type === 'expense') acc[monthYear].expense += t.amount;
        return acc;
    }, {});

    const sortedMonths = Object.keys(monthlyDataMap).sort();
    const last8Months = sortedMonths.slice(-8);

    const chartBars = last8Months.map(month => ({
        month,
        income: monthlyDataMap[month].income,
        expense: monthlyDataMap[month].expense
    }));

    const currentMonthSpending = monthlyDataMap[sortedMonths[sortedMonths.length - 1]]?.expense || 0;
    const prevMonthSpending = monthlyDataMap[sortedMonths[sortedMonths.length - 2]]?.expense || 0;
    const monthlyDiff = currentMonthSpending - prevMonthSpending;
    const diffText = monthlyDiff > 0
        ? `₹${monthlyDiff.toLocaleString()} more`
        : `₹${Math.abs(monthlyDiff).toLocaleString()} less`;
    const diffColor = monthlyDiff > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400';

    // Percentage diff
    const percentageDiff = prevMonthSpending > 0
        ? ((monthlyDiff / prevMonthSpending) * 100).toFixed(1)
        : 0;

    const savingsPercentage = totalIncome > 0 ? Math.round((savings / totalIncome) * 100) : 0;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Header />

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                <div className="xl:col-span-3 space-y-8">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <SummaryCard
                            title="Total Balance"
                            amount={balance}
                            trend="up"
                            trendValue="12.5"
                            icon={Wallet}
                            colorClass="text-blue-600 dark:text-blue-400"
                            bgClass="bg-blue-50 dark:bg-blue-900/20"
                        />
                        <SummaryCard
                            title="Total Income"
                            amount={totalIncome}
                            trend="up"
                            trendValue="8.3"
                            icon={TrendingUp}
                            colorClass="text-emerald-600 dark:text-emerald-400"
                            bgClass="bg-emerald-50 dark:bg-emerald-900/20"
                        />
                        <SummaryCard
                            title="Total Expenses"
                            amount={totalExpenses}
                            trend="up"
                            trendValue="5.6"
                            icon={TrendingDown}
                            colorClass="text-rose-600 dark:text-rose-400"
                            bgClass="bg-rose-50 dark:bg-rose-900/20"
                        />
                        <SummaryCard
                            title="This Month's Savings"
                            amount={savings}
                            trend="up"
                            trendValue="15.2"
                            icon={Landmark}
                            colorClass="text-amber-600 dark:text-amber-400"
                            bgClass="bg-amber-50 dark:bg-amber-900/20"
                        />
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <LineChart data={areaChartData} />
                        <PieChart data={pieChartData} />
                    </div>

                    {/* Bottom Section: Transactions */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
                            <button className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold hover:gap-2 transition-all group">
                                View all transactions
                                <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>

                        <div className="bg-white dark:bg-slate-900 rounded-[32px] overflow-y-auto max-h-[400px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] border border-slate-100 dark:border-slate-800/50 shadow-sm">
                            <TransactionTable limit={20} hideHeader />
                        </div>
                    </section>
                </div>

                {/* Right Sidebar Column */}
                <aside className="space-y-8">
                    <div className="p-8 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800/50 shadow-sm h-full">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold dark:text-white">Insights</h3>
                            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl">✨</div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Highest Spending</p>
                                <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <div className="p-3 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl">
                                        <TrendingUp size={20} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-slate-900 dark:text-white">{highestCategory ? highestCategory[0] : 'None'}</h5>
                                        <p className="text-sm font-bold text-slate-600 dark:text-slate-400">₹{highestCategory ? highestCategory[1].toLocaleString() : '0'}</p>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-400 font-medium px-1">You spent the most on {highestCategory ? highestCategory[0].toLowerCase() : 'nothing'} this month.</p>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Monthly Comparison</p>
                                <div className="h-32 w-full mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartBars} barGap={-6}>
                                            <Tooltip
                                                cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}
                                                contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#1e293b', color: '#fff', fontSize: '12px', padding: '8px 12px', fontWeight: 'bold' }}
                                                labelFormatter={(label) => `Month: ${label}`}
                                            />
                                            <Bar dataKey="income" fill="#34d399" radius={[4, 4, 4, 4]} barSize={8} name="Income" className="opacity-90 dark:opacity-80 drop-shadow-sm" />
                                            <Bar dataKey="expense" fill="#60a5fa" radius={[4, 4, 4, 4]} barSize={8} name="Expense" className="opacity-90 dark:opacity-80 drop-shadow-sm" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-xs text-slate-400 font-medium px-1">
                                        You spent <span className={`${diffColor} font-bold`}>{diffText}</span> than last month.
                                    </p>
                                    <div className={`px-2 py-1 rounded-md text-[10px] font-bold ${monthlyDiff > 0 ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>
                                        {monthlyDiff > 0 ? '+' : ''}{percentageDiff}%
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Income vs Expenses</p>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-black text-slate-900 dark:text-white">₹{savings.toLocaleString()}</span>
                                            <span className="text-xs font-bold text-slate-400">Net Savings</span>
                                        </div>
                                        <p className="text-xs text-slate-400 font-medium mb-3">You saved {savingsPercentage}% of your income this month.</p>
                                        <div className="w-full h-3 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden shadow-inner">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${savingsPercentage}%` }}
                                                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Dashboard;
