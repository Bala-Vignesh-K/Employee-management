import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ManagerLoginModel } from './manager-login.model';

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.css']
})
export class ManagerLoginComponent implements OnInit{

  managerLoginForm !: FormGroup;
  managerLoginObject: ManagerLoginModel = new ManagerLoginModel;

  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router) {}


  ngOnInit(): void {
    this.managerLoginForm = this.formbuilder.group({
      username : [''],
      password : ['']
    });
  }

  onLogin(){
    const formData = new FormData();
    formData.append('username', this.managerLoginForm.value.username);
    formData.append('password', this.managerLoginForm.value.username);
    this.http.post<any>("http://127.0.0.1:8000/manager-login",formData)
    .subscribe(res=>{
      console.log(res);
      alert("Login successful!");
      this.managerLoginForm.reset();
      this.router.navigate([''])
    },
    err=>{
      console.log(err)
    })
  }

}
