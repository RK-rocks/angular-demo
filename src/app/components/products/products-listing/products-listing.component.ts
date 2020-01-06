import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmationDialogService } from '../../helper-components/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { AuthLoginService } from "../../../_services/auth.service";
import { async } from '@angular/core/testing';
import {EncrDecrService} from '../../../_services/encr-decr.service';

@Component({
  selector: 'app-products-listing',
  templateUrl: './products-listing.component.html',
  styleUrls: ['./products-listing.component.scss']
})
export class ProductsListingComponent implements OnInit {
  letProductData = []

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
  }

}
