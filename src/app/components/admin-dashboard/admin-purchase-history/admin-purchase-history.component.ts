import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../Modals/transaction';
import { StudentServiceService } from 'src/app/Services/student-service.service';

@Component({
  selector: 'app-admin-purchase-history',
  templateUrl: './admin-purchase-history.component.html',
  styleUrls: ['./admin-purchase-history.component.scss']
})
export class AdminPurchaseHistoryComponent implements OnInit {



  ngOnInit(): void {
  }


  transaction: Transaction = new Transaction();  // Initialize the transaction model
  isSubmitting: boolean = false;  // To show loading state when submitting the form

  constructor(private transactionService: StudentServiceService) { }

  // Handle form submission
  onSubmit(): void {
    this.isSubmitting = true;  // Show loading state

    this.transactionService.saveTransaction(this.transaction).subscribe(
      (response) => {
        console.log('Transaction saved successfully!', response);
        this.resetForm();  // Reset the form after successful submission
      },
      (error) => {
        console.error('Error saving transaction!', error);
        this.isSubmitting = false;  // Hide loading state on error
      }
    );
  }

  // Reset the form fields after submission
  resetForm(): void {
    this.transaction = new Transaction();  // Create a new empty transaction object
    this.isSubmitting = false;
  }
}
