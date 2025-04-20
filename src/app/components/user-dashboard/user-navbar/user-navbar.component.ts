import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
    selector: 'app-user-navbar',
    templateUrl: './user-navbar.component.html',
    styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent implements OnInit {

    constructor(private auth:AuthService) { }
 
    email:string;
    ngOnInit(): void {

       this.email= this.auth.getEmployeeId();
       console.log(this.email)
    }








    switcherClassApplied = false;
    switcherToggleClass() {
        this.switcherClassApplied = !this.switcherClassApplied;
    }

    sidebarSwitcherClassApplied = false;
    sidebarSwitcherToggleClass() {
        this.sidebarSwitcherClassApplied = !this.sidebarSwitcherClassApplied;
    }

}