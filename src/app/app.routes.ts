import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'home', component: HomeComponent },
  { path: 'checkout', component: CheckoutComponent },
];
