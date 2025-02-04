import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';

export const routes: Routes = [
    {path:"", component:AppComponent},
    {path:"c", component:CartComponent},
    {path:"sc", component:ServiceCardComponent},
];
