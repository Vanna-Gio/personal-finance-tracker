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
                <li key={expense.id} style={{ marginBottom: '8px'}}>
                    {expense.description}: ${expense.amount} - {expense.category}
                </li>
            ))}
        </ul>
    );
}
export default ExpenseList;