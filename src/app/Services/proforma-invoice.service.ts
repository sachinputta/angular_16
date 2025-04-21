import { Injectable } from '@angular/core';
import { ProformaInvoice } from '../Modals/proforma-invoice';

@Injectable({
  providedIn: 'root'
})
export class ProformaInvoiceService {

  constructor() { }

  
  private invoices: ProformaInvoice[] = [
    {
      invoiceNo: 'PI-0001',
      date: '09/04/2025',
      billingAddress: 'Mr. Rajinikanth Ch, Hyderabad, Telangana',
      shippingAddress: 'Mr. Rajinikanth Ch, Hyderabad, Telangana',
      gstin: '36BGCPK4323N1ZF',
      pan: 'BGCPK4323N',
      signedBy: 'MINAD INFOTECH',
      totalAmount: 9440,
      amountInWords: 'Nine Thousand Four Hundred Forty Rupees Only',
      items: [
        {
          package: 'Website Development (1 Year)',
          hsn: '998314',
          period: '01/04/2025 - 31/03/2026',
          amount: 8000,
          cgst: 720,
          sgst: 720,
          total: 9440
        }
      ]
    },
    {
      invoiceNo: 'PI-0002',
      date: '02/04/2025',
      billingAddress: 'Ms. Priya Sinha, Mumbai, Maharashtra',
      shippingAddress: 'Ms. Priya Sinha, Mumbai, Maharashtra',
      gstin: '27ASDFP4323K1ZV',
      pan: 'ASDFP4323K',
      signedBy: 'MINAD INFOTECH',
      totalAmount: 11800,
      amountInWords: 'Eleven Thousand Eight Hundred Rupees Only',
      items: [
        {
          package: 'Mobile App Design & API Integration',
          hsn: '998316',
          period: '01/04/2025 - 31/07/2025',
          amount: 10000,
          cgst: 900,
          sgst: 900,
          total: 11800
        }
      ]
    },
    {
      invoiceNo: 'PI-0003',
      date: '27/03/2025',
      billingAddress: 'Mr. Arjun Verma, Bengaluru, Karnataka',
      shippingAddress: 'Mr. Arjun Verma, Bengaluru, Karnataka',
      gstin: '29QWERT1234R1ZP',
      pan: 'QWERT1234R',
      signedBy: 'MINAD INFOTECH',
      totalAmount: 5310,
      amountInWords: 'Five Thousand Three Hundred Ten Rupees Only',
      items: [
        {
          package: 'Domain + Hosting Renewal (1 Year)',
          hsn: '998365',
          period: '01/04/2025 - 31/03/2026',
          amount: 4500,
          cgst: 405,
          sgst: 405,
          total: 5310
        }
      ]
    }
  ];
  
  getAllInvoices() {
    return this.invoices;
  }
  
  getInvoice(invoiceNo: string) {
    return this.invoices.find(i => i.invoiceNo === invoiceNo);
  }
  
}
