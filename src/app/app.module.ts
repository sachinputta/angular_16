import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountUpModule } from 'ngx-countup';
import { NgxScrollTopModule } from 'ngx-scrolltop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeDemoTwoComponent } from './components/pages/home-demo-two/home-demo-two.component';
import { HomeDemoThreeComponent } from './components/pages/home-demo-three/home-demo-three.component';


import { HometwoBannerComponent } from './components/pages/home-demo-two/hometwo-banner/hometwo-banner.component';

import { HomethreeBannerComponent } from './components/pages/home-demo-three/homethree-banner/homethree-banner.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './Guards/auth-interceptor.interceptor';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { AllcustomersComponent } from './components/allcustomers/allcustomers.component';
import { AllquotesComponent } from './components/allquotes/allquotes.component';
import { CustomersComponent } from './components/customers/customers.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ItemspageComponent } from './components/itemspage/itemspage.component';
import { LoginComponent } from './components/login/login.component';

import { ProformaInvoiceDetailComponent } from './components/proforma-invoice-detail/proforma-invoice-detail.component';
import { ProformaInvoiceListComponent } from './components/proforma-invoice-list/proforma-invoice-list.component';
import { QuoteComponent } from './components/quote/quote.component';
import { SignupComponent } from './components/signup/signup.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { WelcomepageComponent } from './components/welcomepage/welcomepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
@NgModule({
    declarations: [
        AppComponent,
        HomeDemoTwoComponent,
        HomeDemoThreeComponent,
        HometwoBannerComponent,
        HomethreeBannerComponent,
        AdminHomepageComponent,
        AllcustomersComponent,
        AllquotesComponent,
        CustomersComponent,
        HomepageComponent,
        ItemspageComponent,
        LoginComponent,
        NavbarComponent,
        ProformaInvoiceDetailComponent,
        ProformaInvoiceListComponent,
        QuoteComponent,
        SignupComponent,
        UnauthorizedComponent,
        WelcomepageComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CarouselModule,
        FormsModule,
        ReactiveFormsModule,
        NgxScrollTopModule,
        CountUpModule,
        HttpClientModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true }
    ],

    bootstrap: [AppComponent]
})
export class AppModule { }