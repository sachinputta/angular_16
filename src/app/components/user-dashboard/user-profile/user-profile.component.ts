import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private auth:AuthService) { }


  name:string

  emails:string
  ngOnInit(): void {
  }

      getUserdetails(){
       this.name= this.auth.getName();
       this.emails=this.auth.getEmployeeId();
      }


}
