import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/customer.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  customerId = '';
  customerPassword = '';
  isLoading = false;
  loginError = '';

  constructor(private customerService: CustomerService, private authService: AuthService, private router: Router) { }


  onLogin(): void {
    this.isLoading = true;

    this.authService.login(this.customerId, this.customerPassword).subscribe({
      next: (res) => {
        this.authService.storeToken(res.jwtToken);


        // Store the customerId in sessionStorage
        const customerId = res.customer.customerId; 
        sessionStorage.setItem('customerId', customerId);

        const role = res.customer.roles[0].roleName;
        sessionStorage.setItem('role', role);

        this.loginError = '';
        this.isLoading = false;

        if (role === 'Admin') {
          this.router.navigate(['/admin-homepage']);
        } else if (role === 'Customer') {
          this.router.navigate(['/customer-homepage']);
        } else {
          this.router.navigate(['/unauthorized']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 401) {
          this.loginError = 'Invalid username or password';
        } else if (err.status === 403) {
          this.loginError = 'Your account is disabled. Contact admin.';
        } else {
          this.loginError = 'Something went wrong. Try again later.';
        }
      }
    });
  }
}
