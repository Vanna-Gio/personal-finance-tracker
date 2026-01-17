import React from "react";

//Define the shape of one expense (typeScript type)
type Expense = {
    id: number;
    description: string;
    amount: number;
    category: string;
};

//we pass the list of expenses as a prop
interface ExpenseListProps {
    expenses: Expense[];
    onDelete: (id: number) => void; // new prop
}

function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
    return (
        <ul >
            {expenses.map((expense) =>(
                <li 
                    key={expense.id} 
                    >
                        <span>{expense.description} ({expense.category})</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px'}}>
                            <span className= {expense.amount > 0 ? 'positive': 'negative'}>
                                ${expense.amount.toFixed(2)}
                            </span> 
                            <button 
                                onClick={() => onDelete(expense.id)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#d32f2f',
                                    cursor: 'pointer',

                                    fontSize: '16px',
                                    padding: '4px 8px'
                                }}
                                > ×
                                </button> 
                        </div>
                                               
                </li>
            ))}
            {expenses.length === 0 && <li className="no-expenses"> No expense yet.</li>}
        </ul>
    );
}
export default ExpenseList;