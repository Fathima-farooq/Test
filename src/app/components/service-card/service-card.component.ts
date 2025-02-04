// service-card.component.ts
import { Component, Input } from '@angular/core';
import { ServiceModel } from '../../models/service.model';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-card.component.html',
  styles: [
    `
      .add-to-cart {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        background-color: #007bff;
        color: white;
      }

      .add-to-cart.added {
        background-color: #28a745;
      }
    `,
  ],
})
export class ServiceCardComponent {
  @Input() service!: ServiceModel;
  isInCart = false;
  isExpanded = false;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Check if this service is already in cart when component initializes
    this.isInCart = this.cartService.isInCart(this.service.serviceName);
  }

  addToCart(): void {
    this.isInCart = !this.isInCart;

    if (this.isInCart) {
      this.cartService.addToCart({
        serviceName: this.service.serviceName,
        price: this.service.price,
      });
    } else {
      this.cartService.removeFromCart(this.service.serviceName);
    }
  }

  toggleServices(): void {
    this.isExpanded = !this.isExpanded;
  }
}
