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
    expense: Expense[];
}

function ExpenseList({ expense }: ExpenseListProps) {
    return (
        <ul style={{ listStyle: 'none', padding: 0}}>
            {expense.map((expense) =>(
                <li 
                    key={expense.id} 
                    style={{ 
                        padding: '12px',
                        borderBottom: '1px solid #eee',
                        display: 'flex',
                        justifyContent: 'space-between'
                        
                        }}
                    >
                        <span>{expense.description} ({expense.category})</span>
                        <span style={{ color: expense.amount> 0 ? '#2e7d32': '#d32f2f' }}>
                            ${expense.amount.toFixed(2)}
                      </span>                          
                </li>
            ))}
            {expense.length === 0 && <li style={{ color: '#ffff', padding: '12px'}}> No expense yet.</li>}
        </ul>
    );
}
export default ExpenseList;