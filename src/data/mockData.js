export const mockTransactions = [
    { id: 1, date: "2024-03-01", amount: 2500, category: "Salary", type: "income", description: "Monthly Salary" },
    { id: 2, date: "2024-03-05", amount: 150, category: "Groceries", type: "expense", description: "Weekly Shop" },
    { id: 3, date: "2024-03-08", amount: 50, category: "Entertainment", type: "expense", description: "Cinema Ticket" },
    { id: 4, date: "2024-03-12", amount: 120, category: "Utilities", type: "expense", description: "Electricity Bill" },
    { id: 5, date: "2024-03-15", amount: 200, category: "Freelance", type: "income", description: "Logo Design" },
    { id: 6, date: "2024-03-18", amount: 300, category: "Shopping", type: "expense", description: "New Clothes" },
    { id: 7, date: "2024-03-22", amount: 500, category: "Rent", type: "expense", description: "Monthly Rent" },
    { id: 8, date: "2024-03-25", amount: 80, category: "Dining", type: "expense", description: "Dinner with friends" },
    { id: 9, date: "2024-03-28", amount: 150, category: "Freelance", type: "income", description: "Consulting" },
    { id: 10, date: "2024-03-30", amount: 60, category: "Transport", type: "expense", description: "Bus pass" },
    { id: 11, date: "2024-04-01", amount: 2600, category: "Salary", type: "income", description: "April Salary" },
    { id: 12, date: "2024-03-10", amount: 45, category: "Dining", type: "expense", description: "Lunch" },
    { id: 13, date: "2024-03-20", amount: 1200, category: "Income", type: "income", description: "Stock Dividends" },
    { id: 14, date: "2024-04-02", amount: 180, category: "Groceries", type: "expense", description: "Monthly Groceries" },
    { id: 15, date: "2024-04-05", amount: 60, category: "Entertainment", type: "expense", description: "Movie Night" },
    { id: 16, date: "2024-04-10", amount: 500, category: "Rent", type: "expense", description: "Rent Payment" },
    { id: 17, date: "2024-04-12", amount: 95, category: "Dining", type: "expense", description: "Weekend Brunch" },
    // Historical Data to support the Monthly Comparison 8-month chart
    ...Array.from({ length: 6 }).flatMap((_, i) => [
        { id: 100 + i * 4, date: `2023-${String(10 + i).padStart(2, '0')}-01`, amount: 2500 + (Math.random() * 200), category: "Salary", type: "income", description: "Salary" },
        { id: 101 + i * 4, date: `2023-${String(10 + i).padStart(2, '0')}-05`, amount: 400 + (Math.random() * 50), category: "Groceries", type: "expense", description: "Groceries" },
        { id: 102 + i * 4, date: `2023-${String(10 + i).padStart(2, '0')}-15`, amount: 600 + (Math.random() * 100), category: "Rent", type: "expense", description: "Rent" },
        { id: 103 + i * 4, date: `2023-${String(10 + i).padStart(2, '0')}-20`, amount: 200 + (Math.random() * 80), category: "Shopping", type: "expense", description: "Shopping" }
    ]),
    ...Array.from({ length: 2 }).flatMap((_, i) => [
        { id: 200 + i * 4, date: `2024-0${1 + i}-01`, amount: 2600 + (Math.random() * 200), category: "Salary", type: "income", description: "Salary" },
        { id: 201 + i * 4, date: `2024-0${1 + i}-05`, amount: 420 + (Math.random() * 50), category: "Groceries", type: "expense", description: "Groceries" },
        { id: 202 + i * 4, date: `2024-0${1 + i}-15`, amount: 600 + (Math.random() * 100), category: "Rent", type: "expense", description: "Rent" },
        { id: 203 + i * 4, date: `2024-0${1 + i}-20`, amount: 150 + (Math.random() * 80), category: "Shopping", type: "expense", description: "Shopping" }
    ]),
];



export const categories = ["Salary", "Groceries", "Entertainment", "Utilities", "Freelance", "Shopping", "Rent", "Dining", "Transport"];
