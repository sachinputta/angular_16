export class Transaction {
    id: number;
    transactionDate:Date
  transactionType: string;  // "Income" or "Expense"
  description: string;
  amount: number;
  paymentMode: string;  // "Cash", "Bank Transfer", or "UPI"

}
