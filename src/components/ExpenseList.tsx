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
}

function ExpenseList({ expenses }: ExpenseListProps) {
    return (
        <ul >
            {expenses.map((expense) =>(
                <li 
                    key={expense.id} 
                    >
                        <span>{expense.description} ({expense.category})</span>
                        <span className= {expense.amount > 0 ? 'positive': 'negative'}>
                            ${expense.amount.toFixed(2)}
                      </span>                          
                </li>
            ))}
            {expenses.length === 0 && <li className="no-expenses"> No expense yet.</li>}
        </ul>
    );
}
export default ExpenseList;