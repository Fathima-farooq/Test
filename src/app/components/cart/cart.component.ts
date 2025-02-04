// src/app/components/cart/cart.component.ts
import { AsyncPipe, CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {

  @ViewChild('serviceCardContainer', { static: true }) serviceCardContainer!: ElementRef;

  constructor(public cartService: CartService) {}

  scrollToService(serviceName: string): void {
    const element = document.getElementById(serviceName);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
