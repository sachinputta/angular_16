// src/app/models/user.ts
export interface User {
    customerId: string;
    companyName: string;
    // lastName: string;
    customerEmail: string;
    phoneNumber: number;
    address: string;
    state: string;
    roles: { roleName: string }[];
  }
  
  export interface LoginResponse {
    jwtToken: string;
    customer: User;
    customerId: string;
  }