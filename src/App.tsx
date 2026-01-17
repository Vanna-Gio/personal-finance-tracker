import React, { useState } from "react";
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
  const [expenses, setExpenses] =  useState<Expense[]>([
    { id: 1, description: 'Lunch', amount: 8.5, category: 'Food'},
    {id: 2, description: 'Bus fare', amount: 1.5, category: 'Transport'},
    {id: 3, description: 'Coffee', amount: 3, category: 'Food'},

  ]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

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

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif' , 
      maxWidth: '600px',
      margin: '40px auto',
      padding: '20px' 
    }}>
      <h1>Personal Finance Tracker</h1>

      <form onSubmit={handleSubmit} style={{
        marginBottom: '32px', color: '#fff'
      }}>
        <div style={{
          marginBottom: '12px',
         
        }}>
          <label>Description: </label>
          <input 
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Dinner"
            style={{ padding: '8px', width: '200px'}}
            />
        </div>

        <div style={{ marginBottom: '12px'}}>
          <label>Amount ($): </label>
          <input 
            type="number"
            step="0.01"
            value= {amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            style={{ padding: '8px', width: '120px'}}
            />
        </div>
        <div style={{ marginBottom: '12px'}}>
          <label>Category: </label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: '8px'}}
            >
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value={"Entertainment"}>Entertainment</option>
              <option value={"Other"}>Other</option>
            </select>
        </div>

        <button type="submit"
                 style={{ 
                    padding: '10px 20px', 
                    background:'#1976d2',
                    color: 'white',
                    border: 'none', borderRadius: '4px'
                  }}>Add Expense</button>

      </form>
      <h2>Recent Expenses</h2>
      <ExpenseList expense={expenses} />
    </div>
  )
}

export default App;