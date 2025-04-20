import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from 'src/app/Services/student-service.service';
import { StudentEnrollment } from '../../Modals/student-enrollment';

@Component({
    selector: 'app-admin-courses',
    templateUrl: './admin-courses.component.html',
    styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent implements OnInit {

    student: StudentEnrollment = new StudentEnrollment();

    constructor(private studentService: StudentServiceService) {}
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
  
    register() {
      this.studentService.registerStudent(this.student).subscribe(
        (response) => {
          console.log('Student registered successfully!', response);
          alert('Student registered successfully!'); // Simple pop-up alert
          window.location.reload(); // Reload the page to reset the form
         
        },
        (error) => {
          console.error('Error registering student!', error);
          alert('Error registering student! Please try again.');
        }
      );
    }
  

}