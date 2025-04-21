export interface ProformaInvoiceItem {
    package: string;
    hsn: string;
    period: string;
    amount: number;
    cgst: number;
    sgst: number;
    total: number;
  }
  
  export interface ProformaInvoice {
    invoiceNo: string;
    date: string;
    billingAddress: string;
    shippingAddress: string;
    gstin: string;
    pan: string;
    signedBy: string;
    totalAmount: number;
    amountInWords: string;
    items: ProformaInvoiceItem[];
  }
  