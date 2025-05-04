
export interface User {
    customerId: string;
    companyName: string;
    customerEmail: string;
    phoneNumber: number;
    address: string;
    state: string;
    pan: string;
    gstin: string;
    cin: string;
    roles: { roleName: string }[];
  }
  
  export interface LoginResponse {
    jwtToken: string;
    customer: User;
    customerId: string;
  }