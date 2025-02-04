// service-card.component.ts
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ServiceModel } from '../../models/service.model';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css',
})
export class ServiceCardComponent {
  @Input() service!: ServiceModel;
  isExpanded = false;
  isInCart = false;

  constructor(private cartService: CartService, private cdr: ChangeDetectorRef) {}

  toggleServices(): void {
    this.isExpanded = !this.isExpanded;
  }

  addToCart(): void {
    this.isInCart = !this.isInCart;
    console.log('isInCart:', this.isInCart); // Debugging log
    if (this.isInCart) {
      this.cartService.addToCart({
        serviceName: this.service.serviceName,
        price: this.service.price,
      });
    } else {
      this.cartService.removeFromCart(this.service.serviceName);
    }
    // this.cdr.detectChanges();
    // this.cdr.markForCheck(); // Use markForCheck instead of detectChanges
  }
}
