import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

jest.mock('./components/CategoryChart', () => () => <div data-testid="category-chart-mock" />);

describe('Personal Finance Tracker', () => {
  test('renders title and empty list message', () => {
    render(<App />);
    expect(screen.getByText('Personal Finance Tracker')).toBeInTheDocument();
    expect(screen.getByText(/No expense yet./i)).toBeInTheDocument();
  });

  test('adds a new expense and updates total', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText('e.g. Dinner'), 'Coffee');
    await user.type(screen.getByPlaceholderText('0.00'), '4.5');
    await user.click(screen.getByRole('button', { name: /add expense/i }));

    expect(await screen.findByText('Coffee (Food)')).toBeInTheDocument();
    expect(screen.getByText('$4.50')).toBeInTheDocument();
    expect(screen.getByText('Total Spent: $4.50')).toBeInTheDocument();
  });

  test('shows validation alert on invalid submit', async () => {
    const user = userEvent.setup();
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<App />);
    await user.click(screen.getByRole('button', { name: /add expense/i }));

    expect(alertSpy).toHaveBeenCalledWith('Description is required.');
    alertSpy.mockRestore();
  });
});