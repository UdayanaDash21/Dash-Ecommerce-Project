import { Component, OnInit } from '@angular/core';
import { cart, order, product } from '../data-types';
import { ProductService } from '../services/product.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice: undefined | number;
  cartData: cart[] | undefined;
  orderMessage: string | undefined;

  constructor(private product: ProductService, private router: Router) {

  }
  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.totalPrice = price + (price / 10) + 20 - (price / 10);
      console.warn(this.totalPrice);
    })
  }

  orderNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined,
      }

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id);
        }, 1000);
      })


      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMessage = "Order has been placed"
          setTimeout(() => {
            this.orderMessage = undefined;
            this.router.navigate(['/my-orders'])
          }, 4000);

        }
      })
    }
  }
}
