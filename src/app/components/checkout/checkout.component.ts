import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="checkout-container row">
      <div class="col-md-8">
        <div class="p-4 border rounded">
          <h2 class="text-xl font-bold mb-4">Checkout</h2>

          <form
            (ngSubmit)="onSubmit()"
            #checkoutForm="ngForm"
            class="space-y-4"
          >
            <div class="form-group">
              <label for="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                [(ngModel)]="paymentDetails.cardNumber"
                required
                maxlength="16"
                class="form-control"
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div class="row">
              <div class="col-md-6 form-group">
                <label for="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  [(ngModel)]="paymentDetails.expiryDate"
                  required
                  placeholder="MM/YY"
                  class="form-control"
                />
              </div>

              <div class="col-md-6 form-group">
                <label for="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  [(ngModel)]="paymentDetails.cvv"
                  required
                  maxlength="3"
                  class="form-control"
                />
              </div>
            </div>

            <button
              type="submit"
              [disabled]="processing || !checkoutForm.form.valid"
              class="btn btn-primary w-100"
            >
              {{ processing ? 'Processing...' : 'Pay Now' }}
            </button>
          </form>

          <div
            *ngIf="message"
            class="alert mt-3"
            [ngClass]="success ? 'alert-success' : 'alert-danger'"
          >
            {{ message }}
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="p-4 border rounded">
          <h4>
            Cart Summary
            <span class="float-end"
              ><i class="fa fa-shopping-cart"></i> ({{
                cartItems.length
              }})</span
            >
          </h4>
          <hr />
          <div *ngFor="let item of cartItems">
            <p>
              {{ item.serviceName }}
              <span class="float-end">₹{{ item.price }}</span>
            </p>
          </div>
          <hr />
          <p>
            <strong
              >Total <span class="float-end">₹{{ total }}</span></strong
            >
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .checkout-container {
        max-width: 900px;
        margin: auto;
      }
    `,
  ],
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  processing: boolean = false;
  message: string = '';
  success: boolean = false;

  paymentDetails = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    amount: 0,
  };

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.cartItems;
    this.total = this.cartService.getTotal();
  }

  async onSubmit() {
    this.processing = true;
    this.message = '';
    this.paymentDetails.amount = this.total;

    try {
      const result = await this.cartService.processPayment(this.paymentDetails);
      this.success = result.success;
      this.message = result.message;

      if (result.success) {
        console.log('Payment successful');
      }
    } catch (error) {
      this.success = false;
      this.message = 'An error occurred while processing payment';
    } finally {
      this.processing = false;
    }
  }
}
