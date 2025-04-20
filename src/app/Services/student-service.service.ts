import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../components/Modals/employee';
import { EducationalDetails } from '../components/Modals/educational-details';
import { StudentEnrollment } from '../components/Modals/student-enrollment';
import { Transaction } from '../components/Modals/transaction';

@Injectable({
  providedIn: 'root'
})


export class StudentServiceService {

  
  // private apiUrl = 'http://localhost:8080';

  private apiUrl = 'https://mybackendd-f58a90d206db.herokuapp.com';
  
  



  

  constructor(private http: HttpClient) { }

  registerEmployee(employee:Employee,roleName:string): Observable<any> {
    return this.http.post(`${this.apiUrl}/addEmployee/${roleName}`, employee);
  }

  login(data: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, data);
  }


  getAllEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAllEmployes`);
  }




   // Method to add or update educational details
   addOrUpdateEducationalDetails(employeeId: string, educationalDetails: EducationalDetails): Observable<EducationalDetails> {
    return this.http.post<EducationalDetails>(`${this.apiUrl}/addEduaction/${employeeId}`, educationalDetails);
  }

  // Method to get educational details for an employee
  getEducationalDetails(employeeId: string): Observable<EducationalDetails> {
    return this.http.get<EducationalDetails>(`${this.apiUrl}/getEducatonal/${employeeId}`);
  }










  // --------------------------------------------------------------------
  registerStudent(student: StudentEnrollment): Observable<StudentEnrollment> {
    return this.http.post<StudentEnrollment>(`${this.apiUrl}/register`, student);
  }



  // Create or update a transaction
  saveTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/addTrasaction`, transaction);
  }
}
