import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  // public userLogout() {
  //   this.router.navigate(['/login']);
  //   localStorage.removeItem('jwtToken');
  //   sessionStorage.clear();
  //   localStorage.clear();
  // }

  // public setToken(token: string) {
  //   localStorage.setItem('jwtToken', token);
    
  // }

  // public getToken(): string | null {
  //   return localStorage.getItem('jwtToken');
  // }

  // public setRoles(roles: any[]) {
  //   localStorage.setItem('roles', JSON.stringify(roles));
  // }

  // public getRoles(): any[] {
  //   const rolesString = localStorage.getItem('roles');
  //   return rolesString ? JSON.parse(rolesString) : [];
  // }

  // public setName(name: string) {
  //   localStorage.setItem('name', name);
  // }

  // public getName(): any {
  //   return localStorage.getItem('name');
  // }

  // public setEmployeeId(employeeId: string) {
  //   localStorage.setItem('employeeId', employeeId);
  // }

  // public getEmployeeId(): any {
  //   return localStorage.getItem('employeeId');
  // }

  // public isLoggedIn() {
  //   return this.getRoles() && this.getToken();
  // }
  // getAuthToken(): string {
  //   return localStorage.getItem('authToken') || ''; // Ensure the token is retrieved correctly
  // }



  // -----------------------------------------------------------------

  

  public userLogout() {
    this.router.navigate(['/login']);
    sessionStorage.clear(); // Use only sessionStorage to clear all session data
  }

  public setToken(token: string) {
    sessionStorage.setItem('jwtToken', token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem('jwtToken'); // Retrieve from sessionStorage
  }

  public setRoles(roles: any[]) {
    sessionStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): any[] {
    const rolesString = sessionStorage.getItem('roles');
    return rolesString ? JSON.parse(rolesString) : [];
  }

  public setName(name: string) {
    sessionStorage.setItem('name', name);
  }

  public getName(): any {
    return sessionStorage.getItem('name');
  }

  public setEmployeeId(employeeId: string) {
    sessionStorage.setItem('employeeId', employeeId);
  }

  public getEmployeeId(): any {
    return sessionStorage.getItem('employeeId');
  }

  public isLoggedIn() {
    return this.getRoles().length > 0 && this.getToken() !== null;
  }

  getAuthToken(): string {
    return sessionStorage.getItem('jwtToken') || ''; // Retrieve from sessionStorage
  }


}
