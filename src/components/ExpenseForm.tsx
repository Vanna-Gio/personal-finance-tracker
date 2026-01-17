import React, { useState, useEffect, useRef } from 'react';

interface ExpenseFormProps {
  onAddExpense: (expense: {
    description: string;
    amount: number;
    category: string;
  }) => void;
}

function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const descriptionRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) {
      alert('Description is required.');
      return;
    }
    if (!amount || Number(amount) <= 0) {
      alert('Please enter a positive amount.');
      return;
    }
    if (description.length < 3) {
      alert('Description should be at least 3 characters.');
      return;
    }

    setIsSubmitting(true);

    const newExpense = {
      description: description.trim(),
      amount: Number(amount),
      category,
    };

    onAddExpense(newExpense);

    setSuccessMessage(`Added: ${description.trim()} - $${Number(amount).toFixed(2)}`);
    setTimeout(() => setSuccessMessage(''), 3000);

    setDescription('');
    setAmount('');
    setCategory('Food');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {successMessage && (
        <p className="success-message">{successMessage}</p>
      )}

      <div>
        <label>Description:</label>
        <input
          type="text"
          ref={descriptionRef}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Dinner"
        />
      </div>

      <div>
        <label>Amount ($):</label>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
        />
      </div>

      <div>
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        style={{ opacity: isSubmitting ? 0.7 : 1 }}
      >
        {isSubmitting ? 'Adding...' : 'Add Expense'}
      </button>
    </form>
  );
}

export default ExpenseForm;