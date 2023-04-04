import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminLoginService } from '../services/admin-login.service';
import { AdminLoginModel } from './admin-login.model';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  adminLoginForm !: FormGroup;
  adminLoginObject: AdminLoginModel = new AdminLoginModel;

  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router, private api: AdminLoginService) {}

  ngOnInit(): void {
    this.adminLoginForm = this.formbuilder.group({
      username : [''],
      password : ['']
    });
  }

  // onLogin(){
  //   this.http.get<any>("http://127.0.0.1:8000/admin")
  //   .subscribe(res=>{
  //     const user = res.find((a:any)=>{
  //       return a.email === this.adminLoginForm.value.email && a.password === this.adminLoginForm.value.password
  //     });
  //     if (user){
  //       alert("Login successful!");
  //       this.adminLoginForm.reset();
  //       this.router.navigate(['employee'])
  //     }else{
  //       alert("Admin not found!")
  //     }
  //   }, err=>{
  //     alert("Something went wrong!")
  //   })
  // }

  // onLogin(){
    // const formData = new FormData();
    // formData.append('username', this.adminLoginForm.value.username);
    // formData.append('password', this.adminLoginForm.value.username);
  //   // this.adminLoginObject.username = this.adminLoginForm.value.username;
  //   // this.adminLoginObject.password = this.adminLoginForm.value.password;
    
  //   this.api.adminLoginMethod(this.formData)
  //   .subscribe(res =>{
  //     console.log(res);
  //   },
  //   err=>{
  //     alert("Something went wrong!");
  //     console.log(err)
  //   });
  // }


  onLogin(){
    const formData = new FormData();
    formData.append('username', this.adminLoginForm.value.username);
    formData.append('password', this.adminLoginForm.value.username);
    this.http.post<any>("http://127.0.0.1:8000/admin-login",formData)
    .pipe(tap(resData=>{
      this.api.handleAuthentication(resData.email, resData.id, resData.token, resData.token_type, +resData.expiresIn)
    }))
    .subscribe(res=>{
      console.log(res);
      alert("Login successful!");
      this.adminLoginForm.reset();
      this.router.navigate(['admin'])
    },
    err=>{
      console.log(err)
    })
  }

  // onLogin(){
  //   const formData = new FormData();
  //   formData.append('username', this.adminLoginForm.value.username);
  //   formData.append('password', this.adminLoginForm.value.username);
  //   this.api.adminLoginMethod(formData)
  //   .subscribe(res=>{
  //     console.log(res)
  //   },
  //   err=>{
  //     console.log(err)
  //   })
  // }


}

