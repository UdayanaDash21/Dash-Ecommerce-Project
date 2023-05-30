import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrderComponent } from './my-order/my-order.component';

const routes: Routes = [
  {
   component:HomeComponent,
   path:'' 
  },
  {
   component:SellerAuthComponent,
   path:'seller-auth'
  },
  {
    component:SellerHomeComponent,
    path:'seller-home',
    canActivate:[AuthGuardGuard]
  },
  {
   component:SellerAddProductComponent,
   path:'seller-add-product',
   canActivate:[AuthGuardGuard]
  },
  {
    component:SellerUpdateProductComponent,
    path:'seller-update-product/:id',
    canActivate:[AuthGuardGuard]
   },
   {
    component:SearchComponent,
    path:'search/:query',
   },  
   {
    component:ProductDetailsComponent,
    path:'details/:productId',
   },
   {
    component:UserAuthComponent,
    path:'user-auth',
   },
   {
    component:CartPageComponent,
    path:'cart-page',
   },
   {
    component:CheckoutComponent,
    path:'checkout-page',
   },
   {
    component:MyOrderComponent,
    path:'my-orders',
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
