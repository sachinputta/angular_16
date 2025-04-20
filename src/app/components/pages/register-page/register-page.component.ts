import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentServiceService } from 'src/app/Services/student-service.service';
import { Employee } from '../../Modals/employee';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  courseList = [
    { name: 'Core Java', courseAmount: 5000 },
    { name: 'Angular', courseAmount: 7000 },
    { name: 'Spring Boot', courseAmount: 8000 },
    { name: 'Full Stack Development', courseAmount: 12000 }
  ];

  enrollmentForm: FormGroup;
  employee: Employee = new Employee();
  popupMessage: string | null = null;
  textcolor: string;
  popupIcon: SafeHtml;
  popupTitle: string = '';
  popupType: string = '';
  tickIcon: SafeHtml;
  errorIcon: SafeHtml;
  isSuccess: boolean;
  selectedCourseAmount: number; // Amount for the selected course
  remainingAmount: number; // Remaining amount to be paid
  isCashAmountExceeded = false; // Flag for cash amount validation
  batchTimingList: string[] = [
    'Morning (8:00 AM - 10:00 AM)',
    'Afternoon (12:00 PM - 2:00 PM)',
    'Evening (6:00 PM - 8:00 PM)',
    'Weekend (10:00 AM - 1:00 PM)'
  ];

  constructor(
    private fb: FormBuilder, 
    private studentService: StudentServiceService,
    private sanitizer: DomSanitizer
  ) {
    this.tickIcon = this.sanitizer.bypassSecurityTrustHtml('&#x2713;');
    this.errorIcon = this.sanitizer.bypassSecurityTrustHtml('&#10008;');
  }

  ngOnInit(): void {
    this.enrollmentForm = this.fb.group({
      fullName: ['', Validators.required],
      enrollmentNumber: ['', Validators.required],
      course: ['', Validators.required],
      // courseAmount: [{ value: '', disabled: true }, Validators.required],
      courseAmount: ['', Validators.required],
      feeOption: ['', Validators.required],
      paymentMethod: [''],
      cashAmount: [''],
      transactionId: [''],
      transactionAmount: [''],
      // imagePath: [null, Validators.required],
      deadlineDate: ['', Validators.required], // Ensure this field is present
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      employeeId: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required]],
      password: ['12345', [Validators.required]] ,// Default value set here
      address: ['', Validators.required],
      batchTiming: ['', Validators.required],
    });
  }

  onCourseChange() {
    const selectedCourse = this.courseList.find(
      course => course.name === this.enrollmentForm.get('course')?.value
    );
    if (selectedCourse) {
      this.enrollmentForm.patchValue({ courseAmount: selectedCourse.courseAmount });
    }

    if (selectedCourse) {
      this.selectedCourseAmount = selectedCourse.courseAmount;
      this.enrollmentForm.patchValue({ courseAmount: this.selectedCourseAmount });
      this.remainingAmount = this.selectedCourseAmount;
    }
  }

   // Validates the cash amount entered
   validateCashAmount(event: Event): void {
    const enteredAmount = +(event.target as HTMLInputElement).value;

    if (enteredAmount > this.selectedCourseAmount!) {
      this.isCashAmountExceeded = true;
      this.remainingAmount = this.selectedCourseAmount;
    } else {
      this.isCashAmountExceeded = false;
      this.remainingAmount = this.selectedCourseAmount! - enteredAmount;
    }
  }

  // Method to check if 'Pay Now' is selected
  isPayNowSelected(): boolean {
    return this.enrollmentForm.get('feeOption')?.value === 'now';
  }

  // Method to check if 'Set Deadline' is selected
  isDeadlineSelected(): boolean {
    return this.enrollmentForm.get('feeOption')?.value === 'deadlineDate';
  }

  // Method to check if 'Cash' is selected under 'Pay Now'
  isCashSelected(): boolean {
    return this.enrollmentForm.get('paymentMethod')?.value === 'cash';
  }

  // Method to check if 'Phone Pay' is selected under 'Pay Now'
  isPhonePaySelected(): boolean {
    return this.enrollmentForm.get('paymentMethod')?.value === 'phonepay';
  }

  // Form validation check
  isFormValid(): boolean {
    if (this.isPayNowSelected()) {
      const paymentMethod = this.enrollmentForm.get('paymentMethod')?.value;
      if (paymentMethod === 'cash') {
        return this.enrollmentForm.valid && !!this.enrollmentForm.get('cashAmount')?.value;
      } else if (paymentMethod === 'phonepay') {
        return this.enrollmentForm.valid && !!this.enrollmentForm.get('transactionId')?.value;
      }
    } else if (this.isDeadlineSelected()) {
      return this.enrollmentForm.valid && !!this.enrollmentForm.get('deadlineDate')?.value;
    }
    return this.enrollmentForm.valid;
  }

  onFeeOptionChange() {
    const feeOption = this.enrollmentForm.get('feeOption')?.value;
  
    // Clear validators and reset values for all fee-related fields
    this.enrollmentForm.get('deadlineDate')?.clearValidators();
    this.enrollmentForm.get('paymentMethod')?.clearValidators();
    this.enrollmentForm.get('cashAmount')?.clearValidators();
    this.enrollmentForm.get('transactionId')?.clearValidators();
  
    this.enrollmentForm.get('paymentMethod')?.reset();
    this.enrollmentForm.get('transactionAmount')?.reset();
    this.enrollmentForm.get('transactionId')?.reset();
  
    if (feeOption === 'deadline') {
      // Apply validators for 'Set Deadline'
      this.enrollmentForm.get('deadlineDate')?.setValidators([Validators.required]);
    } else if (feeOption === 'now') {
      // Apply validators for 'Pay Now'
      this.enrollmentForm.get('paymentMethod')?.setValidators([Validators.required]);
      const feeType = this.enrollmentForm.get('paymentMethod')?.value;
      if (feeType === 'cash') {
        this.enrollmentForm.get('cashAmount')?.setValidators([Validators.required]);
       
      } else if (feeType === 'phonepay') {
        this.enrollmentForm.get('transactionId')?.setValidators([Validators.required]);
        this.enrollmentForm.get('transactionAmount')?.setValidators([Validators.required]);
      }
      this.enrollmentForm.get('deadlineDate')?.setValidators([Validators.required]);
    }
  
    // Update all controls for revalidation
    this.enrollmentForm.get('deadlineDate')?.updateValueAndValidity();
    this.enrollmentForm.get('paymentMethod')?.updateValueAndValidity();
    this.enrollmentForm.get('cashAmount')?.updateValueAndValidity();
    this.enrollmentForm.get('transactionId')?.updateValueAndValidity();
    this.enrollmentForm.get('transactionAmount')?.updateValueAndValidity();
  }
  
  
  // Simplify submit button logic
  isSubmitDisabled(): boolean {
    return !this.isFormValid();
  }
  
  // Submit handler for form submission
  addEmployee() {
    if (this.isFormValid()) {
      const employee = this.enrollmentForm.value;
      console.log(employee);
      const roleName = 'Employee';
      console.log(roleName);

      employee.remainingAmount = this.remainingAmount;
      this.studentService.registerEmployee(employee, roleName).subscribe(
        (data) => {
          this.showSuccess("Employee Registered successfully, Thanks!");
          console.log('Employee Registered success..!!!', data);
          this.enrollmentForm.reset();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.showError("Please fill the RegisterForm with correct values");
      console.log(this.enrollmentForm.errors);
    }
  }












  

  // Popup messages for error and success
  showError(message: string) {
    this.popupType = 'error';
    this.popupIcon = this.errorIcon;
    this.popupTitle = 'Error';
    this.popupMessage = message;
    this.textcolor = 'red';
    this.isSuccess = false;
  }

  showSuccess(message: string) {
    this.popupType = 'success';
    this.popupIcon = this.tickIcon;
    this.popupTitle = 'Success';
    this.popupMessage = message;
    this.textcolor = '#1bbf72';
    this.isSuccess = true;
  }

  closePopup() {
    this.popupMessage = null;
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    console.log(file);
  }
  
}
