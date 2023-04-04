import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddEmployeeComponent } from './admin-add-employee/admin-add-employee.component';
import { AdminAddManagerComponent } from './admin-add-manager/admin-add-manager.component';
import { AdminAddAdminComponent } from './admin-add-admin/admin-add-admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { ManagerLoginComponent } from './manager-login/manager-login.component';
import { HomePageComponent } from './home-page/home-page.component';



const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'home', component: HomePageComponent},
  {path:'employee-login', component: EmployeeLoginComponent},
  {path:'manager-login', component: ManagerLoginComponent},
  {path:'admin-login', component: AdminLoginComponent},
  {path:'employee', component: AdminAddEmployeeComponent},
  {path:'manager', component: AdminAddManagerComponent},
  {path:'admin', component: AdminAddAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
