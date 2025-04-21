import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/customer.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  
  companyName: string = '';
  companyEmail: string = '';
  customerId: string = '';

  constructor(private customerService: CustomerService,private auth: AuthService) { }

  ngOnInit(): void {
    this.customerId = this.auth.getCustomerId()!;

    this.customerService.getCustomerProfile(this.customerId).subscribe(
      (res) => {
        this.companyName = res.companyName;
        this.companyEmail = res.customerEmail;
      },
      (err) => {
        console.error('Failed to load profile:', err);
      }
    );
  }

  getCompanySuffixName(name: string): string {
    if (!name) return 'Accounting';
    const firstWord = name.trim().split(' ')[0];
    return `${firstWord} ACCOUNTING`;
  }
  

}
