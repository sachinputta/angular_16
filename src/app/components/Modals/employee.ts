import { Role } from "./role";

export class Employee {

  employeeId: string;
  password: string;
  fullName: string;
  enrollmentNumber: string;
  dateOfEnrollment: Date;
  course: string;
  courseAmount:number;
  duration: number;
  feeOption: string;
  feeAdvance: number;
  deadlineDate: Date;
  status: string;
  mobileNumber: string;
  address: string;
  batchTiming: string;
  localDate: Date; // TypeScript uses `Date` for date objects

  // New fields
  paymentMethod: string; // e.g., "cash" or "phonepay"
  cashAmount: number; // `number` for numeric values
  transactionId: string;
  transactionAmount:number;
  paymentScreenshotPath: string;
  remainingAmount:number;
  loginStatus:string;

  imageBytes: Uint8Array; // Corresponds to Java `byte[]`
  imagePath: string;

  roles:Role[];
}
