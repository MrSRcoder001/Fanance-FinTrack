import React from 'react';
import { useApp } from '../context/AppContext';
import Header from '../components/Header';
import { Lightbulb, TrendingUp, Target, AlertCircle, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Insights = () => {
    const { transactions } = useApp();

    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const incomeTransactions = transactions.filter(t => t.type === 'income');

    const categoryTotals = expenseTransactions.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
    }, {});

    const highestCategory = Object.entries(categoryTotals)
        .sort((a, b) => b[1] - a[1])[0];

    const totalMonthlySpending = expenseTransactions.reduce((acc, t) => acc + t.amount, 0);
    const totalMonthlyIncome = incomeTransactions.reduce((acc, t) => acc + t.amount, 0);
    const savingsRate = totalMonthlyIncome > 0 ? ((totalMonthlyIncome - totalMonthlySpending) / totalMonthlyIncome) * 100 : 0;

    const insights = [
        {
            title: "Highest Spending Category",
            description: highestCategory
                ? `You've spent the most on ${highestCategory[0]} this month, totaling ₹${highestCategory[1].toLocaleString()}.`
                : "No expense data available for analysis.",
            icon: TrendingUp,
            color: "text-rose-500",
            bg: "bg-rose-50 dark:bg-rose-900/20",
            tag: "Spending"
        },
        {
            title: "Monthly Savings Rate",
            description: `Your current savings rate is ${savingsRate.toFixed(1)}%. ${savingsRate > 20 ? "Excellent work maintaining a buffer!" : "Try to aim for at least 20% savings to reach your goals faster."}`,
            icon: Target,
            color: "text-blue-500",
            bg: "bg-blue-50 dark:bg-blue-900/20",
            tag: "Savings"
        },
        {
            title: "Cash Flow Stability",
            description: totalMonthlyIncome > totalMonthlySpending
                ? `Positive momentum! You've generated ₹${(totalMonthlyIncome - totalMonthlySpending).toLocaleString()} in net savings this cycle.`
                : `Burn rate alert: Your spending exceeds income by ₹${(totalMonthlySpending - totalMonthlyIncome).toLocaleString()}.`,
            icon: totalMonthlyIncome > totalMonthlySpending ? Zap : AlertCircle,
            color: totalMonthlyIncome > totalMonthlySpending ? "text-emerald-500" : "text-amber-500",
            bg: totalMonthlyIncome > totalMonthlySpending ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-amber-50 dark:bg-amber-900/20",
            tag: "Health"
        }
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Header />

            <div className="flex items-center justify-between mb-10">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                        <Sparkles className="text-blue-500" size={32} strokeWidth={2.5} />
                        Smart Insights
                    </h2>
                    <p className="text-slate-400 font-bold mt-1">AI-driven patterns and financial observations</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {insights.map((insight, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-8 bg-white dark:bg-slate-900 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800/50 flex flex-col h-full group hover:shadow-xl transition-all duration-500"
                    >
                        <div className={`p-4 h-fit w-fit rounded-2xl mb-6 ${insight.bg} ${insight.color} scale-100 group-hover:scale-110 transition-transform`}>
                            <insight.icon size={24} strokeWidth={2.5} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${insight.bg} ${insight.color}`}>
                                    {insight.tag}
                                </span>
                            </div>
                            <h4 className="text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">{insight.title}</h4>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-bold text-sm">
                                {insight.description}
                            </p>
                        </div>
                        <button className="mt-8 flex items-center gap-2 text-sm font-black text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all">
                            Details <ArrowRight size={16} />
                        </button>
                    </motion.div>
                ))}
            </div>

            <section className="bg-slate-950 dark:bg-blue-600 p-12 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                    <Zap size={150} />
                </div>
                <div className="relative z-10">
                    <h3 className="text-3xl font-black mb-6 tracking-tight">FinTrack Advisory</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            {[
                                "Automate savings contributions weekly.",
                                "Review subscription fatigue every 30 days.",
                                "Maintain 6 months of liquid emergency funds."
                            ].map((tip, i) => (
                                <div key={i} className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/5">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                    <p className="text-sm font-bold text-blue-100">{tip}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col justify-end">
                            <p className="text-blue-100/70 font-medium leading-relaxed italic mb-4">
                                "Financial freedom isn't about how much you earn, it's about how much you keep and how well you manage it."
                            </p>
                            <button className="bg-white text-slate-950 px-8 py-3 rounded-2xl font-black text-sm w-fit hover:bg-blue-50 transition-colors shadow-lg">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Insights;
