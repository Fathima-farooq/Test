import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  serviceName: string;
  price: number;
  // Add other properties as needed
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  
  private readonly CART_STORAGE_KEY = 'cartItems';
  public cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private isCartOpenSubject = new BehaviorSubject<boolean>(false);

  cart$ = this.cartSubject.asObservable();
  isCartOpen$ = this.isCartOpenSubject.asObservable();

  constructor(private router: Router) {
    this.loadCartFromStorage();
  }

  /** Load cart from localStorage */
  private loadCartFromStorage(): void {
    const storedCart = localStorage.getItem(this.CART_STORAGE_KEY);
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.cartSubject.next([...this.cartItems]);
    }
  }

  /** Save cart to localStorage */
  private saveCartToStorage(): void {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(this.cartItems));
  }

  /** Add item to cart */
  addToCart(item: CartItem): void {
    const existingItem = this.cartItems.find(
      (i) => i.serviceName === item.serviceName
    );
    if (!existingItem) {
      this.cartItems.push(item);
      this.cartSubject.next([...this.cartItems]);
      this.saveCartToStorage();
    }
  }

  /** Remove item from cart */
  removeFromCart(serviceName: string): void {
    this.cartItems = this.cartItems.filter(
      (item) => item.serviceName !== serviceName
    );
    this.cartSubject.next([...this.cartItems]);
    this.saveCartToStorage();
  }

  /** Clear all items in cart */
  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next([]);
    localStorage.removeItem(this.CART_STORAGE_KEY);
  }

  /** Toggle cart sidebar */
  toggleCart(): void {
    this.isCartOpenSubject.next(!this.isCartOpenSubject.value);
  }

  /** Check if an item is in the cart */
  isInCart(serviceName: string): boolean {
    return this.cartItems.some((item) => item.serviceName === serviceName);
  }

  /** Get total cart price */
  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  /** Checkout logic */
  checkout(): void {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert(`Proceeding to checkout with ${this.cartItems.length} items`);
    // ✅ Navigate to the checkout page
    this.router.navigate(['/checkout']);
  }

  /** Mock Payment Gateway Integration - runs for 1500sec's*/
  async processPayment(paymentDetails: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    amount: number;
  }): Promise<{ success: boolean; message: string }> {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (paymentDetails.cardNumber.length !== 16) {
      return { success: false, message: 'Invalid card number' };
    }

    if (paymentDetails.amount > 0) {
      this.clearCart(); // Clear cart after successful payment
      this.router.navigate(['/']);
      return { success: true, message: 'Payment processed successfully' };
    }

    return { success: false, message: 'Payment failed' };
  }

  // getCartItems(): any{
  //   const storedCart = localStorage.getItem(this.CART_STORAGE_KEY);
  //     this.cartItems = JSON.parse(storedCart);
  // }
}
