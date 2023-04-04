import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddManagerApiService } from '../services/add-manager-api.service';
import { AdminAddManagerModel } from './admin-add-manager.model';

@Component({
  selector: 'app-admin-add-manager',
  templateUrl: './admin-add-manager.component.html',
  styleUrls: ['./admin-add-manager.component.scss']
})
export class AdminAddManagerComponent {

  addManagerFormValue !: FormGroup;
  addManagerObject: AdminAddManagerModel = new AdminAddManagerModel;
  public managerList !: any;
  clickedAdd !: boolean;
  clickedUpdate !: boolean;
  
  title = 'admin-panel-layout';
  sideBarOpen = false;

  
  constructor(private formbuilder: FormBuilder, private api: AddManagerApiService) {}
  
  
  ngOnInit(): void {
    this.addManagerFormValue = this.formbuilder.group({
      full_name : [''],
      email : [''],
      mobile : [''],
      password: ['']
    });
  
    this.getAllManager();
    
  }
  
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  postManager(){
    this.clickedAdd = true;
    this.addManagerObject.full_name = this.addManagerFormValue.value.full_name;
    this.addManagerObject.email = this.addManagerFormValue.value.email;
    this.addManagerObject.mobile = this.addManagerFormValue.value.mobile;
    this.addManagerObject.password = this.addManagerFormValue.value.password;
  
    this.api.addManager(this.addManagerObject)
    .subscribe(res=>{
      console.log(res);
      alert("Manager added successfully!");
      this.addManagerFormValue.reset();
      document.getElementById("closemodal")?.click();
      this.getAllManager();
      this.clickedAdd = false;
    },
    err=>{
      alert("Something went wrong")
    });
  }
  
  addManagerButton(){
    this.addManagerFormValue.reset();
    this.clickedAdd = true;
    this.clickedUpdate = false;
  }
  
  getAllManager(){
    this.api.getManager()
    .subscribe(res=>{
      console.log(res)
      this.managerList = res;
    })
  }
  
  deleteManager(row: any){
    this.api.removeManager(row.id)
    .subscribe(res=>{
      alert("Manager deleted!");
      this.getAllManager();
    })
  }
  
  onEdit(row: any){
    this.clickedAdd = false;
    this.clickedUpdate = true;
    this.addManagerObject.id = row.id;
    this.addManagerFormValue.controls['full_name'].setValue(row.full_name);
    this.addManagerFormValue.controls['email'].setValue(row.email);
    this.addManagerFormValue.controls['mobile'].setValue(row.mobile);
  }
  
  modifyManager(){
    this.clickedUpdate = true
    this.addManagerObject.full_name = this.addManagerFormValue.value.full_name;
    this.addManagerObject.email = this.addManagerFormValue.value.email;
    this.addManagerObject.mobile = this.addManagerFormValue.value.mobile;
  
    this.api.editManager( Number(this.addManagerObject.id), this.addManagerObject)
    .subscribe(res=>{
      console.log(res);
      alert("Updated successfully!");
      this.addManagerFormValue.reset();
      document.getElementById("closemodal")?.click();
      this.getAllManager();
      this.clickedUpdate = false;
    },
    err=>{
      alert("Something went wrong")
    });
  }

}
