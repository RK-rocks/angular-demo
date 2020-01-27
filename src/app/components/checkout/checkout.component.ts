import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmationDialogService } from '../helper-components/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { AuthLoginService } from "../../_services/auth.service";
import { async } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EncrDecrService } from '../../_services/encr-decr.service';
// import { ModalService } from '../../_services/modal.service';
import { trigger, state, transition, style, animate } from '@angular/animations';

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
  addAddressForm
  constructor(
    private activatedRoute: ActivatedRoute,
    private confirmationDialogService: ConfirmationDialogService,
    private AuthLoginService: AuthLoginService,
    private toastr: ToastrService,
    protected router: Router,
    private EncrDecr: EncrDecrService,
    // private modalService: ModalService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    console.log("in ngonit")
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

  get f() {
    return this.addAddressForm.controls;
  }

  public openConfirmationDialog(address) {
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
