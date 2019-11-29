import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

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
        console.log('data', data);
      }, (err) => {
        console.log('err', err);
      });
  }
}
