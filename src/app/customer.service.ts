import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { CustomerRegistration } from './Modals/CustomerRegistration';
import { AuthService } from './Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  // private baseUrl = 'http://localhost:8080';
  private baseUrl = 'https://taxapp1-9e3fb338382d.herokuapp.com';



  constructor(private http: HttpClient, private auth: AuthService) { }

  registerCustomer(customer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addCustomer`, customer);
  }
  

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAllItems`, {
      headers: this.auth.getAuthHeaders()
    });
  }

  addItem(item: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/createItem`, item, {
      headers: this.auth.getAuthHeaders()
    });
  }

  updateItem(item: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateItem/${item.id}`, item, {
      headers: this.auth.getAuthHeaders()
    });
  }

  deleteItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteItem/${itemId}`, {
      headers: this.auth.getAuthHeaders(),
      responseType: 'text'
    });
  }

  changePassword(payload: any) {
    return this.http.post<any>(`${this.baseUrl}/change-password`, payload, {
      responseType: 'text' as 'json' // This fixes the JSON parse error
    });
  }


  // getCustomerProfile(customerId: string): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/get-profile-details`, { customerId }, {
  //     headers: this.auth.getAuthHeaders(),
  //     responseType: 'json'
  //   });
  // }

  getCustomerProfile(customerId: string): Observable<any> {
    const token = this.auth.getToken();  // Adjust this to get your token properly
    console.log('Token:', token);  // Log token to console
  
    return this.http.post(`${this.baseUrl}/get-profile-details`, 
      { customerId },
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }),
        responseType: 'json'
      }
    );
  }
  
  


  // UPDATE Profile
  updateCustomerProfile(customerId: string, customerData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update-profile/${customerId}`, customerData, {
      headers: this.auth.getAuthHeaders(),
      responseType: 'json'
    });
  }



  // all register customers
  getAllRegisteredCustomers(): Observable<CustomerRegistration[]> {
    return this.http.get<CustomerRegistration[]>(`${this.baseUrl}/get-All-Register-customers`);
  }

  deleteCustomer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteRegisterCustomer/${id}`);
  }

  // REGISTER Customer
newCustomerRegister(customer: CustomerRegistration): Observable<CustomerRegistration> {
  return this.http.post<CustomerRegistration>(`${this.baseUrl}/customer-register`, customer, {
    headers: this.auth.getAuthHeaders(),
    responseType: 'json'
  });
}
}
