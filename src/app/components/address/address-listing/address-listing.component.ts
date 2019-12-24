import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmationDialogService } from '../../helper-components/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from "../../../_services/auth.service";
import { async } from '@angular/core/testing';
import {EncrDecrService} from '../../../_services/encr-decr.service';

@Component({
  selector: 'app-address-listing',
  templateUrl: './address-listing.component.html',
  styleUrls: ['./address-listing.component.scss']
})
export class AddressListingComponent implements OnInit {
  letAddressData = []
  loading = false
  submitted = false
  constructor(
    private activatedRoute: ActivatedRoute,
    private confirmationDialogService: ConfirmationDialogService,
    private AuthService: AuthService,
    private toastr: ToastrService,
    protected router: Router,
    private EncrDecr: EncrDecrService
  ) { }

  ngOnInit() {
    // this.letAddressData = this.activatedRoute.snapshot.data['event'].data.addressData;
    this.activatedRoute.data.subscribe(data => {
      console.log(data)
      this.letAddressData = data.event.data.addressData;
    });

    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'password@123456');
    var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', encrypted);
   
    console.log('Encrypted :' + encrypted);
    console.log('Decrypted :' + decrypted);
  }

  public addAddress() {
    console.log("here")
    this.router.navigate(['dashboard/addres-add']);
  }

  editAddress(address){
    let encrypted = this.EncrDecr.set('123456$#@$^@1ERF', address.id);
    //var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', encrypted);
   
    console.log('Encrypted :' + encrypted);
    // console.log('Decrypted :' + decrypted);
    this.router.navigate(['/dashboard/addres-add/'+encrypted]);
  }

  public openConfirmationDialog(address) {
    console.log(address.id)
    let titleMsg = 'Please confirm..'
    let msg = 'Do you really want to delete this address?'
    let classSubmitbtn = 'submit-btn'
    this.confirmationDialogService.confirm(titleMsg, msg, classSubmitbtn)
      .then(async (confirmed) => {
        if (confirmed) {
          try {
            this.submitted = true;
            let url = 'address/delete'
            let sessionData: any = JSON.parse(localStorage.getItem('currentUser'))
            let user_id = sessionData.userId

            let reqObj = {
              address_id: address.id,
              user_id: user_id
            }
            let res = await this.AuthService.postRequest(url, reqObj);
            if (res.status == 1) {
              this.router.navigate(['/dashboard/addres-list']);
              this.toastr.success(res.message)
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

}
