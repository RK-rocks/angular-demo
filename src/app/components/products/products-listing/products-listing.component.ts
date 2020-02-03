import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmationDialogService } from '../../helper-components/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { AuthLoginService } from "../../../_services/auth.service";
import { async } from '@angular/core/testing';
import {EncrDecrService} from '../../../_services/encr-decr.service';
import { environment } from "../../../../environments/environment";
import { map,filter } from 'rxjs/operators';
import {NgxPaginationModule} from 'ngx-pagination';

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
  isDisabled
  // p: number = 1;
  constructor(
    private activatedRoute: ActivatedRoute,
    private AuthLoginService: AuthLoginService,
    private toastr: ToastrService,
    protected router: Router,
    private EncrDecr: EncrDecrService
  ) { 
    
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      //console.log("HETETETTETE");
      this.letColorData = data.colorDetailsResolver.data.colorData;
    });
    this.activatedRoute.data.subscribe(data => {
      this.letCategoryData = data.categoryDetailsResolver.data.categoryData;
    });

    let color_id = this.activatedRoute.snapshot.queryParams.color_id
    let sort_by = this.activatedRoute.snapshot.queryParams.sort_by
    let category_id = this.activatedRoute.snapshot.queryParams.category_id
    console.log(this.activatedRoute.queryParams)
    
        console.log("in ngOnIt called")
    
        let sessionData:any = JSON.parse(localStorage.getItem('currentUser'))
        let user_id = sessionData.userId
        this.color_id = color_id;
        this.category_id = category_id;
        this.sort_by = sort_by;
        
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
            let res:any = this.filterBackfunction(this.reqObj)
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
            let res:any = this.filterBackfunction(this.reqObj)
          } catch (error) {
            this.loading = false
            this.toastr.warning(error.message)
          }
        }
      // });
  }

  async filterBackfunction(reqObj){
    try {
      console.log("filterback function called")
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
    let category_id = this.activatedRoute.snapshot.queryParams.category_id
    let sort_by = this.activatedRoute.snapshot.queryParams.sort_by
    console.log("subscribeFunctionColor called")
      if(category_id){
          let reqObj = {
            category_id:category_id,
            color_id:color_id
          }
          this.filterBackfunction(reqObj)
          this.router.navigate(['/dashboard'], { queryParams: { color_id: color_id}, queryParamsHandling: 'merge' });
        }else if(sort_by !=''){
          console.log("in sort by")

          let reqObj = {
            sort_by:sort_by,
            color_id:color_id
          }
          this.filterBackfunction(reqObj)
          this.router.navigate(['/dashboard'], { queryParams: { color_id: color_id}, queryParamsHandling: 'merge' });
        }else if(category_id && sort_by !=''){
          console.log("in both")

          let reqObj = {
            sort_by:sort_by,
            color_id:color_id,
            category_id:category_id
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
      // })
  }

  colorFilter(color_id){
    event.stopPropagation();
    console.log("this.colorFilter called")
    this.subscribeFunctionColor(color_id)
  }

  categoryFilter(category_id){
    let color_id = this.activatedRoute.snapshot.queryParams.color_id
    let sort_by = this.activatedRoute.snapshot.queryParams.sort_by
      if(color_id){
          let reqObj = {
            color_id:color_id,
            category_id:category_id
          }
          this.router.navigate(['/dashboard'], { queryParams: { category_id: category_id}, queryParamsHandling: 'merge' });
          this.filterBackfunction(reqObj)
        }else if(sort_by != ''){
          let reqObj = {
            sort_by:sort_by,
            category_id:category_id
          }
          this.router.navigate(['/dashboard'], { queryParams: { category_id: category_id}, queryParamsHandling: 'merge' });
          this.filterBackfunction(reqObj)
        }else if(color_id && sort_by != ''){
          let reqObj = {
            sort_by:sort_by,
            category_id:category_id,
            color_id:color_id
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
  }

  allProducts(){
    let reqObj = {}
    this.router.navigate(['/dashboard']);
    this.filterBackfunction(reqObj)
  }

  showProductDetails(product){
    console.log("product.id",product)
    let encrypted = this.EncrDecr.set('123456$#@$^@1ERF', product.id);
    var readyText = encrypted.toString().replace('+','xMl3Jk').replace('/','Por21Ld').replace('=','Ml32')
    if(readyText.includes('/')){
      readyText = readyText.replace('/','Por21Ld')
    }
    // while (readyText.includes('/')) {
    //   readyText = encrypted.toString().replace('+','xMl3Jk').replace('/','Por21Ld').replace('=','Ml32')
    // }
    //var decrypted = 08eQVAwnz73U6P0EK20Bsg== this.EncrDecr.get('123456$#@$^@1ERF', encrypted);
    this.isDisabled = true
    // console.log('Decrypted :' + decrypted);
    console.log(readyText)
    this.router.navigate(['/dashboard/product-details/'+readyText]);
  }

  sortByFilter(sort_by){
    console.log("sort_by filter")
    console.log(sort_by)
    let color_id = this.activatedRoute.snapshot.queryParams.color_id
    let category_id = this.activatedRoute.snapshot.queryParams.category_id
      if(color_id){
          let reqObj = {
            color_id:color_id,
            sort_by:sort_by
          }
          this.router.navigate(['/dashboard'], { queryParams: { sort_by: sort_by}, queryParamsHandling: 'merge' });
          this.filterBackfunction(reqObj)
        }else if(category_id != ''){
          let reqObj = {
            category_id:category_id,
            sort_by:sort_by
          }
          this.router.navigate(['/dashboard'], { queryParams: { sort_by: sort_by}, queryParamsHandling: 'merge' });
          this.filterBackfunction(reqObj)
        }else if(color_id && category_id != ''){
          let reqObj = {
            category_id:category_id,
            sort_by:sort_by,
            color_id:color_id
          }
          this.router.navigate(['/dashboard'], { queryParams: { sort_by: sort_by}, queryParamsHandling: 'merge' });
          this.filterBackfunction(reqObj)
        }else{
          let reqObj = {
            sort_by:sort_by
          }
          this.router.navigate(['/dashboard'], { queryParams: { sort_by: sort_by}, queryParamsHandling: 'merge' });
          this.filterBackfunction(reqObj)
        }
  }

}
