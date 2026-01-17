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
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest' > ('newest');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  let displayedExpenses = [...expenses];

  // Filter
  if(filterCategory !== 'All') {
    displayedExpenses = displayedExpenses.filter(exp => exp.category === filterCategory);
  }
  // Sort
  displayedExpenses.sort((a, b) => {
    if (sortBy === 'newest') return b.id - a.id;
    if(sortBy === 'oldest') return a.id - b.id;
    if(sortBy === 'highest') return b.amount - a.amount;
    if(sortBy === 'lowest') return a.amount - b.amount;
    return 0;
  });
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

  const handleEdit = (updatedExpense: Expense) => {
    setExpenses(
      expenses.map((exp) => exp.id === updatedExpense.id ? updatedExpense : exp)
    );
  };

  //
  const filteredCategorySummary = displayedExpenses.reduce((acc: Record<string, number>, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});
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
        <div style={{ 
                margin: '24px 0', display: 'flex', gap: '16px', flexWrap: 'wrap'

      }}
      >
        <div>
          <label>Sort by: </label>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            style={{ padding: '8px'}}
            >
              <option value={"newest"} >Newest</option>
              <option value="oldest">Oldest first</option>
              <option value="highest">Highest amount</option>
              <option value="lowest">Lowest amount</option>
            </select>
        </div>
        <div>
          <label>Filter category: </label>
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ padding: '8px' }}
          >
            <option value="All">All</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <ExpenseList expenses={displayedExpenses} 
                    onDelete={handleDelete}
                    onEdit={handleEdit} />

      {Object.keys(categorySummary).length > 0 && (
        <div style={{ marginTop: '32px'}}>
          <h3>By Category</h3>
              <CategoryChart categorySummary={filteredCategorySummary} />
        </div>
      )}
    </div>
  )
}

export default App;