import  { useEffect, useRef, useState } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import CategoryChart from "./components/CategoryChart";

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

      <div style={{ 
          marginBottom: '24px', 
          padding: '16px',
          background: '#e3f2fd',
          borderRadius: '8px'
      }}>
        <h2 style={{ margin: '0 0 8px 0'}}>Summary</h2>
        <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '0'}}>
          Total Spent: ${totalSpent.toFixed(2)}
        </p>
      </div>

      <ExpenseForm
        onAddExpense={(newExp) => {
          const expenseToAdd = {
            id: Date.now(),
            ...newExp,
          };
          setExpenses([...expenses, expenseToAdd]);
        }}
        />
      
      
     <button onClick={handleClearAll} className="clear-button">Clear All Expenses</button>
      
      <h2>Recent Expenses</h2>
      <ExpenseList expenses={expenses} onDelete={handleDelete} />

      {Object.keys(categorySummary).length > 0 && (
        <div style={{ marginTop: '32px'}}>
          <h3>By Category</h3>
              <CategoryChart categorySummary={categorySummary} />
        </div>
      )}
    </div>
  )
}

export default App;