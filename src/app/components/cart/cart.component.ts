// src/app/components/cart/cart.component.ts
import { AsyncPipe, CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  constructor(public cartService: CartService) {}
}
