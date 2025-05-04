

import { CustomerRegistration } from "./CustomerRegistration";

  
  // export interface ProformaInvoice {
  //   invoiceNo: string;
  //   date: string;
  //   billingAddress: string;
  //   shippingAddress: string;
  //   gstin: string;
  //   pan: string;
  //   signedBy: string;
  
  //   amountInWords: string;
  //   items: ProformaInvoiceItem[];
  // }

  // export interface ProformaInvoiceItem {
  //   package: string;
  //   hsn: string;
  //   period: string;
  //   amount: number;
  //   cgst: number;
  //   sgst: number;
  //   total: number;
  // }
  

export interface ProformaInvoice {
  proformaCode: string;        // matches backend 'proformaCode'
  date: string;                // LocalDate as string
  customerId: string;
  customerName: string;
  customerEmail: string;
  technology: string;
  customer?: CustomerRegistration;   // optional nested object

  items: ProformaItem[];       // list of invoice items
  totalAmount?: number;        // calculated on frontend
}

export interface ProformaItem {
  piId?: string;               // item identifier, optional
  itemPackage: string;         // corresponds to 'itemPackage' in backend
  transactionDate: string;
  periodFrom: string;
  periodTo: string;
  hscSac: string;
  charges: number;
  discount: number;
  netCharges: number;
}
