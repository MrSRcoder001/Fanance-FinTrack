import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { isSidebarOpen, setIsSidebarOpen } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <Transactions />;
      case 'insights':
        return <Insights />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex bg-slate-50 dark:bg-slate-950 min-h-screen selection:bg-blue-100 selection:text-blue-900 border-none relative">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 dark:bg-slate-900/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="flex-1 lg:ml-72 p-4 sm:p-6 lg:p-10 min-h-screen overflow-x-hidden w-full">
        <div className="max-w-[1600px] mx-auto">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;
