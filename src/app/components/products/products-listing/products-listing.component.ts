import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmationDialogService } from '../../helper-components/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { AuthLoginService } from "../../../_services/auth.service";
import { async } from '@angular/core/testing';
import {EncrDecrService} from '../../../_services/encr-decr.service';
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-products-listing',
  templateUrl: './products-listing.component.html',
  styleUrls: ['./products-listing.component.scss']
})
export class ProductsListingComponent implements OnInit {
  letProductData = []
  letColorData = []
  letCategoryData = []
  imageUrl = `${environment.apiUrl}/products/`

  constructor(
    private activatedRoute: ActivatedRoute,
    private AuthLoginService: AuthLoginService,
    private toastr: ToastrService,
    protected router: Router,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.letProductData = data.event.data.productData;
      console.log(this.letProductData)
    });
    this.activatedRoute.data.subscribe(data => {
      this.letColorData = data.colorDetailsResolver.data.colorData;
      console.log(this.letColorData)
    });
    this.activatedRoute.data.subscribe(data => {
      this.letCategoryData = data.categoryDetailsResolver.data.categoryData;
      console.log(this.letCategoryData)
    });
  }

}
