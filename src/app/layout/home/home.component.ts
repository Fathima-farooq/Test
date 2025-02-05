import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CartComponent } from '../../components/cart/cart.component';
import { ServiceCardComponent } from '../../components/service-card/service-card.component';
import { ServiceCarouselComponent } from '../../components/service-carousel/service-carousel.component';
import { ServiceModel } from '../../models/service.model';
import { CarServiceService } from '../../services/car-service.service';

interface GroupedServices {
  [key: string]: ServiceModel[];
}

@Component({
  selector: 'app-home',
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
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  services: ServiceModel[] = [];
  groupedServices: GroupedServices = {};
  protected readonly Object = Object;

  constructor(private carService: CarServiceService) {}

  ngOnInit() {
    // Use the first category 'Periodic Services' by default
    this.onCategorySelect('Periodic Services');
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
