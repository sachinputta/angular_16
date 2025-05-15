import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CustomerService, EmailRequest } from 'src/app/customer.service';
import { ProformaInvoice } from 'src/app/Modals/proforma-invoice';
// import * as html2pdf from 'html2pdf.js';
import html2pdf from 'html2pdf.js';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-proforma-invoice-detail',
  templateUrl: './proforma-invoice-detail.component.html',
  styleUrls: ['./proforma-invoice-detail.component.scss']
})
export class ProformaInvoiceDetailComponent implements OnChanges {
  @Input() invoice: ProformaInvoice | null = null;
  @ViewChild('invoiceContent', { static: false }) invoiceContent!: ElementRef;

 emailData: EmailRequest = {
    toEmail: '',
    subject: '',
    message: '',
  };
  customerProfile: any = null;
 

  constructor(private http: HttpClient,private customerService: CustomerService) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['invoice'] && this.invoice?.customerId) {
      console.log('Incoming invoice:', this.invoice);
      this.fetchCustomerProfile(this.invoice.customerId);
    }
  }

printInvoiceAsPDF(): void {
  const element = this.invoiceContent.nativeElement;

  const options = {
    margin: 0.5,
    filename: `${this.invoice?.proformaCode || 'invoice'}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().from(element).set(options).save();
}

  // new Send-by-Email method
  sendInvoiceEmail() {
    if (!this.invoice?.proformaCode) {
      return alert('No invoice selected.');
    }
    this.customerService
      .sendInvoiceEmail(this.invoice.proformaCode)
      .subscribe({
        next: () => alert('Email sent successfully!'),
        error: () => alert('Failed to send email.'),
      });
  }



  get totalCharges(): number {
    if (!this.invoice || !this.invoice.items) return 0;
    return this.invoice.items.reduce((sum, item) => sum + (item.netCharges || 0), 0);
  }

  get cgst(): number {
    return this.totalCharges * 0.09; // 9% CGST
  }

  get sgst(): number {
    return this.totalCharges * 0.09; // 9% SGST
  }

  get totalPayable(): number {
    return this.totalCharges + this.cgst + this.sgst;
  }

  fetchCustomerProfile(customerId: string): void {
    this.customerService.getCustomerProfile(customerId).subscribe({
      next: (profile) => {
        // console.log('Customer profile:', profile);
        this.customerProfile = profile;
      },
      error: (err) => {
        console.error('Failed to fetch customer profile:', err);
        this.customerProfile = null; // Fallback to avoid breaking the UI
      }
    });
  }


}
