import { useMemo } from "react";
import dayjs from "dayjs";
import { Expense } from "@/services/expenseService";

export function useExpenseStats(expenses: Expense[] | undefined) {
    return useMemo(() => {
        if (!expenses || expenses.length === 0) {
            return {
                totalMoney: 0,
                totalExpenses: 0,
                weeklyMoney: 0,
                monthlyMoney: 0,
            };
        }

        const now = dayjs();

        let totalMoney = 0;
        let weeklyMoney = 0;
        let monthlyMoney = 0;

        expenses.forEach((expense) => {
            const amount = Number(expense.amount);

            totalMoney += amount;

            const createdAt = dayjs(expense.createdAt);

            if (createdAt.isAfter(now.startOf("week"))) {
                weeklyMoney += amount;
            }

            if (createdAt.isAfter(now.startOf("month"))) {
                monthlyMoney += amount;
            }
        });

        return {
            totalMoney,
            totalExpenses: expenses.length,
            weeklyMoney,
            monthlyMoney,
        };
    }, [expenses]);
}
