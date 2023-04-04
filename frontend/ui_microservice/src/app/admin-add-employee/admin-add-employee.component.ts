import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AdminAddEmployeeModel } from './admin-add-employee.model';

@Component({
  selector: 'app-admin-add-employee',
  templateUrl: './admin-add-employee.component.html',
  styleUrls: ['./admin-add-employee.component.scss']
})

export class AdminAddEmployeeComponent implements OnInit{

addEmployeeFormValue !: FormGroup;
addEmployeeObject: AdminAddEmployeeModel = new AdminAddEmployeeModel;
public employeeList !: any;
clickedAdd !: boolean;
clickedUpdate !: boolean;

title = 'admin-panel-layout';
sideBarOpen = false;


constructor(private formbuilder: FormBuilder, private api: ApiService) {}


ngOnInit(): void {
  this.addEmployeeFormValue = this.formbuilder.group({
    full_name : [''],
    email : [''],
    mobile : [''],
    password :['']
  });

  this.getAllEmployee();
  
}

sideBarToggler() {
  this.sideBarOpen = !this.sideBarOpen;
}


postEmployee(){
  this.clickedAdd = true;
  this.addEmployeeObject.full_name = this.addEmployeeFormValue.value.full_name;
  this.addEmployeeObject.email = this.addEmployeeFormValue.value.email;
  this.addEmployeeObject.mobile = this.addEmployeeFormValue.value.mobile;
  this.addEmployeeObject.password = this.addEmployeeFormValue.value.password;

  this.api.addEmployee(this.addEmployeeObject)
  .subscribe(res=>{
    console.log(res);
    alert("Employee added successfully!");
    this.addEmployeeFormValue.reset();
    document.getElementById("closemodal")?.click();
    this.getAllEmployee();
    this.clickedAdd = false;
  },
  err=>{
    alert("Something went wrong")
  });
}

addEmployeeButton(){
  this.addEmployeeFormValue.reset();
  this.clickedAdd = true;
  this.clickedUpdate = false;
}

getAllEmployee(){
  this.api.getEmployee()
  .subscribe(res=>{
    console.log(res)
    this.employeeList = res;
  })
}

deleteEmployee(row: any){
  this.api.removeEmployee(row.id)
  .subscribe(res=>{
    alert("Employee deleted!");
    this.getAllEmployee();
  })
}

onEdit(row: any){
  this.clickedAdd = false;
  this.clickedUpdate = true;
  this.addEmployeeObject.id = row.id;
  this.addEmployeeFormValue.controls['full_name'].setValue(row.full_name);
  this.addEmployeeFormValue.controls['email'].setValue(row.email);
  this.addEmployeeFormValue.controls['mobile'].setValue(row.mobile);
}

modifyEmployee(){
  this.clickedUpdate = true
  this.addEmployeeObject.full_name = this.addEmployeeFormValue.value.full_name;
  this.addEmployeeObject.email = this.addEmployeeFormValue.value.email;
  this.addEmployeeObject.mobile = this.addEmployeeFormValue.value.mobile;

  this.api.editEmployee( Number(this.addEmployeeObject.id), this.addEmployeeObject)
  .subscribe(res=>{
    console.log(res);
    alert("Updated successfully!");
    this.addEmployeeFormValue.reset();
    document.getElementById("closemodal")?.click();
    this.getAllEmployee();
    this.clickedUpdate = false;
  },
  err=>{
    alert("Something went wrong")
  });
}

}
