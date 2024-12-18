import React, { useState, useEffect } from "react";
import "./App.css";
import deleteIcon from './assets/delete.png';
import Chart from './Chart';


function App() {
  // Initialize state directly from localStorage
  const [income, setIncome] = useState(() => {
    const savedIncome = localStorage.getItem("income");
    return savedIncome ? JSON.parse(savedIncome) : 0;
  });

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : 0;
  });

  const [transactionList, setTransactionList] = useState(() => {
    const savedTransactions = localStorage.getItem("transactionList");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [chartType, setChartType] = useState('pie');

  // Save data to localStorage whenever state updates
  useEffect(() => {
    localStorage.setItem("income", JSON.stringify(income));
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("transactionList", JSON.stringify(transactionList));
  }, [income, expenses, transactionList]);

  const addTransaction = (type) => {
    const newTransaction = {
      id: Date.now(),
      category,
      amount: parseFloat(amount),
      type,
      date: new Date().toLocaleDateString(),
    };

    if (type === "income") {
      setIncome(income + newTransaction.amount);
    } else {
      setExpenses(expenses + newTransaction.amount);
    }

    setTransactionList([newTransaction, ...transactionList]);
    setCategory("");
    setAmount("");
  };
  const deleteTransaction = (id) => {
    // Find the transaction to be deleted
    const deleteTransaction = transactionList.find((t) => t.id === id);
  
    if (deleteTransaction.type === "income") {
      setIncome(income - deleteTransaction.amount); // Subtract the amount
    } else {
      setExpenses(expenses - deleteTransaction.amount); // Subtract the amount
    }
  
    // Update the transaction list by removing the deleted transaction
    const updatedTransactionList = transactionList.filter((t) => t.id !== id);
    setTransactionList(updatedTransactionList);
  };

  //chart
  const toggleChartType = () => {
    setChartType((prevType) => (prevType === 'pie' ? 'bar' : 'pie'));
  };
  

  return (
    <div className="container">
      <h1>Personal Budget Tracker</h1>

      <div className="input-container">
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (e.g., Rent, Food)"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <button onClick={() => addTransaction("income")} className="button">
          Add Income
        </button>
        <button onClick={() => addTransaction("expense")} className="button">
          Add Expense
        </button>
      </div>

      <div className="summary">
        <h2>Summary</h2>
        <p>Total Income: ₹{income}</p>
        <p>Total Expenses: ₹{expenses}</p>
        <p>Remaining Balance: ₹{income - expenses}</p>
      </div>

      <div className="transactions">
        <h2>Transactions</h2>
        <ul>
          {transactionList.map((transaction) => (
            <li key={transaction.id}>
              {transaction.date}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {transaction.type === "income" ? "Income" : "Expense"}:{" "}
              {transaction.category} - ₹{transaction.amount}
              <button
                onClick={() => {
                  deleteTransaction(transaction.id);
                }}
              >
              <img src={deleteIcon}></img>
                
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="chart">
      <Chart type={chartType} income={income} expenses={expenses}  />
      <button onClick={toggleChartType}>
        Switch to {chartType === 'pie' ? 'Bar' : 'Pie'} Chart
      </button>
      </div>
    </div>
  );
}

export default App;
