import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CustomerService } from 'src/app/customer.service';
import { ProformaInvoice } from 'src/app/Modals/proforma-invoice';

@Component({
  selector: 'app-proforma-invoice-detail',
  templateUrl: './proforma-invoice-detail.component.html',
  styleUrls: ['./proforma-invoice-detail.component.scss']
})
export class ProformaInvoiceDetailComponent implements OnChanges {
  @Input() invoice: ProformaInvoice | null = null;

  customerProfile: any = null;

  constructor(private customerService: CustomerService) {}


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['invoice'] && this.invoice?.customerId) {
      console.log('Incoming invoice:', this.invoice);
      this.fetchCustomerProfile(this.invoice.customerId);
    }
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
