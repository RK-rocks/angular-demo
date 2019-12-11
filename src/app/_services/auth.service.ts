import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(userObj) {
    let URL = "login";
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = {
      headers: headers
    };
    return this.http
      .post<any>(
        `${environment.apiUrl}/${URL}`,
        JSON.stringify(userObj),
        options
      ).pipe(map(data  => {
        console.log('data', data);
        // const responseData = {
        //   userId: data.data.userData.user_id,
        //   token: data.data.userData.token
        // }
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.toastr.success(data.message)
        // this.currentUserSubject.next(responseData);
      }, (err) => {
        console.log('err', err);
      }));
  }

  postRequest(url,userObj){
    let URL = url;
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = {
      headers: headers
    };
  let promise;
    promise= new Promise((resolve, reject) => {
      this.http
        .post<any>(
          `${environment.apiUrl}/${URL}`,
          JSON.stringify(userObj),
          options
        ).subscribe((data) => {
          resolve(data);
        }, (err) => {
          console.log('err', err);
          reject(err);
        });
    });
    return promise;
  }
}
