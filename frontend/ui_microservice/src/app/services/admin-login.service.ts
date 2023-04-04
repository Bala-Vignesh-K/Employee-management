import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AdminLoginModel } from '../admin-login/admin-login.model';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {


  user = new BehaviorSubject<User|null>(null);

  constructor(private http: HttpClient) { }

  // adminLoginMethod(data: AdminLoginModel){
  //   return this.http.post<any>("http://127.0.0.1:8000/admin-login",data)
  //   .pipe(map((res: any)=>{
  //     return res;
  //   }));
  // }

  adminLoginMethod(data: AdminLoginModel){
    return this.http.post<any>("http://127.0.0.1:8000/admin-login", data)
    .pipe(map(res=>{
      return res;
    }))
  }

  handleAuthentication(email: string, id: string, token_type: string , token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 60000);
    const user = new User(email, id, token, token_type, expirationDate);
    this.user.next(user);
  }

}
