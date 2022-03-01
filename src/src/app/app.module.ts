import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginHomeComponent } from '../app/components/security/login-home/login-home.component'
import { NavMainHomeComponent } from './components/nav/nav-main-home/nav-main-home.component';
import { NavFooterHomeComponent } from './components/nav/nav-footer-home/nav-footer-home.component';
import { CardProviderHomeComponent } from './components/card-provider-home/card-provider-home.component';
import { ViewCardsHomeComponent } from './components/view-cards-home/view-cards-home.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DisplayProvidersComponent } from './components/display-providers/display-providers.component';
import { AddProvidersComponent } from './components/add-providers/add-providers.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { HttpClientModule } from '@angular/common/http'
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PasswordForgetHomeComponent } from './components/security/password-forget-home/password-forget-home.component'
import { CanDeactivateNewCreditCardGuard } from './router-guards/can-deactivate-new-credit-card-guard';
import { CanActivateGuard } from './router-guards/can-activate.guard';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter(){
  return localStorage.getItem("token"); 
}

@NgModule({
  declarations: [
    AppComponent,
    LoginHomeComponent,
    NavMainHomeComponent,
    NavFooterHomeComponent,
    CardProviderHomeComponent,
    ViewCardsHomeComponent,
    HomeComponent,
    DisplayProvidersComponent,
    AddProvidersComponent,
    PasswordForgetHomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DynamicDialogModule,
    InputTextModule,
    TooltipModule,
    ToastModule,
    RippleModule,
    HttpClientModule,
    ConfirmPopupModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: [],
        authScheme: "Bearer " 
      }
    })
  ],
  providers: [CanDeactivateNewCreditCardGuard, CanActivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
