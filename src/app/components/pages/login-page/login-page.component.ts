import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { StudentServiceService } from 'src/app/Services/student-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginData = {
    employeeId: '',
    password: ''
  };
  rememberMe = false;
  rememberMeError = '';

  constructor(private router: Router, private service: StudentServiceService, private auth: AuthService) {}

  ngOnInit(): void {
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
  
    this.service.login(this.loginData).subscribe(
      (data: any) => {
        const jwtToken = data.jwtToken;
        const employee = data.employee;
        const status=employee.loginStatus;
        const role = employee.roles[0].roleName;
        console.log(jwtToken);
        console.log(role);
  
        this.auth.setToken(jwtToken);
        this.auth.setRoles([role]);
        this.auth.setEmployeeId(employee.employeeId);
  
        this.redirectBasedOnRole(role,status);
      },
      (error: any) => {
        console.error('Login error:', error);
        this.showErrorPopup('Invalid Credentials');
      }
    );
  }
  

  showErrorPopup(message: string) {
    alert(message);
  }

  // redirectBasedOnRole(role: string,status:string) {
  //   switch (role) {
  //     case 'Admin':
  //       alert('Welcome Admin');
  //       this.router.navigate(['/admin-dashboard']);
  //       break;
  //     case 'Employee':
  //       if(status==='active'){
  //         alert('Welcome Employee');
  //       this.router.navigate(['/user-dashboard']);
  //       }else{
  //         this.router.navigate(['/login']);
  //       }
  //       break;
  //     default:
  //       alert('Invalid Role');
  //   }
  // }




  
  // redirectBasedOnRole(role: string, loginStatus: string) {
  //   if (role === 'Admin') {
  //     // Admin logic doesn't consider loginStatus
  //     alert('Welcome Admin');
  //     this.router.navigate(['/admin-dashboard']);
  //   } 
  
  //   if (role === 'Employee') {
  //     // Employee logic checks loginStatus
  //     if (loginStatus === 'Active') {
  //       alert('Welcome Employee');
  //       this.router.navigate(['/user-dashboard']);
  //     } else {
  //       alert('Your account is deactivated. Redirecting to login...');
  //       this.router.navigate(['/login']);
  //     }
  //   } else {
  //     // Handle invalid or other roles
  //     alert('Invalid Role');
  //     this.router.navigate(['/login']);
  //   }
  // }
  
  redirectBasedOnRole(role: string, loginStatus: string) {
    if (role === 'Admin') {
      // Admin logic doesn't consider loginStatus
      alert('Welcome Admin');
      this.router.navigate(['/admin-dashboard']);
    } else if (role === 'Employee') {
      // Employee logic checks loginStatus
      if (loginStatus === 'Active') {
        alert('Welcome Employee');
        this.router.navigate(['/user-dashboard']);
      } else {
        alert('Your account is deactivated. Redirecting to login...');
        this.router.navigate(['/login']);
      }


    } else if(role === 'Staff'){
      alert('Welcome Staff Member')
       this.router.navigate(['/instructor-dashboard'])
    }
    
    
    else {
      // Handle invalid or other roles
      alert('Invalid Role');
      this.router.navigate(['/login']);
    }
  }
  




}
