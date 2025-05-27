export interface ExpenseInput {
  name: string;
  userId?: string;
  amount: string;
  category: string;
  description?: string;
  date?: string;
}
