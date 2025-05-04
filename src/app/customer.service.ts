import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { CustomerRegistration } from './Modals/CustomerRegistration';
import { AuthService } from './Services/auth.service';
import { Quote } from './Modals/quote';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'http://localhost:8080';
  // private baseUrl = 'https://taxapp1-9e3fb338382d.herokuapp.com';



  constructor(private http: HttpClient, private auth: AuthService) { }

  registerCustomer(customer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addCustomer`, customer);
  }


  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAllItems`, {
      headers: this.auth.getAuthHeaders()
    });
  }

  getItemsByCustomerId(customerId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getItemsByCustomer/${customerId}`);
  }

  createItem(item: any): Observable<any> {
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



  // Register a new customer
  customerRegistration(customer: CustomerRegistration): Observable<CustomerRegistration> {
    const customerId = customer.customerId;
    return this.http.post<CustomerRegistration>(`${this.baseUrl}/registerCustomer/${customerId}`, customer, {
      headers: this.auth.getAuthHeaders(),
      responseType: 'json'
    });
  }


  // Customer Service
  deleteRegisterCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteRegisterCustomer/${id}`, { responseType: 'text' as 'json' });
  }




  // Update a registered customer 
  updateRegisterCustomer(registrationId: number, customer: CustomerRegistration): Observable<CustomerRegistration> {
    const headers = this.auth.getAuthHeaders();
    return this.http.put<CustomerRegistration>(`${this.baseUrl}/updateRegisterCustomer/${registrationId}`, customer, { headers });
  }


  // Get registrations by customerId
  getRegistrationsByCustomerId(customerId: string): Observable<CustomerRegistration[]> {
    return this.http.get<CustomerRegistration[]>(`${this.baseUrl}/getCustomerRegistration/${customerId}`);
  }


  // Method to get customer registration by registrationId
  viewCustomerRegistration(registrationId: number): Observable<CustomerRegistration> {
    return this.http.get<CustomerRegistration>(`${this.baseUrl}/viewRegisterCustomer/${registrationId}`);
  }


  // Method to create a quote
  createQuote(newQuote: Quote): Observable<any> {
    const url = `${this.baseUrl}/createQuote`;
    return this.http.post<any>(url, newQuote);
  }

  getQuotesByCustomer(email: string): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.baseUrl}/quotes/customer/${email}`);
  }


    // Get customers with the 'Customer' role by admin
    getCustomers(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/role-customers`);
    }

    createProformaInvoice(invoiceData: any): Observable<any> {
      const token = this.auth.getToken();  // Reuse your existing token retrieval logic
      console.log('Token:', token);        // Optional: helpful for debugging
    
      return this.http.post(`${this.baseUrl}/proforma-Invoice/create`,
        invoiceData,
        {
          headers: new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }),
          responseType: 'json'
        }
      );
    }
    

    getProformaInvoicesByCustomer(email: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/performa-invoice/customer/${email}`);
    }
    
    
}
