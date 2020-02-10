import { Component, OnInit } from '@angular/core';
import { NbSidebarModule, NbLayoutModule, NbSidebarService } from '@nebular/theme';
import { ChangePasswordComponent } from '../change-password/change-password.component'
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../../environments/environment";
import { ConfirmationDialogService } from '../helper-components/confirmation-dialog/confirmation-dialog.service';
import { AuthLoginService } from "../../_services/auth.service";
import { ToastrService } from 'ngx-toastr';
import {CartService} from '../dashboard-layouts/cart.service';

@Component({
  selector: 'app-dashboard-layouts',
  templateUrl: './dashboard-layouts.component.html',
  styleUrls: ['./dashboard-layouts.component.scss']
})
export class DashboardLayoutsComponent implements OnInit {
  faCoffee = faCoffee;
  pdfUrl = `${environment.pfdUrl}`
  locateUsUrl = 'locate-us'
  cartListUrl = 'cart-list'
  loading = false
  submitted = false
  updateProfile = 'dashboard/update-profile';
  constructor(NbSidebarModule: NbSidebarModule,
    NbLayoutModule: NbLayoutModule,
    protected router: Router,
    private AuthLoginService: AuthLoginService,
    private toastr: ToastrService,
    private confirmationDialogService: ConfirmationDialogService,
    private CartService:CartService,
    NbSidebarService: NbSidebarService) { }
  sessionData: any = JSON.parse(localStorage.getItem('currentUser'))
  is_subscribed = this.sessionData.is_subscribed
  cart_item_numbers = this.sessionData.cart_item_numbers
  observableCartNumbers
  ngOnInit() {
    this.observableCartNumbers = this.CartService.getNavChangeEmitter()
      .subscribe(item => {
        console.log('item',item);
        this.valueChangeCart(item)
      });
      console.log(this.cart_item_numbers)
  }

  valueChangeCart(value){
    console.log('value',value)
    this.cart_item_numbers = value
  }

  async logout(){
    let res:any = await localStorage.clear()
    let res2:any = this.AuthLoginService.currentUserSubject.next({
      id: null,
      password: null, 
      first_name: null, 
      last_name: null,
      is_subscribed:null,
      cart_item_numbers:null
    });
    // if(this.AuthLoginService.currentUser){
      this.router.navigate(['/']);
    // } 
  }

  public openConfirmationDialog(subscribe) {
    let subscribeFlag
    let msg
    let sentSubFlag
    console.log('subscribe', subscribe);
    if (subscribe) {
      subscribeFlag = 'Subscribe'
      // this.is_subscribed = true
      sentSubFlag = 'yes'
      msg = subscribeFlag + ' our website and get latest notifications.'
    } else {
      // this.is_subscribed = false 
      subscribeFlag = 'Un Subscribe'
      sentSubFlag = 'no'
      msg = 'Are you sure you want to ' + subscribeFlag + '.?'
    }
    let titleMsg = 'Please confirm..'
    let classSubmitbtn = 'submit-btn'
    this.confirmationDialogService.confirm(titleMsg, msg, classSubmitbtn)
      .then(async (confirmed) => {
        if (confirmed) {
          try {
            this.submitted = true;
            let url = 'user/subscribemanage'
            let sessionData: any = JSON.parse(localStorage.getItem('currentUser'))
            let user_id = sessionData.userId
            let token = sessionData.token
            let is_subscribed = sessionData.is_subscribed

            let reqObj = {
              id: user_id,
              subscribe: sentSubFlag
            }
            let res = await this.AuthLoginService.postRequest(url, reqObj);
            console.log('this.is_subscribed', this.is_subscribed);
            if (res.status == 1) {
              this.is_subscribed = subscribe;
              console.log('this.is_subscribed', this.is_subscribed);
              const responseData = {
                userId: user_id,
                token: token,
                is_subscribed: subscribe
              }
              console.log(responseData)
              localStorage.setItem('currentUser', JSON.stringify(responseData));

              this.toastr.success(res.message)
              console.log(subscribe)
              if(subscribe){
                this.router.navigate(['/dashboard/subscribe']);
              }
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
