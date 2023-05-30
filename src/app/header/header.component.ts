import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ProductService } from '../services/product.service';
import {product} from '../data-types'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType:string = 'default'
  sellerName:string = "";
  userName:string='';
  searchResult : undefined | product[];
  cartItems = 0;
  constructor(private route: Router,private product : ProductService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val:any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
        
          let sellerStore=localStorage.getItem('seller');
          let sellerData =sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType = 'seller';
          console.warn(this.sellerName)
        }
        else if(localStorage.getItem('user')){
              let userStore = localStorage.getItem('user');
              let userData = userStore && JSON.parse(userStore);
              this.menuType='user';
              this.userName = userData.name;
              // console.warn(this.userName);
              this.product.getCartList(userData.id);

        }
        else {
          console.warn("Outside seller Area")
          this.menuType = 'default'
        }
      }
    });
    let cartData = localStorage.getItem('localCart');
    if(cartData){
        this.cartItems = JSON.parse(cartData).length
    }
    this.product.cartData.subscribe((items)=>{
        this.cartItems = items.length;
    })
  }
  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }
  searchProduct(query:KeyboardEvent){
     if(query)
     {
      const element = query.target as HTMLInputElement;
      console.warn(element.value);
      this.product.searchProduct(element.value).subscribe((result)=>{
         if(result.length>10){
          result.length= length;
        }
        this.searchResult=result;
      })
     }
  }

  hideSearch(){
    this.searchResult=undefined;
  }
  submitSearch(val:string){
   console.warn(val);
   this.route.navigate([`search/${val}`])
  }

  redirectToProductDetails(id:number){
    this.route.navigate(['/details/'+id])

  }
  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }
}
