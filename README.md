# FinTrack - Interactive Finance Dashboard

A clean, modern, and high-fidelity finance dashboard built with React and Tailwind CSS.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

## 🎯 How It Meets Project Requirements

1. **Responsive & Premium UI**: The application features a mobile-first design leveraging Tailwind CSS. It includes a slide-out sidebar for mobile usability and perfectly aligned summary cards. Specialized scrollable containers with hidden scrollbars optimize the layout for "Spending by Category" and "Recent Transactions".
2. **Standardized Currency Formatting**: Ensures all transactions and financial metrics are uniformly displayed in Indian Rupees (₹) across the entire application.
3. **Interactive Data Visualization**: Upgrades basic data presentation to a high-fidelity experience utilizing Recharts. Features responsive bar charts (e.g., Monthly Comparison) and donut charts with premium dropdown styling.
4. **Role-Based Views**: Meets the requirement to demonstrate authorization handling by implementing a Role Switching feature, allowing stakeholders to seamlessly toggle between Admin (Full Access) and Viewer (Read-only) UI states.

## ⚙️ How the Functionality Works

- **State & Data Management**: The application utilizes the React Context API to provide reliable state management across all frontend components without prop drilling. It leverages LocalStorage to persist mock transaction data, simulating a robust backend experience across page refreshes.
- **Transactions Management**: Includes filtrable and sortable transaction tables. Users can quickly search through their financial history and sort by various column fields.
- **Theming**: Employs an intelligent global theming setup allowing users to seamlessly switch to Dark Mode, dynamically altering Tailwind CSS classes in real-time for an accessible and comfortable viewing experience.
- **Smooth Visual Feedback**: Framer Motion is integrated to provide dynamic layout transitions, hover effects, and entrance animations, giving the UI a lively and highly interactive feel.

## ✨ Key Features
- **Total Visibility**: Summary cards for Balance, Income, Expenses, and Savings.
- **Interactive Data Viz**: High-fidelity Area Charts and Donut Charts using Recharts.
- **Detailed History**: Filtrable and sortable transaction tables.
- **Role Switching**: Demo both **Admin** (Full Access) and **Viewer** (Read-only) UI states.
- **Dark Mode**: Seamless theme switching for better eye comfort.
- **Persistence**: Transactions are saved to LocalStorage.
- **Responsive**: Built with a mobile-first grid layout.

## 🛠️ Tech Stack
- **Vite + React 19**: Modern frontend foundation.
- **Tailwind CSS v4**: Utility-first styling with premium theme tokens.
- **Recharts**: Responsive and interactive data visualizations.
- **Framer Motion**: Smooth entrance and interaction animations.
- **Lucide React**: Clean and consistent iconography.
- **Context API**: Reliable state management across the app.

## 📁 Project Structure
- `src/components/`: Reusable UI elements (Charts, Tables, Sidebars).
- `src/pages/`: Main views (Dashboard, Transactions, Insights).
- `src/context/`: Application state and logic.
- `src/data/`: Mock data generation and utilities.
- `src/index.css`: Global styles and theme configuration.
