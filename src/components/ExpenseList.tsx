import { useState } from "react";


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
    onEdit: (updateExpense: Expense) => void; 
}

function ExpenseList({ expenses, onDelete, onEdit }: ExpenseListProps) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editDescription, setEditDescription] = useState('');
    const [editAmount, setEditAmount] = useState('');
    const [editCategory, setEditCategory] = useState('');

    const startEdit = (expense: Expense) => {
        setEditingId(expense.id);
        setEditDescription(expense.description);
        setEditAmount(expense.amount.toString());
        setEditCategory(expense.category);

    };
    const cancelEdit = () => {
        setEditingId(null);
        setEditDescription('');
        setEditAmount('');
        setEditCategory('');
    }

    const saveEdit = (id: number) => {
        if(!editDescription.trim() || !editAmount || Number(editAmount) <= 0) {
            alert('Description and positive amount required.');
            return;
        };
        const updated ={
            id,
            description:editDescription.trim(),
            amount: Number(editAmount),
            category: editCategory,
        };

        onEdit(updated);
        cancelEdit();
    };
    


    return (
        <ul >
            {expenses.map((expense) =>(
                <li className="expense-item"
                    key={expense.id} 
                    >
                    {editingId === expense.id ? (
                        <>
                            <input 
                                type="text"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                style={{ flex: 1, marginRight: '8px'}} 
                                />
                            <input 
                                type="number"
                                value={editAmount}
                                onChange={(e) => setEditAmount(e.target.value)}
                                style={{ width: '100px', marginRight: '8px'}}
                                />
                            <select
                                    value={editCategory}
                                    onChange={(e) => setEditCategory(e.target.value)}
                                    style={{ marginRight: '8px' }}
                                >
                                    <option value="Food">Food</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Other">Other</option>
                            </select>
                            <button 
                                onClick={() => saveEdit(expense.id)}
                                style={{ marginRight: '8px', background: '#2e7d32', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px'}}
                                >
                                    save
                                </button>
                            <button
                                onClick={cancelEdit}
                                style={{ background: '#757575', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px' }}
                            >
                                Cancel
                            </button>
                            
                        </>
                    ) : (
                        <>
                            <span style={{ flex: 1 }}>
                                {expense.description} ({expense.category})
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <span className={expense.amount > 0 ? 'positive' : 'negative'}>
                                ${expense.amount.toFixed(2)}
                                </span>
                                <button
                                onClick={() => startEdit(expense)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#1976d2',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    padding: '4px 8px',
                                }}
                                >
                                ✎
                                </button>
                                <button
                                onClick={() => onDelete(expense.id)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#d32f2f',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    padding: '4px 8px',
                                }}
                                >
                                ×
                                </button>
                            </div>
                        </>
                    )}   
                                               
                </li>
            ))}
            {expenses.length === 0 && <li className="no-expenses"> No expense yet.</li>}
        </ul>
    );
}
export default ExpenseList;