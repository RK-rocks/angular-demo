import { Component, OnInit,ViewChild,ContentChildren,ElementRef,Renderer,Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { AuthLoginService } from "../../../_services/auth.service";
import {EncrDecrService} from '../../../_services/encr-decr.service';
import { map,filter } from 'rxjs/operators';
import { SwiperOptions } from 'swiper';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @ViewChild('swiperWrapper', {static: true }) public swiperWrapper: any;
  @ViewChild('colorWrapper', {static: true }) public colorWrapper: any;

  letProductData = []
  loading = false
  submitted = false
  id: number;
  currentUrl
  previousUrl
  isActive
  isDisabled = false;
  constructor(

    private activatedRoute: ActivatedRoute,
    private AuthLoginService: AuthLoginService,
    private toastr: ToastrService,
    protected router: Router,
    private EncrDecr: EncrDecrService,
    private render:Renderer,
    private renderer:Renderer2
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
        console.log('currentClass',currentClass)
        console.log('totalClass',totalClass)
        return '<span class="' + currentClass + '"></span>' +
                ' of ' +
                '<span class="' + totalClass + '"></span>';
    } 
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    zoom: {
      maxRatio: 7,
    },
    spaceBetween: 30,
    // autoplay: {
    //   delay: 2000,
    // },
  };

  //this function is for change slider index
  changeIndexSlider(obj){
    let indexOfImage
    console.log(obj)
    let res = this.letProductData['tbl_product_images'].map((index,i)=>{
      if(obj.product_image_id == index.id){
        indexOfImage = i
      }
    })
    //this indexOfImage is related to image with color
    console.log('swiper-slide',indexOfImage)
    // this.componentRef.directiveRef.setIndex(indexOfImage);
    this.swiperWrapper.swiper.slideTo(indexOfImage,0);
    for (let index = 0; index < this.colorWrapper.nativeElement.children.length; index++) {
      const element = this.colorWrapper.nativeElement.children[index];
      this.renderer.removeClass(element,'active')
    }
    this.render.setElementClass(event.target,"active",true); 
  }

  addClass(obj){
    console.log(obj)
  }
}
