import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { StoreComponent } from './layout/store/store.component';

export const routes: Routes = [
  { path: '', component: StoreComponent },
  { path: 'checkout', loadComponent: () => import('./components/checkout/checkout.component').then(m => m.CheckoutComponent) }
];
