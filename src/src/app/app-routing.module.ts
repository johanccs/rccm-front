import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardProviderHomeComponent } from './components/card-provider-home/card-provider-home.component';
import { HomeComponent } from './components/home/home.component';
import { LoginHomeComponent } from './components/security/login-home/login-home.component';
import { ViewCardsHomeComponent } from './components/view-cards-home/view-cards-home.component';

const routes: Routes = [
  {
    path: 'login', component: LoginHomeComponent
  },
  {
    path: 'vc', component: ViewCardsHomeComponent
  },
  {
    path: 'cp', component: CardProviderHomeComponent
  },
  {
    path: 'home', component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
