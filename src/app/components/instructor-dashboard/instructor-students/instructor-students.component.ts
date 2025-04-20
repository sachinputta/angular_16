import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from 'src/app/Services/student-service.service';
import { Employee } from '../../Modals/employee';
import { EducationalDetails } from '../../Modals/educational-details'; // Import EducationalDetails model

@Component({
  selector: 'app-instructor-students',
  templateUrl: './instructor-students.component.html',
  styleUrls: ['./instructor-students.component.scss']
})
export class InstructorStudentsComponent implements OnInit {

  employees: Employee[] = [];
  errorMessage: string = '';
  selectedEmployeeId: string = '';  // Store the selected employee's ID
  educationalDetails: EducationalDetails = { degree: '', university: '', yearOfPassing: 0, grade: 0 };  // Initialize the form
  showModal: boolean = false;  // Control visibility of the modal

  constructor(private service: StudentServiceService) { }

  ngOnInit(): void {
    this.getList();  // Fetch employees on init
  }

  // Fetch list of employees
  getList(): void {
    this.service.getAllEmployees().subscribe(
      (data) => {
        this.employees = data;
        console.log(this.employees);
      },
      (error) => {
        this.errorMessage = 'Error fetching employee data. Please try again later.';
        console.error(error);
      }
    );
  }

  // Open modal to add/edit educational details for selected employee
  openEducationModal(employee: Employee): void {
    this.selectedEmployeeId = employee.employeeId;  // Set the selected employee's ID
    this.educationalDetails = { degree: '', university: '', yearOfPassing: 0, grade: 0 };  // Reset form
    this.showModal = true;  // Show modal

    // Fetch the existing educational details for the employee if any
    this.service.getEducationalDetails(this.selectedEmployeeId).subscribe(
      (data) => {
        if (data) {
          this.educationalDetails = data;  // Populate form with existing details
        }
      },
      (error) => {
        console.error('Error fetching educational details:', error);
      }
    );
  }

  // Close modal
  closeModal(): void {
    this.showModal = false;  // Hide modal
  }

  // Submit the educational details
  submitEducationalDetails(): void {
    // Check if the employee ID is selected
    if (!this.selectedEmployeeId) {
      this.errorMessage = 'Please select an employee.';
      return;
    }

    // Log the values to ensure they are correctly initialized
    console.log('Employee ID:', this.selectedEmployeeId);
    console.log('Educational Details:', this.educationalDetails);

    // Make the service call to add or update educational details
    this.service.addOrUpdateEducationalDetails(this.selectedEmployeeId, this.educationalDetails).subscribe(
      (response) => {
        // Log success response
        console.log('Educational details added/updated successfully:', response);

        // Close the modal and reset the error message
        this.closeModal();
        this.errorMessage = '';
      },
      (error) => {
        // Log the error response
        console.error('Error updating educational details:', error);

        // Display a user-friendly error message
        this.errorMessage = 'Error updating educational details. Please try again later.';
      }
    );
  }
}
