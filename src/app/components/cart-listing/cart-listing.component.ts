import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Component, OnInit, ViewChild, ContentChildren, ElementRef, Renderer, Renderer2, EventEmitter, Output } from '@angular/core';
import { AuthLoginService } from "../../_services/auth.service";
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../dashboard-layouts/cart.service';


@Component({
  selector: 'app-cart-listing',
  templateUrl: './cart-listing.component.html',
  styleUrls: ['./cart-listing.component.scss']
})
export class CartListingComponent implements OnInit {
  letCartData=[];
  removeItemUrl = 'cart/removecartitem'
  updateQuantityUrl = 'cart/updatequantity'
  orderTotal
  tax:number = 5
  taxAmount
  shippingCharge = 15.00
  grandTotal
  shownCartDiv = true
  sessionDataCurr: any = JSON.parse(localStorage.getItem('currentUser'))
  totalCartItems = this.sessionDataCurr.cart_item_numbers
  constructor(
    protected router: Router,
    private activatedRoute: ActivatedRoute,
    private AuthLoginService: AuthLoginService,
    private toastr: ToastrService,
    private eleRef: ElementRef,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.letCartData = data.event.data.cartData;
      let totalValu
      let allTotal = 0
      this.letCartData = this.letCartData.map(function(el) {
        var o = Object.assign({}, el);
        totalValu = el.total_item * el.tbl_product.price
        o.total_value = totalValu;
        allTotal += totalValu
        return o;
      })
      this.orderTotal = allTotal
      this.taxAmount = (this.orderTotal*this.tax)/100
      this.grandTotal = this.orderTotal + this.taxAmount + this.shippingCharge
    });
    if(this.totalCartItems == 0){
      this.shownCartDiv = false 
    }else{
      this.shownCartDiv = true
    }
  }

  redirectShoppingPage(){
    this.router.navigate(["/"]);
  }

  async deleteCartItem(id,index){
    console.log(id)
    // this.eleRef.nativeElement.querySelector('#cartWrapperInner' + id).remove()
    try {
      console.log("filterback function called")
      let sessionData: any = JSON.parse(localStorage.getItem('currentUser'))
      let user_id = sessionData.userId
      let cart_id = id
      let token = sessionData.token
      let is_subscribed = sessionData.is_subscribed
      let reqObj = {
        user_id: user_id,
        cart_id: cart_id,
      }
      let res = await this.AuthLoginService.postRequest(this.removeItemUrl, reqObj)
      console.log(res)
      if (res.status == 1) {
        // this.toastr.success(res.message)

        //get item quantity for update session data
        let quantity = this.letCartData[index].total_item

        this.letCartData.splice(index,1);

        let allTotal = 0
        this.letCartData.map(function(el) {
          allTotal += el.total_value
        })
        this.orderTotal = allTotal
        this.taxAmount = (this.orderTotal*this.tax)/100
        this.grandTotal = this.orderTotal + this.taxAmount + this.shippingCharge
        let newSessionCartQuantity = parseInt(res.data.getTotalQuantity.total_item)
        if(res.data.getTotalQuantity.total_item == null){
          newSessionCartQuantity = 0
        }

        //set cart item to localstorage
        const responseData = {
          userId: user_id,
          token: token,
          is_subscribed: is_subscribed,
          cart_item_numbers: newSessionCartQuantity
        }
        localStorage.setItem('currentUser', JSON.stringify(responseData));

        this.cartService.emitNavChangeEvent(newSessionCartQuantity);
        if(newSessionCartQuantity == 0){
          this.shownCartDiv = false
        }else{
          this.shownCartDiv = true
        }
        // this.router.navigate(['/']);
      } else {
        this.toastr.warning(res.message)
      }
    } catch (error) {
      this.toastr.warning(error.message)
      
    }
  }

  async changeItemquantity(event,index,product_price){
    try {
      let quantity = event.target.value
      let newTotal = product_price*quantity
      this.letCartData[index].total_value = newTotal
      let cart_id = this.letCartData[index].id
      let sessionData: any = JSON.parse(localStorage.getItem('currentUser'))
      let user_id = sessionData.userId
      let token = sessionData.token
      let is_subscribed = sessionData.is_subscribed
      let reqObj = {
        user_id: user_id,
        cart_id: cart_id,
        total_item:quantity
      }
      let res = await this.AuthLoginService.postRequest(this.updateQuantityUrl, reqObj)
      
      if (res.status == 1) {
        //calculate order total tax and grand total
        let allTotal = 0
        this.letCartData.map(function(el) {
          allTotal += el.total_value
        })
        this.orderTotal = allTotal
        this.taxAmount = (this.orderTotal*this.tax)/100
        this.grandTotal = this.orderTotal + this.taxAmount + this.shippingCharge
        let newSessionCartQuantity = parseInt(res.data.getTotalQuantity.total_item)
        this.cartService.emitNavChangeEvent(newSessionCartQuantity);
        //set cart item to localstorage
        const responseData = {
          userId: user_id,
          token: token,
          is_subscribed: is_subscribed,
          cart_item_numbers: newSessionCartQuantity
        }
        console.log(responseData)
        localStorage.setItem('currentUser', JSON.stringify(responseData));
        
      } else {
        this.toastr.warning(res.message)
      }
    } catch (error) {
      this.toastr.warning(error.message)
      
    }
  }

}
