import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardProviderHomeComponent } from './components/card-provider-home/card-provider-home.component';
import { HomeComponent } from './components/home/home.component';
import { LoginHomeComponent } from './components/security/login-home/login-home.component';
import { PasswordForgetHomeComponent } from './components/security/password-forget-home/password-forget-home.component';
import { ViewCardsHomeComponent } from './components/view-cards-home/view-cards-home.component';
import { CanActivateGuard } from './router-guards/can-activate.guard';
import { CanDeactivateNewCreditCardGuard } from './router-guards/can-deactivate-new-credit-card-guard';

const routes: Routes = [
  {
    path: 'login', component: LoginHomeComponent
  },
  {
    path: 'vc', component: ViewCardsHomeComponent
  },
  {
    path: 'cp', 
    component: CardProviderHomeComponent,
    canActivate: [CanActivateGuard]
  },
  {
    path: 'home', component: HomeComponent,
    canDeactivate: [CanDeactivateNewCreditCardGuard]
  },
  {
    path: 'login/forget', component: PasswordForgetHomeComponent
  },
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component: LoginHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
