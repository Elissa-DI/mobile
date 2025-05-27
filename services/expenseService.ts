import apiClient from '@/lib/apiClient';
import { ExpenseInput } from '@/types/expense';

export interface Expense extends ExpenseInput {
  id: string;
  createdAt: string;
}

// Create a new expense
export const createExpense = async (expense: ExpenseInput): Promise<Expense> => {
  const response = await apiClient.post('/expenses', expense);
  return response.data;
};

// Get one expense by ID
export const getExpenseById = async (id: string): Promise<Expense> => {
  const response = await apiClient.get<Expense>(`/expenses/${id}`);
  return response.data;
};

// Get all expenses
export const getAllExpenses = async (userId: string | number): Promise<Expense[]> => {
  const response = await apiClient.get<Expense[]>(`/expenses`, {
    params: { userId },
  });
  return response.data;
};

export const deleteExpense = async (id: string): Promise<void> => {
  await apiClient.delete(`/expenses/${id}`);
};
