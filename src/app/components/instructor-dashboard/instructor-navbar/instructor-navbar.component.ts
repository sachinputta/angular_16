import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
    selector: 'app-instructor-navbar',
    templateUrl: './instructor-navbar.component.html',
    styleUrls: ['./instructor-navbar.component.scss']
})
export class InstructorNavbarComponent implements OnInit {

    
    ngOnInit(): void {
    }


    constructor(private authService: AuthService) {}

  onLogout(): void {
    this.authService.userLogout();
  }





















    // --------------------------------------------------------------------
    switcherClassApplied = false;
    switcherToggleClass() {
        this.switcherClassApplied = !this.switcherClassApplied;
    }

    sidebarSwitcherClassApplied = false;
    sidebarSwitcherToggleClass() {
        this.sidebarSwitcherClassApplied = !this.sidebarSwitcherClassApplied;
    }

}