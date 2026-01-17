import React, { useEffect, useState } from "react";
import ExpenseList from "./components/ExpenseList";

//Same type as above 
type Expense ={
  id: number;
  description: string;
  amount: number;
  category: string;
};

function App() {
  //Dummy data with proper types
  const [expenses, setExpenses] =  useState<Expense[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  //Load from localStorage when app starts
  useEffect(() => {
    const saved = localStorage.getItem('expenses');
    if(saved) {
      try {
        setExpenses(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load expenses:', e);
      }
    }
  }, []); // empty array = run once on mount

  //save to localStorage whenever expenses change 
  useEffect(() =>{
    localStorage.setItem('expenses', JSON.stringify(expenses));

  }, [expenses]); // run when expenses updates

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amount || Number(amount) <= 0){
      alert('Please fill description and a positive amount.');
      return;
    }
    const newExpense: Expense = {
      id: Date.now(), // Simple unique id
      description,
      amount: Number(amount),
      category,
    };

    setExpenses([...expenses, newExpense]);

    // Clear form
    setDescription('');
    setAmount('');
    setCategory('Food');
    
  };
  const handleClearAll = () => {
    if(window.confirm('Are you sure you want to delete all expenses?')) {
      setExpenses([]);
    }
  };

  // New: Calculate total spent
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  // New: Group by category
  const categorySummary = expenses.reduce((acc: Record<string, number>, exp) =>{
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});
  return (
    <div className="app-container">
      <h1>Personal Finance Tracker</h1>

      <form onSubmit={handleSubmit} >
        <div>
          <label>Description: </label>
          <input 
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Dinner"
           
            />
        </div>

        <div>
          <label>Amount ($): </label>
          <input 
            type="number"
            step="0.01"
            value= {amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            
            />
        </div>
        <div >
          <label>Category: </label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
           
            >
              <option value={"Food"}>Food</option>
              <option value={"Transport"}>Transport</option>
              <option value={"Entertainment"}>Entertainment</option>
              <option value={"Other"}>Other</option>
            </select>
        </div>

        <button type="submit" >Add Expense</button>


      </form>
      
     <button onClick={handleClearAll} className="clear-button">Clear All Expenses</button>
      
      <h2>Recent Expenses</h2>
      <ExpenseList expenses={expenses} />

      {Object.keys(categorySummary).length > 0 && (
        <div style={{ marginTop: '32px'}}>
          <h3>By Category</h3>
          <ul style={{ listStyle: 'none', padding: 0}}>
            {Object.entries(categorySummary).map(([cat, total]) => (
              <li key={cat} style={{ padding: '8px 0', borderBottom: '1px solid #eee'}}>
                {cat}: ${total.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App;