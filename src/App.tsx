import React from "react";
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
  const expenses: Expense[] = [
    { id: 1, description: 'Lunch', amount: 8.5, category: 'Food'},
    {id: 2, description: 'Bus fare', amount: 1.5, category: 'Transport'},
    {id: 3, description: 'Coffee', amount: 3, category: 'Food'},

  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
       <h1>Personal Finance Tracker</h1>
       <h2>Recent Expenses</h2>
       <ExpenseList expense={expenses} />
    </div>
  )
}

export default App;