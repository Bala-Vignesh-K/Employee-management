import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, take, exhaustMap } from 'rxjs/operators'
import { AdminLoginService } from './admin-login.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user.model';

// This service is for the admin-add-employee component


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  user = new BehaviorSubject<User|null>(null);

  constructor(private http: HttpClient, private authservice: AdminLoginService) { }

  addEmployee(data: any){
    return this.http.post<any>("http://127.0.0.1:8000/employee",data)
    .pipe(map((res: any)=>{
      return res;
    }));
  }

  editEmployee( id: number, data: any){
    return this.http.put<any>("http://127.0.0.1:8000/employee/"+id,data)
    .pipe(map((res: any)=>{
      return res;
    }));
  }

  getEmployee(){
    return this.http.get<any>("http://127.0.0.1:8000/employee")
    .pipe(map((res: any)=>{
      return res;
    }));
  }

  // getEmployee(){
  //   return this.authservice.user.pipe(
  //     take(1),
  //     exhaustMap(user=>{
  //       return this.http.get<any>("http://127.0.0.1:8000/employee")
  //     }))
  //   return this.http.get<any>("http://127.0.0.1:8000/employee")
  //   .pipe(map((res: any)=>{
  //     return res;
  //   }));
  // }

  // return this.authservice.user.pipe(take(1))

  removeEmployee(id: number){
    return this.http.delete<any>("http://127.0.0.1:8000/employee/"+id)
    .pipe(map((res: any)=>{
      return res;
    }));
  }


}
