import {UserModel} from './user.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {
  loggedUser: UserModel;

  constructor(private http: HttpClient) {
  }
}
