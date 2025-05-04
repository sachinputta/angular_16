import { CustomerRegistration } from "./CustomerRegistration";

export interface Quote {
  quoteCode?: string;
  date?: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customer?: CustomerRegistration; 
  items: { description: string; quantity: number; rate: number; amount: number }[];

 
}

export interface QuoteItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

