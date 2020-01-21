import { Component, OnInit, ViewChild, ContentChildren, ElementRef, Renderer, Renderer2, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { AuthLoginService } from "../../../_services/auth.service";
import { EncrDecrService } from '../../../_services/encr-decr.service';
import { environment } from "../../../../environments/environment";

import { map, filter } from 'rxjs/operators';
import { SwiperOptions } from 'swiper';
import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
import { StarRatingComponent } from 'ng-starrating';
import { CartService } from '../../dashboard-layouts/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @ViewChild('swiperWrapper', { static: true }) public swiperWrapper: any;
  @ViewChild('colorWrapper', { static: true }) public colorWrapper: any;
  @Output() valueChangeCart = new EventEmitter();
  sessionDataCurr: any = JSON.parse(localStorage.getItem('currentUser'))
  totalCartItems = this.sessionDataCurr.cart_item_numbers

  letProductData = []
  loading = false
  submitted = false
  id: number;
  currentUrl
  previousUrl
  isActive
  isDisabled = false;
  product_image_id_global
  quantity_product_global
  rattingProductUrl = `product/productsratting`
  constructor(

    private activatedRoute: ActivatedRoute,
    private AuthLoginService: AuthLoginService,
    private toastr: ToastrService,
    protected router: Router,
    private EncrDecr: EncrDecrService,
    private render: Renderer,
    private renderer: Renderer2,
    private cartService: CartService
  ) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.letProductData = data.event.data.productData;
      console.log(this.letProductData)
    });
  }

  config: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      // renderBullet: function (index, className) {
      //   return '<span class="' + className + '">' + (index + 1) + '</span>';
      // }
      renderFraction: function (currentClass, totalClass) {
        console.log('currentClass', currentClass)
        console.log('totalClass', totalClass)
        return '<span class="' + currentClass + '"></span>' +
          ' of ' +
          '<span class="' + totalClass + '"></span>';
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    // zoom: {
    //   maxRatio: 7,
    // },
    spaceBetween: 30,
    // autoplay: {
    //   delay: 2000,
    // },
  };

  //this function is for change slider index
  changeIndexSlider(obj) {
    this.product_image_id_global = obj.product_image_id
    let indexOfImage
    console.log(obj)
    let res = this.letProductData['tbl_product_images'].map((index, i) => {
      if (obj.product_image_id == index.id) {
        indexOfImage = i
      }
    })
    //this indexOfImage is related to image with color
    console.log('swiper-slide', indexOfImage)
    // this.componentRef.directiveRef.setIndex(indexOfImage);
    this.swiperWrapper.swiper.slideTo(indexOfImage, 0);
    for (let index = 0; index < this.colorWrapper.nativeElement.children.length; index++) {
      const element = this.colorWrapper.nativeElement.children[index];
      this.renderer.removeClass(element, 'active')
    }
    this.render.setElementClass(event.target, "active", true);
  }

  async onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }, productData) {
    console.log('productData', productData)
    try {
      console.log("filterback function called")
      let sessionData: any = JSON.parse(localStorage.getItem('currentUser'))
      let user_id = sessionData.userId
      let product_id = productData.id

      let reqObj = {
        user_id: user_id,
        product_id: product_id,
        ratings: $event.newValue
      }
      let res = await this.AuthLoginService.postRequest(this.rattingProductUrl, reqObj)
      this.letProductData = this.letProductData
      console.log(res)
      console.log(this.letProductData)
      if (res.status == 1) {
        this.loading = false
        this.letProductData = res.data.productData
        this.toastr.success(res.message)
        // this.router.navigate(['/']);
      } else {
        this.loading = false
        this.toastr.warning(res.message)
      }
    } catch (error) {
      this.loading = false
      this.toastr.warning(error.message)
    }
  }

  async addToCart(obj) {
    this.product_image_id_global
    if (this.quantity_product_global == undefined) {
      this.quantity_product_global = 1
    }
    try {
      this.submitted = true;
      let url = 'product/addtocartproduct'
      let sessionData: any = JSON.parse(localStorage.getItem('currentUser'))
      let user_id = sessionData.userId
      let token = sessionData.token
      let is_subscribed = sessionData.is_subscribed
      let cart_item_numbers = sessionData.cart_item_numbers
      console.log('obj', obj)
      let reqObj = {
        user_id: user_id,
        product_id: obj.id,
        total_item: this.quantity_product_global,
        product_color_id: this.product_image_id_global,
      }
      let res = await this.AuthLoginService.postRequest(url, reqObj);
      if (res.status == 1) {

        this.totalCartItems = +this.totalCartItems + this.quantity_product_global;
        console.log(typeof(this.totalCartItems))
        console.log(typeof(this.quantity_product_global))
        this.cartService.emitNavChangeEvent(this.totalCartItems);
        // this.valueChangeCart.emit(this.totalCartItems);
        const responseData = {
          userId: user_id,
          token: token,
          is_subscribed: is_subscribed,
          cart_item_numbers: this.totalCartItems
        }
        console.log(responseData)
        localStorage.setItem('currentUser', JSON.stringify(responseData));

        // this.toastr.success(res.message)
      } else {
        this.loading = false
        this.toastr.warning(res.message)
      }
    } catch (error) {
      this.loading = false
      this.toastr.warning(error.message)
    }
  }

  async quantityChangeFun(events) {
    this.quantity_product_global = +events.target.value
    console.log("in quantity changed")
    this.totalCartItems = +this.totalCartItems
    console.log(typeof(this.totalCartItems))
    console.log(typeof(this.quantity_product_global))
  }

}
