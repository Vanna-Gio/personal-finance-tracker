import React, { useEffect, useRef, useState } from "react";
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
  //
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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
//
  const descriptionRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if(descriptionRef.current) {
      descriptionRef.current.focus();
    }
  }, []); // Focus on first load

  //save to localStorage whenever expenses change 
  useEffect(() =>{
    localStorage.setItem('expenses', JSON.stringify(expenses));

  }, [expenses]); // run when expenses updates

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Better validation

    if (!description.trim()) {
      alert('Description is required.');
      return
    }
    if(!amount || Number(amount) <= 0) {
      alert('Please enter a positive amount.');
      return
    }
    if (description.length < 3) {
      alert('Description should be at least 3 characters.');
      return
    }
    setIsSubmitting(true);

    const newExpense: Expense = {
      id: Date.now(), // Simple unique id
      description,
      amount: Number(amount),
      category,
    };

    setExpenses([...expenses, newExpense]);

    // Success feadback
    setSuccessMessage(`Added: ${description.trim()} - $${Number(amount).toFixed(2)}`);
    setTimeout(() => setSuccessMessage(''), 3000);// disappear after 3s


    // Clear form
    setDescription('');
    setAmount('');
    setCategory('Food');

    setIsSubmitting(false);
    
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

  const handleDelete = (id: number) => {
    if(window.confirm('Delete this expense?')) {
      setExpenses(expenses.filter((exp) => exp.id !== id));
    }
  }
  return (
    <div className="app-container">
      <h1>Personal Finance Tracker</h1>

      <form onSubmit={handleSubmit} >
        {successMessage && (
          <p className="success-message">
            {successMessage}
          </p>
        )}
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

        <button 
          type="submit"
          disabled={isSubmitting}
          style={{ opacity: isSubmitting ? 0.7 : 1}}
          >
            {isSubmitting ? 'Adding...' : 'Add Expense'}
          </button>


      </form>
      
     <button onClick={handleClearAll} className="clear-button">Clear All Expenses</button>
      
      <h2>Recent Expenses</h2>
      <ExpenseList expenses={expenses} onDelete={handleDelete} />

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