// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private isCartOpenSubject = new BehaviorSubject<boolean>(false);

  cart$ = this.cartSubject.asObservable();
  isCartOpen$ = this.isCartOpenSubject.asObservable();

  addToCart(item: CartItem): void {
    const existingItem = this.cartItems.find(
      (i) => i.serviceName === item.serviceName
    );
    if (!existingItem) {
      this.cartItems.push(item);
      this.cartSubject.next([...this.cartItems]);
    }
  }

  removeFromCart(serviceName: string): void {
    this.cartItems = this.cartItems.filter(
      (item) => item.serviceName !== serviceName
    );
    this.cartSubject.next([...this.cartItems]);
  }

  toggleCart(): void {
    this.isCartOpenSubject.next(!this.isCartOpenSubject.value);
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert(`Proceeding to checkout with ${this.cartItems.length} items`);
  }
}
