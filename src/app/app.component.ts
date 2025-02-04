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
  template: `
    <app-service-carousel
      (categorySelect)="onCategorySelect($event)"
    ></app-service-carousel>
    <app-cart></app-cart>
    <div class="container mt-1">
      <div *ngFor="let group of Object.entries(groupedServices)">
        <div class="section-title">{{ group[0] }}</div>
        <ng-container *ngFor="let service of group[1]">
          <app-service-card [service]="service"></app-service-card>
        </ng-container>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    RouterOutlet,
    ServiceCardComponent,
    CartComponent,
    CommonModule,
    ServiceCarouselComponent,
  ],
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  services: ServiceModel[] = [];
  groupedServices: GroupedServices = {};
  protected readonly Object = Object;

  constructor(private carService: CarServiceService) {}

  ngOnInit() {
    this.carService.getServices().subscribe({
      next: (response: any) => {
        this.services = response._embedded.productModels;
        console.log(this.services);
        alert('preiuer');
        this.groupServices();
      },
      error: (error) => {
        console.error('Error fetching services:', error);
      },
    });
  }

  private groupServices() {
    this.groupedServices = this.services.reduce((acc, service) => {
      if (!acc[service.serviceHeading]) {
        acc[service.serviceHeading] = [];
      }
      acc[service.serviceHeading].push(service);
      return acc;
    }, {} as GroupedServices);
  }

  onCategorySelect(category: string) {
    this.carService.getServicesByCategory(category).subscribe({
      next: (response: any) => {
        this.services = response._embedded.productModels;
        this.groupServices();
      },
      error: (error) => {
        console.error('Error fetching category services:', error);
      },
    });
  }
}
