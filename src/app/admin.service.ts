import {HttpClient, HttpHeaders} from '@angular/common/http';
import { LoginModel } from './_model/login.model';
import {Injectable, OnInit} from '@angular/core';
import {BaseUrl} from './_enum/BaseUrl.enum';
import {AuthenticationService} from './authentication.service';
import {UserModel} from './_model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  logins: LoginModel[];
  users: UserModel[];
  totalBalance: number;

  constructor(private http: HttpClient,
              public authService: AuthenticationService) {}

  fetchTotalBalance() {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken()
      })};

    this.http.get<number>(
      BaseUrl.BASEURL + '/api/v1/admin/totalBalance', httpOptions
    ).subscribe(
      (data: number) => {
        this.totalBalance = data;
      },
      error => console.log(JSON.stringify(error))
    );
  }

  fetchLogins() {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken()
    })};

    this.http.get<LoginModel[]>(
      BaseUrl.BASEURL + '/api/v1/admin/logins', httpOptions
    ).subscribe(
      (data: LoginModel[]) => {
        this.logins = data.reverse();
      },
      error => console.log(JSON.stringify(error))
    );
  }

  fetchUsers() {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken()
      })};

    this.http.get<UserModel[]>(
      BaseUrl.BASEURL + '/api/v1/user/all', httpOptions
    ).subscribe(
      (data: UserModel[]) => {
        this.users = data;
      },
      error => console.log(JSON.stringify(error))
    );
  }

  deleteUser(id: number) {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/json'
    })};
    this.http.delete<UserModel>(
      BaseUrl.BASEURL + '/api/v1/user/' + id, httpOptions
    ).subscribe(
      (data: UserModel) => {

        // this.users.splice(this.users.indexOf(data), 1);
        this.users = this.users.filter(i => i.id !== id);
      },
      error => console.log(JSON.stringify(error))
    );
  }

}
