import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { AuthLoginService } from "../../../_services/auth.service";
import {EncrDecrService} from '../../../_services/encr-decr.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  letProductData = []
  loading = false
  submitted = false
  id: number;
  constructor(

    private activatedRoute: ActivatedRoute,
    private AuthLoginService: AuthLoginService,
    private toastr: ToastrService,
    protected router: Router,
    private EncrDecr: EncrDecrService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.letProductData = data.event.data.productData;
      console.log(this.letProductData)
    });
  }

}
