import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    let userObj = {
      username: username,
      password: password
    };
    
    let URL = "user/api/Account/login";
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
      ).subscribe((data) => {
        console.log('data', userObj);
        localStorage.setItem('currentUser', JSON.stringify(userObj));
        // this.currentUserSubject.next(userObj);
      }, (err) => {
        console.log('err', err);
      });
  }
}
