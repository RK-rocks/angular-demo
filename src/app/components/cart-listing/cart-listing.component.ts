import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-listing',
  templateUrl: './cart-listing.component.html',
  styleUrls: ['./cart-listing.component.scss']
})
export class CartListingComponent implements OnInit {
  letCartData
  constructor(
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.letCartData = data.event.data.cartData;
      console.log("cart sdatakljnkj")
      console.log(this.letCartData)
      let totalValu
      this.letCartData = this.letCartData.map(function(el) {
        var o = Object.assign({}, el);
        totalValu = el.total_item * el.tbl_product.price
        o.total_value = totalValu;
        return o;
      })
      console.log(this.letCartData)
    });
  }

}
