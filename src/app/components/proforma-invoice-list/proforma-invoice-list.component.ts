import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/customer.service';
import { ProformaInvoice } from 'src/app/Modals/proforma-invoice';
import { ProformaInvoiceService } from 'src/app/Services/proforma-invoice.service';

@Component({
  selector: 'app-proforma-invoice-list',
  templateUrl: './proforma-invoice-list.component.html',
  styleUrls: ['./proforma-invoice-list.component.scss']
})
export class ProformaInvoiceListComponent implements OnInit {

  invoices: ProformaInvoice[] = [];
  selectedInvoice: ProformaInvoice | null = null;

  selectedCustomer: any;
  customers: any[] = [];
  filteredProformaInvoices: ProformaInvoice[] = [];
  showProformaModal = false;

  selectedProformaCode: string | null = null;
  // selectedProformaInvoice: ProformaInvoice | null = null;


  newInvoice = {
    customerEmail: '',
    customerId: '',
    customerName: '',
    technology: '',
    items: [
      {
        itemPackage: '',
        transactionDate: '',
        periodFrom: '',
        periodTo: '',
        hscSac: '',
        charges: 0,
        discount: 0,
        total: 0
      }
    ]
  };

  constructor(private invoiceService: ProformaInvoiceService,
    private customerService: CustomerService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // this.invoices = this.invoiceService.getAllInvoices();
    const customerId = sessionStorage.getItem('customerId');
    if (customerId) {
      this.getCustomerNamesById(customerId);
      this.newInvoice.customerId = customerId;
      this.loadProformaInvoicesForCustomer(customerId);
    } else {
      console.warn('No customerId found in sessionStorage');
    }
  }

  selectInvoice(invoice: ProformaInvoice) {
    this.selectedInvoice = invoice;
    console.log('Selected Invoice:', this.selectedInvoice);
  }



  addProformaItem() {
    this.newInvoice.items.push({
      itemPackage: '',
      transactionDate: '',
      periodFrom: '',
      periodTo: '',
      hscSac: '',
      charges: 0,
      discount: 0,
      total: 0
    });
  }


  getCustomerNamesById(customerId: string) {
    this.customerService.getRegistrationsByCustomerId(customerId).subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: (err) => {
        console.error('Error fetching customer registration', err);
      }
    });
  }



  onCustomerChange() {
    if (this.selectedCustomer) {
      this.newInvoice.customerName = `${this.selectedCustomer.firstName} ${this.selectedCustomer.lastName}`;
      this.newInvoice.customerEmail = this.selectedCustomer.customerEmail;
    }
  }

  getItemTotal(item: any): number {
    const charges = item.charges || 0;
    const discount = item.discount || 0;
    return charges - discount;
  }

  onChargesChange(item: any, index: number) {
    if (item.discount > item.charges) {
      item.discount = item.charges;
    }
    this.calculateItemTotal(index);
  }
  
  onDiscountChange(item: any, index: number) {
    if (item.discount > item.charges) {
      item.discount = item.charges;
    }
    this.calculateItemTotal(index);
  }
  

  removeProformaItem(index: number) {
    if (this.newInvoice.items.length > 1) {
      this.newInvoice.items.splice(index, 1);  // Remove the item at the specified index
    } else {
      alert('At least one item must be present.');
    }
  }



  createNewInvoice() {
    const customerId = sessionStorage.getItem('customerId');

    if (customerId) {
      this.newInvoice.customerId = customerId;
      console.log('Creating Proforma Invoice with the following data:', this.newInvoice);

      this.customerService.createProformaInvoice(this.newInvoice).subscribe({
        next: (response) => {
          alert('Proforma Invoice created successfully!');
          this.loadProformaInvoicesForCustomer(customerId);
          this.closeProformaModal();
        },
        error: (err) => {
          console.error('Error creating Proforma Invoice:', err);
          alert('Failed to create Proforma Invoice');
        }
      });
    } else {
      console.error('Customer ID is not found in local storage');
      alert('Customer ID is missing. Please log in again.');
    }
  }


  openModal() {
    this.showProformaModal = true;
    this.newInvoice = {
      customerEmail: '',
      technology:'',
      customerId: '',
      customerName: '',
      items: [
        {
          itemPackage: '',
          transactionDate: '',
          periodFrom: '',
          periodTo: '',
          hscSac: '',
          charges: 0,
          discount: 0,
          total: 0
        }
      ]
    };
  }


  closeProformaModal() {
    this.showProformaModal = false;
  }

  calculateItemTotal(index: number) {
    const item = this.newInvoice.items[index];
    const charges = item.charges || 0;
    const discount = item.discount || 0;
    item.total = charges - discount;
  }


  loadProformaInvoicesForCustomer(customerId: string): void {
    this.customerService.getProformaInvoicesByCustomer(customerId).subscribe({
      next: (invoices) => {
        console.log('Proforma Invoices received:', invoices);
        this.filteredProformaInvoices = invoices.map(invoice => {
          const totalAmount = invoice.items?.reduce((sum: any, item: { netCharges: any; }) => sum + (item.netCharges || 0), 0) || 0;
          return { ...invoice, totalAmount };
        });
        console.log('Filtered Proforma Invoices:', this.filteredProformaInvoices);
      },
      error: (err) => {
        console.error('Error fetching Proforma Invoices:', err);
      }
    });
  }


  // selectQuote(proformaCode: string): void {
  //   console.log('selectQuote called with proformaCode:', proformaCode);

  //   this.selectedProformaCode = proformaCode;

  //   this.selectedProformaInvoice = this.filteredProformaInvoices.find(
  //     invoice => invoice.proformaCode === proformaCode
  //   ) || null;

  //   console.log('Selected Proforma Invoice:', this.selectedProformaInvoice);
  // }


}
