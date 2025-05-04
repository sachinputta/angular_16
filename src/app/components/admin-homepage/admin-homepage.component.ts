import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/customer.service';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.scss']
})
export class AdminHomepageComponent implements OnInit {

  customerCount: number = 0;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.customerCount = customers.length; // Set the count based on response length
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
      }
    });
  }

}
