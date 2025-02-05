import { Component, OnInit } from '@angular/core';
import { CarServiceService } from './services/car-service.service';
import { ServiceModel } from './models/service.model';
import { RouterOutlet } from '@angular/router';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { CartComponent } from './components/cart/cart.component';
import { CommonModule } from '@angular/common';
import { ServiceCarouselComponent } from './components/service-carousel/service-carousel.component';

interface GroupedServices {
  [key: string]: ServiceModel[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  styleUrl: './app.component.css',
})
export class AppComponent  {
}
