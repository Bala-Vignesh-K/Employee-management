import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeLoginModel } from './employee-login.model';


@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit{

  employeeLoginForm !: FormGroup;
  employeeLoginObject: EmployeeLoginModel = new EmployeeLoginModel;

  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router) {}


  ngOnInit(): void {
    this.employeeLoginForm = this.formbuilder.group({
      username : [''],
      password : ['']
    });
  }

  onLogin(){
    const formData = new FormData();
    formData.append('username', this.employeeLoginForm.value.username);
    formData.append('password', this.employeeLoginForm.value.username);
    this.http.post<any>("http://127.0.0.1:8000/employee-login",formData)
    .subscribe(res=>{
      console.log(res);
      alert("Login successful!");
      this.employeeLoginForm.reset();
      this.router.navigate([''])
    },
    err=>{
      console.log(err)
    })
  }
}
