import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-types';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData: undefined | cart[];
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  }
  constructor(private product: ProductService, private router: Router) {

  }
  ngOnInit(): void {
    this.loadDetails();
  }

  checkout() {
    this.router.navigate(['/checkout-page'])
  }
  loadDetails() {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      console.warn(this.cartData);
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 20;
      this.priceSummary.total = price + (price / 10) + 20 - (price / 10);
      console.warn(this.priceSummary);


      if (!this.cartData.length) {
        this.router.navigate(['/']);
      }
    })
  }


  removeToCart(cartId: number | undefined) {

    cartId && this.cartData && this.product.removeToCart(cartId).subscribe((result) => {
      this.loadDetails();
    })
  }


}
