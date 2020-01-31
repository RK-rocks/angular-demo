import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmationDialogService } from '../helper-components/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { AuthLoginService } from "../../_services/auth.service";
import { async } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EncrDecrService } from '../../_services/encr-decr.service';
// import { ModalService } from '../../_services/modal.service';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { TotalPriceService } from '../checkout/total-price.service';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../dashboard-layouts/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations: [
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
        animate(600)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({ opacity: 0 })))
    ])
  ]
})
export class CheckoutComponent implements OnInit {
  letAddressData = []
  loading = false
  submitted = false
  id: number;
  isDisabled = false;
  editMode: any
  showAddressDiv = true
  bodyText: string;
  addAddressForm;
  handler: any = null;
  observableCartNumbers;
  grandTotal = 0;
  testEmitter$ = new BehaviorSubject<number>(this.grandTotal);
  constructor(
    private activatedRoute: ActivatedRoute,
    private confirmationDialogService: ConfirmationDialogService,
    private AuthLoginService: AuthLoginService,
    private toastr: ToastrService,
    protected router: Router,
    private EncrDecr: EncrDecrService,
    // private modalService: ModalService,
    private formBuilder: FormBuilder,
    private totalPriceService: TotalPriceService,
    public ngZone: NgZone,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.loadStripe();
    // this.observableCartNumbers = this.totalPriceService.getNavChangeEmitter()
    //   .subscribe(item => {
    //     console.log('item', item);
    //     // this.valueChangeCart(item)
    //     //   this.ngZone.run( () => {
    //     //     // this.testVariable += '-bar';
    //     //  });
    //     this.grandTotal = item;
    //     this.testEmitter.next(this.grandTotal);

    //     // setTimeout(() => {

    //     // }, 0);

    //   });

    this.totalPriceService.getNavChangeEmitter().subscribe(
      (item) => {
        console.log('success');
        console.log('item', typeof item);
        this.grandTotal = item;
        this.testEmitter$.next(this.grandTotal);
        let data = this.testEmitter$.asObservable();
        console.log('data', data);
      },
      (error) => console.log('error', error)
    );

    this.addAddressForm = this.formBuilder.group({
      address: ['', [Validators.required]],
    });

    // this.letAddressData = this.activatedRoute.snapshot.data['event'].data.addressData;
    this.activatedRoute.data.subscribe(data => {
      this.letAddressData = data.event.data.addressData;
    });
    if (!this.letAddressData) {
      this.showAddressDiv = false
      // this.modalService.open('custom-modal-1')
    }
    this.bodyText = 'This text can be updated in modal 1';
  }

  valueChangeCart(value) {
    console.log('value grandtotal', value)
    this.grandTotal = value
    console.log(this.grandTotal)
  }


  get f() {
    return this.addAddressForm.controls;
  }

  pay() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log('token',token)
        checkout(token)
        // alert('Token Created!!');
      },
      // style: style
    });

    const checkout = async(token) => {
      console.log('token2',token)
      this.submitted = true;
      let url = 'checkout/checkoutcart'

      let sessionData: any = JSON.parse(localStorage.getItem('currentUser'))
      let user_id = sessionData.userId
      let reqObj = {
        user_id: user_id,
        token:token.id
      }

      try {
        let res = await this.AuthLoginService.postRequest(url, reqObj)
        if (res.status == 1) {

          // this.router.navigate(['/dashboard/check-out']);
          this.loading = false
          this.cartService.emitNavChangeEvent(0);
          let sessionData: any = JSON.parse(localStorage.getItem('currentUser'))
          let user_id = sessionData.userId
          let is_subscribed = sessionData.is_subscribed
          const responseData = {
            userId: user_id,
            token: token,
            is_subscribed: is_subscribed,
            cart_item_numbers: 0
          }
          console.log(responseData)
          localStorage.setItem('currentUser', JSON.stringify(responseData));
          this.toastr.success(res.message)
          this.router.navigate(['/dashboard']);
          this.showAddressDiv = true
        } else {
          this.loading = false
          this.toastr.warning(res.message)
        }
      } catch (error) {
        this.loading = false
        this.toastr.warning(error.message)
      }
    }

    var style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: 100 * 100,
      style: style
    });

  }

  loadStripe() {

    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_HMB6P5InISGR76T6aL5zsgjQ00KLFJxQqG',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }

      window.document.body.appendChild(s);
    }
  }

  async payment() {

  }

  async checkout(token) {
    this.submitted = true;
    let url = 'checkout/checkoutcart'

    let sessionData: any = JSON.parse(localStorage.getItem('currentUser'))
    let user_id = sessionData.userId
    let reqObj = {
      user_id: user_id,
      token:token
    }

    try {
      let res = await this.AuthLoginService.postRequest(url, reqObj)
      if (res.status == 1) {

        // this.router.navigate(['/dashboard']);
        this.loading = false

        this.toastr.success(res.message)
        this.showAddressDiv = true
      } else {
        this.loading = false
        this.toastr.warning(res.message)
      }
    } catch (error) {
      this.loading = false
      this.toastr.warning(error.message)
    }
  }

  public openConfirmationDialog(address) {
    if (address.is_default == 'yes') {
      return
    }
    let titleMsg = 'Please confirm..'
    let msg = 'Do you really want to set this default address?'
    let classSubmitbtn = 'submit-btn'
    this.confirmationDialogService.confirm(titleMsg, msg, classSubmitbtn)
      .then(async (confirmed) => {
        if (confirmed) {
          this.submitted = true;
          let url = 'address/setdefaultaddress'

          let sessionData: any = JSON.parse(localStorage.getItem('currentUser'))
          let user_id = sessionData.userId
          let reqObj = {
            address_id: address.id,
            user_id: user_id,
          }

          try {
            let res = await this.AuthLoginService.postRequest(url, reqObj)
            if (res.status == 1) {

              // this.router.navigate(['/dashboard/check-out']);
              this.router.navigateByUrl('/dashboard/check-out', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/dashboard/check-out']);
              });
              this.loading = false

              this.toastr.success(res.message)
              this.showAddressDiv = true
            } else {
              this.loading = false
              this.toastr.warning(res.message)
            }
          } catch (error) {
            this.loading = false
            this.toastr.warning(error.message)
          }
        }
      }).catch(() => {
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
      });
  }

  async onSubmit() {
    this.submitted = true;
    this.loading = true
    if (this.addAddressForm.invalid) {
      this.loading = false
      return;
    }
    this.submitted = true;
    let url = 'address/addaddress'

    let sessionData: any = JSON.parse(localStorage.getItem('currentUser'))
    let user_id = sessionData.userId
    let reqObj = {
      address: this.addAddressForm.value.address,
      user_id: user_id,
    }

    try {
      let res = await this.AuthLoginService.postRequest(url, reqObj)
      if (res.status == 1) {

        // this.router.navigate(['/dashboard/check-out']);
        this.router.navigateByUrl('/dashboard/check-out', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/dashboard/check-out']);
        });
        this.loading = false

        this.toastr.success(res.message)
        this.showAddressDiv = true
      } else {
        this.loading = false
        this.toastr.warning(res.message)
      }
    } catch (error) {
      this.loading = false
      this.toastr.warning(error.message)
    }
  }

}
