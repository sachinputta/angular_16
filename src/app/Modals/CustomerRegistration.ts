export interface CustomerRegistration {
    // Customer Details
    customerId: string;
    customerType: string;
    salutation: string;
    firstName: string;
    lastName: string;
    customerName?: string; // Combined full name
    companyName: string;
    customerEmail: string;
    phoneNumber: string;
    mobileNumber: string;
  
    // Billing Address
    billingStreet: string;
    billingCity: string;
    billingState: string;
    billingCountry: string;
    billingZip: string;
  
    // Shipping Address
    shippingStreet: string;
    shippingCity: string;
    shippingState: string;
    shippingCountry: string;
    shippingZip: string;
  
    // Tax & Compliance
    taxId: string;
    pan: string;
    supplyState: string;
    currency: string;
  
    // Payment & Accounting
    paymentTerms: string;
    creditLimit: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    preferredPaymentMethod: string;
  
    // Additional Info
    websiteUrl: string;
    contactPersonName: string;
    contactPersonEmail: string;
    contactPersonPhone: string;
    notes: string;
  }
  