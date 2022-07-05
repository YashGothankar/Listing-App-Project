import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentAddEditComponent } from './components/department-add-edit/department-add-edit.component';
import { DepartmentListingComponent } from './components/department-listing/department-listing.component';
import { EmployeeAddEditComponent } from './components/employee-add-edit/employee-add-edit.component';
import { EmployeeListingComponent } from './components/employee-listing/employee-listing.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'department', component: DepartmentListingComponent },
      { path: 'employee', component: EmployeeListingComponent },
      { path: 'department/:task', component: DepartmentAddEditComponent },
      { path: 'employee/:task', component: EmployeeAddEditComponent }
    ]
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
