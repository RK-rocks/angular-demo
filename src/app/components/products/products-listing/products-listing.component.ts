import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmationDialogService } from '../../helper-components/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { AuthLoginService } from "../../../_services/auth.service";
import { async } from '@angular/core/testing';
import {EncrDecrService} from '../../../_services/encr-decr.service';
import { environment } from "../../../../environments/environment";
import { map,filter } from 'rxjs/operators';

@Component({
  selector: 'app-products-listing',
  templateUrl: './products-listing.component.html',
  styleUrls: ['./products-listing.component.scss']
})
export class ProductsListingComponent implements OnInit {
  letProductData = []
  letColorData = []
  letCategoryData = []
  loading = false
  reqObj:any
  imageUrl = `${environment.apiUrl}/products/`
  color_id
  category_id
  param
  sort_by
  constructor(
    private activatedRoute: ActivatedRoute,
    private AuthLoginService: AuthLoginService,
    private toastr: ToastrService,
    protected router: Router,
  ) { }

  ngOnInit() {
    // this.activatedRoute.data.subscribe(data => {
    //   this.letProductData = data.event.data.productData;
    // });
    this.activatedRoute.data.subscribe(data => {
      this.letColorData = data.colorDetailsResolver.data.colorData;
    });
    this.activatedRoute.data.subscribe(data => {
      this.letCategoryData = data.categoryDetailsResolver.data.categoryData;
    });

    this.activatedRoute.queryParams
      .subscribe(async params => {
        let sessionData:any = JSON.parse(localStorage.getItem('currentUser'))
        let user_id = sessionData.userId
        this.color_id = params.color_id;
        this.category_id = params.category_id;
        this.sort_by = params.sort_by;
        if(this.color_id || this.category_id|| this.sort_by){
          if(this.color_id){
            this.reqObj = {
              color_id:this.color_id,
              user_id:user_id,
            }
          }else if(this.category_id){
            this.reqObj = {
              category_id:this.category_id,
              user_id:user_id,
            }
          }else if(this.sort_by != ''){
            this.reqObj = {
              user_id:user_id,
              sort_by:this.sort_by
            }
          }else if(this.color_id && this.category_id){
            this.reqObj = {
              color_id:this.color_id,
              category_id:this.category_id,
              user_id:user_id,
            }
          }else if(this.category_id && this.sort_by != ''){
            this.reqObj = {
              sort_by:this.sort_by,
              category_id:this.category_id,
              user_id:user_id,
            }
          }else if(this.color_id && this.sort_by != ''){
            this.reqObj = {
              sort_by:this.sort_by,
              color_id:this.color_id,
              user_id:user_id,
            }
          }else if(this.color_id && this.sort_by != '' && this.category_id){
            this.reqObj = {
              sort_by:this.sort_by,
              color_id:this.color_id,
              user_id:user_id,
            }
          }
          try {
            let url = 'product/getproducts'
            let res = await this.AuthLoginService.postRequest(url,this.reqObj)
            if(res.status == 1){
              this.loading = false
              this.letProductData = res.data.productData
              this.toastr.success(res.message)
            }else{
              this.loading = false
              this.toastr.warning(res.message)
            }
          } catch (error) {
            this.loading = false
            this.toastr.warning(error.message)
          }
        }else{
          try {
            let sessionData:any = JSON.parse(localStorage.getItem('currentUser'))
            let user_id = sessionData.userId
            this.reqObj = {
              user_id:user_id,
            }
            let url = 'product/getproducts'
            let res = await this.AuthLoginService.postRequest(url,this.reqObj)
            if(res.status == 1){
              this.loading = false
              this.letProductData = res.data.productData
              this.toastr.success(res.message)
            }else{
              this.loading = false
              this.toastr.warning(res.message)
            }
          } catch (error) {
            this.loading = false
            this.toastr.warning(error.message)
          }
        }
      });
  }

  async filterBackfunction(reqObj){
    try {
      let sessionData:any = JSON.parse(localStorage.getItem('currentUser'))
      let user_id = sessionData.userId
      reqObj.user_id = user_id
      let url = 'product/getproducts'
      let res = await this.AuthLoginService.postRequest(url,reqObj)
      if(res.status == 1){
        this.loading = false
        this.letProductData = res.data.productData
        // this.toastr.success(res.message)
      }else{
        this.loading = false
        this.toastr.warning(res.message)
      }
    } catch (error) {
      this.loading = false
      this.toastr.warning(error.message)
    }
  }

  subscribeFunctionColor(color_id){
    this.activatedRoute.queryParams
      .subscribe(async params => {
        console.log("params in colorfilter",params)
        if(params.category_id){
          let reqObj = {
            category_id:params.category_id,
            color_id:color_id
          }
          this.filterBackfunction(reqObj)
          this.router.navigate(['/dashboard'], { queryParams: { color_id: color_id}, queryParamsHandling: 'merge' });
        }else if(params.sort_by){
          console.log("in sort by")

          let reqObj = {
            sort_by:params.sort_by,
            color_id:color_id
          }
          this.filterBackfunction(reqObj)
          this.router.navigate(['/dashboard'], { queryParams: { color_id: color_id}, queryParamsHandling: 'merge' });
        }else if(params.category_id && params.sort_by){
          console.log("in both")

          let reqObj = {
            sort_by:params.sort_by,
            color_id:color_id,
            category_id:params.category_id
          }
          this.filterBackfunction(reqObj)
          this.router.navigate(['/dashboard'], { queryParams: { color_id: color_id}, queryParamsHandling: 'merge' });
        }else{
          console.log("no case")

          let reqObj = {
            color_id:color_id
          }
          this.filterBackfunction(reqObj)
          this.router.navigate(['/dashboard'], { queryParams: { color_id: color_id}, queryParamsHandling: 'merge' });
        }
      })
  }

  colorFilter(color_id){
    console.log("this.colorFilter called")
    this.subscribeFunctionColor(color_id)
  }

  categoryFilter(category_id){
    console.log("in category filter")
    this.activatedRoute.queryParams
      .subscribe(async params => {
        if(params.color_id){
          let reqObj = {
            color_id:params.color_id,
            category_id:category_id
          }
          this.router.navigate(['/dashboard'], { queryParams: { category_id: category_id}, queryParamsHandling: 'merge' });
          this.filterBackfunction(reqObj)
        }else if(params.sort_by){
          let reqObj = {
            sort_by:params.sort_by,
            category_id:category_id
          }
          this.router.navigate(['/dashboard'], { queryParams: { category_id: category_id}, queryParamsHandling: 'merge' });
          this.filterBackfunction(reqObj)
        }else if(params.color_id && params.sort_by){
          let reqObj = {
            sort_by:params.sort_by,
            category_id:category_id,
            color_id:params.color_id
          }
          this.router.navigate(['/dashboard'], { queryParams: { category_id: category_id}, queryParamsHandling: 'merge' });
          this.filterBackfunction(reqObj)
        }else{
          let reqObj = {
            category_id:category_id
          }
          this.router.navigate(['/dashboard'], { queryParams: { category_id: category_id}, queryParamsHandling: 'merge' });
          this.filterBackfunction(reqObj)
        }
      })
  }

}
