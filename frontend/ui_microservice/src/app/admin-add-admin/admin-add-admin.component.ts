import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { AddAdminApiService } from '../services/add-admin-api.service';
import { AdminAddAdminModel } from './admin-add-admin.model';

@Component({
  selector: 'app-admin-add-admin',
  templateUrl: './admin-add-admin.component.html',
  styleUrls: ['./admin-add-admin.component.scss']
})
export class AdminAddAdminComponent {

  addAdminFormValue !: FormGroup;
  addAdminObject: AdminAddAdminModel = new AdminAddAdminModel;
  public adminList !: any;
  clickedAdd !: boolean;
  clickedUpdate !: boolean;
  
  title = 'admin-panel-layout';
  sideBarOpen = false;
  
  constructor(private formbuilder: FormBuilder, private api: AddAdminApiService) {}
  
  
  ngOnInit(): void {
    this.addAdminFormValue = this.formbuilder.group({
      full_name : [''],
      email : [''],
      mobile : [''],
      password:['']
    });
  
    this.getAllAdmin();
    
  }
  
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  postAdmin(){
    this.clickedAdd = true;
    this.addAdminObject.full_name = this.addAdminFormValue.value.full_name;
    this.addAdminObject.email = this.addAdminFormValue.value.email;
    this.addAdminObject.mobile = this.addAdminFormValue.value.mobile;
    this.addAdminObject.password = this.addAdminFormValue.value.password;
  
    this.api.addAdmin(this.addAdminObject)
    .subscribe(res=>{
      console.log(res);
      alert("Admin added successfully!");
      this.addAdminFormValue.reset();
      document.getElementById("closemodal")?.click();
      this.getAllAdmin();
      this.clickedAdd = false;
    },
    err=>{
      alert("Something went wrong")
    });
  }
  
  addAdminButton(){
    this.addAdminFormValue.reset();
    this.clickedAdd = true;
    this.clickedUpdate = false;
  }
  
  getAllAdmin(){
    this.api.getAdmin()
    .subscribe(res=>{
      console.log(res)
      this.adminList = res;
    })
  }
  
  deleteAdmin(row: any){
    this.api.removeAdmin(row.id)
    .subscribe(res=>{
      alert("Admin deleted!");
      this.getAllAdmin();
    })
  }
  
  onEdit(row: any){
    this.clickedAdd = false;
    this.clickedUpdate = true;
    this.addAdminObject.id = row.id;
    this.addAdminFormValue.controls['full_name'].setValue(row.full_name);
    this.addAdminFormValue.controls['email'].setValue(row.email);
    this.addAdminFormValue.controls['mobile'].setValue(row.mobile);
  }
  
  modifyAdmin(){
    this.clickedUpdate = true
    this.addAdminObject.full_name = this.addAdminFormValue.value.full_name;
    this.addAdminObject.email = this.addAdminFormValue.value.email;
    this.addAdminObject.mobile = this.addAdminFormValue.value.mobile;
  
    this.api.editAdmin( Number(this.addAdminObject.id), this.addAdminObject)
    .subscribe(res=>{
      console.log(res);
      alert("Updated successfully!");
      this.addAdminFormValue.reset();
      document.getElementById("closemodal")?.click();
      this.getAllAdmin();
      this.clickedUpdate = false;
    },
    err=>{
      alert("Something went wrong")
    });
  }

}
