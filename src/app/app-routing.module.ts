import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeDemoThreeComponent } from './components/pages/home-demo-three/home-demo-three.component';
import { HomeDemoTwoComponent } from './components/pages/home-demo-two/home-demo-two.component';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RoleGuard } from './Guards/role.guard';
import { ItemspageComponent } from './components/itemspage/itemspage.component';
import { CustomersComponent } from './components/customers/customers.component';
import { AllcustomersComponent } from './components/allcustomers/allcustomers.component';
import { WelcomepageComponent } from './components/welcomepage/welcomepage.component';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { AllquotesComponent } from './components/allquotes/allquotes.component';
import { ProformaInvoiceListComponent } from './components/proforma-invoice-list/proforma-invoice-list.component';
import { ProformaInvoiceDetailComponent } from './components/proforma-invoice-detail/proforma-invoice-detail.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

const routes: Routes = [
    // {path: '', component: HomeDemoThreeComponent},
    // {path: 'index-2', component: HomeDemoTwoComponent},
    // {path: 'index-3', component: HomeDemoThreeComponent},

    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    {
      path: 'customer-homepage', component: HomepageComponent,
      canActivate: [RoleGuard],
      data: { roles: ['Customer', 'ROLE_Customer'] }
    },
    {
      path: 'itemspage', component: ItemspageComponent,
      canActivate: [RoleGuard],
      data: { roles: ['Customer', 'ROLE_Customer'] }
    },
    {
      path: 'customers', component: CustomersComponent,
      canActivate: [RoleGuard],
      data: { roles: ['Customer', 'ROLE_Customer'] }
  
    },
    {
      path: 'allcustomers', component: AllcustomersComponent,
      canActivate: [RoleGuard],
      data: { roles: ['Customer', 'ROLE_Customer'] }
  
    },
    { path: 'welcomepage', component: WelcomepageComponent },
    {
      path: 'admin-homepage',
      component: AdminHomepageComponent,
      canActivate: [RoleGuard],
      data: { roles: ['Admin', 'ROLE_ADMIN'] }
    },
    {
      path: 'allquotes', component: AllquotesComponent,
      canActivate: [RoleGuard],
      data: { roles: ['Customer', 'ROLE_Customer'] }
    },
    {
      path: 'proformas', component: ProformaInvoiceListComponent,
      canActivate: [RoleGuard],
      data: { roles: ['Customer', 'ROLE_Customer'] }
    },
    {
      path: 'proforma/:invoiceNo', component: ProformaInvoiceDetailComponent,
      canActivate: [RoleGuard],
      data: { roles: ['Customer', 'ROLE_Customer'] }
    },
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: '', redirectTo: '/welcomepage', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }