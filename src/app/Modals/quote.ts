export interface Quote {
    id: string;
    customerName: string;
    date: string;
    amount: number;
    status: 'DRAFT' | 'CLOSED' | 'WON' | 'LOST' | 'SENT';
    shipTo: string;
    items: { description: string; quantity: number; rate: number; amount: number }[];
  }
  
  export interface QuoteItem {
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }
  