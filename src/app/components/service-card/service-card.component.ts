import { Component, Input, OnInit } from '@angular/core';
import { ServiceModel } from '../../models/service.model';
import { CartService } from '../../services/cart.service';
import { ExpandCollapseService } from '../../services/expand-collapse.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-card.component.html',
  styles: [
    `
      .hidden {
        display: none;
      }
    `,
  ],
})
export class ServiceCardComponent implements OnInit {
  @Input() service!: ServiceModel;
  isInCart = false;

  constructor(
    private cartService: CartService,
    private expandCollapseService: ExpandCollapseService
  ) {}

  ngOnInit() {
    // Check if this service is already in cart when component initializes
    this.isInCart = this.cartService.isInCart(this.service.serviceName);
  }

  get isExpanded(): boolean {
    return this.expandCollapseService.getState(this.service.serviceName);
  }

  toggleServices(): void {
    this.expandCollapseService.toggleState(this.service.serviceName);
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
}
