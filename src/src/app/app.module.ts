import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginHomeComponent } from '../app/components/security/login-home/login-home.component'
import { NavMainHomeComponent } from './components/nav/nav-main-home/nav-main-home.component';
import { NavFooterHomeComponent } from './components/nav/nav-footer-home/nav-footer-home.component';
import { CardProviderHomeComponent } from './components/card-provider-home/card-provider-home.component';
import { ViewCardsHomeComponent } from './components/view-cards-home/view-cards-home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginHomeComponent,
    NavMainHomeComponent,
    NavFooterHomeComponent,
    CardProviderHomeComponent,
    ViewCardsHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
