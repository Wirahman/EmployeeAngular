import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Component
import { LogActivitiesComponent } from './log-activities/log-activities.component';
import { DeleteLogActivitiesComponent } from './log-activities/delete-log-activities/delete-log-activities.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './pengguna/login/login.component';
import { PenggunaComponent } from './pengguna/pengguna.component';
import { CreatePenggunaComponent } from './pengguna/create-pengguna/create-pengguna.component';
import { UpdatePenggunaComponent } from './pengguna/update-pengguna/update-pengguna.component';

import { RoleComponent } from './role/role.component';
import { CreateRoleComponent } from './role/create-role/create-role.component';
import { UpdateRoleComponent } from './role/update-role/update-role.component';

import { PermissionComponent } from './permission/permission.component';
import { CreatePermissionComponent } from './permission/create-permission/create-permission.component';
import { UpdatePermissionComponent } from './permission/update-permission/update-permission.component';

import { DepartmentComponent } from './department/department.component';
import { CreateDepartmentComponent } from './department/create-department/create-department.component';
import { UpdateDepartmentComponent } from './department/update-department/update-department.component';

import { CodeSettingsComponent } from './code-settings/code-settings.component';
import { CreateCodeSettingsComponent } from './code-settings/create-code-settings/create-code-settings.component';
import { UpdateCodeSettingsComponent } from './code-settings/update-code-settings/update-code-settings.component';

import { PelangganComponent } from './pelanggan/pelanggan.component';
import { CreatePelangganComponent } from './pelanggan/create-pelanggan/create-pelanggan.component';
import { UpdatePelangganComponent } from './pelanggan/update-pelanggan/update-pelanggan.component';

import { KlinikComponent } from './klinik/klinik.component';
import { CreateKlinikComponent } from './klinik/create-klinik/create-klinik.component';
import { UpdateKlinikComponent } from './klinik/update-klinik/update-klinik.component';

import { UserClenicComponent } from './user-clenic/user-clenic.component';
import { CreateUserClenicComponent } from './user-clenic/create-user-clenic/create-user-clenic.component';
import { UpdateUserClenicComponent } from './user-clenic/update-user-clenic/update-user-clenic.component';

import { PackageHeaderComponent } from './package/package-header/package-header.component';
import { CreatePackageHeaderComponent } from './package/package-header/create-package-header/create-package-header.component';
import { UpdatePackageHeaderComponent } from './package/package-header/update-package-header/update-package-header.component';

import { PackageDetailComponent } from './package/package-detail/package-detail.component';
import { CreatePackageDetailComponent } from './package/package-detail/create-package-detail/create-package-detail.component';
import { UpdatePackageDetailComponent } from './package/package-detail/update-package-detail/update-package-detail.component';

import { TermOfPaymentsComponent } from './term-of-payments/term-of-payments.component';
import { CreateTermOfPaymentsComponent } from './term-of-payments/create-term-of-payments/create-term-of-payments.component';
import { UpdateTermOfPaymentsComponent } from './term-of-payments/update-term-of-payments/update-term-of-payments.component';

import { ContractHeaderComponent } from './contract/contract-header/contract-header.component';
import { CreateContractHeaderComponent } from './contract/contract-header/create-contract-header/create-contract-header.component';
import { UpdateContractHeaderComponent } from './contract/contract-header/update-contract-header/update-contract-header.component';

import { ContractDetailComponent } from './contract/contract-detail/contract-detail.component';
import { CreateContractDetailComponent } from './contract/contract-detail/create-contract-detail/create-contract-detail.component';
import { UpdateContractDetailComponent } from './contract/contract-detail/update-contract-detail/update-contract-detail.component';




const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  {
    path: 'Dashboard', 
    component: HeaderComponent ,
    children: [
      { path: '', component:  PenggunaComponent },
      { path: 'Pengguna', component:  PenggunaComponent },
      { path: 'CreatePengguna', component:  CreatePenggunaComponent },
      { path: 'UpdatePengguna/:id', component: UpdatePenggunaComponent },
    
      // Role
      { path: 'Role', component: RoleComponent },
      { path: 'CreateRole', component: CreateRoleComponent },
      { path: 'UpdateRole/:id', component: UpdateRoleComponent },
    
      // Permission
      { path: 'Permission', component: PermissionComponent },
      { path: 'CreatePermission', component: CreatePermissionComponent },
      { path: 'UpdatePermission/:id', component: UpdatePermissionComponent },
      
      // Department
      { path: 'Department', component: DepartmentComponent },
      { path: 'CreateDepartment', component: CreateDepartmentComponent },
      { path: 'UpdateDepartment/:id', component: UpdateDepartmentComponent },

      // Code Settings
      { path: 'CodeSettings', component: CodeSettingsComponent },
      { path: 'CreateCodeSettings', component: CreateCodeSettingsComponent },
      { path: 'UpdateCodeSettings/:id', component: UpdateCodeSettingsComponent },

      // Pelanggan
      { path: 'Pelanggan', component: PelangganComponent },
      { path: 'CreatePelanggan', component: CreatePelangganComponent },
      { path: 'UpdatePelanggan/:id', component: UpdatePelangganComponent },
    
      // Klinik
      { path: 'Klinik', component: KlinikComponent },
      { path: 'CreateKlinik', component: CreateKlinikComponent },
      { path: 'UpdateKlinik/:id', component: UpdateKlinikComponent },
    
      // Package User Clenic
      { path: 'UserClenic', component: UserClenicComponent },
      { path: 'CreateUserClenic', component: CreateUserClenicComponent },
      { path: 'UpdateUserClenic/:id', component: UpdateUserClenicComponent },
    
      // Package Header
      { path: 'PackageHeader', component: PackageHeaderComponent },
      { path: 'CreatePackageHeader', component: CreatePackageHeaderComponent },
      { path: 'UpdatePackageHeader/:id', component: UpdatePackageHeaderComponent },
    
      // Package Detail
      { path: 'PackageDetail', component: PackageDetailComponent },
      { path: 'CreatePackageDetail', component: CreatePackageDetailComponent },
      { path: 'UpdatePackageDetail/:id', component: UpdatePackageDetailComponent },
    
      // Term of Payments
      { path: 'TermsOfPayment', component: TermOfPaymentsComponent },
      { path: 'CreateTermsOfPayment', component: CreateTermOfPaymentsComponent },
      { path: 'UpdateTermsOfPayment/:id', component: UpdateTermOfPaymentsComponent },
    
      // Contract Header
      { path: 'ContractHeader', component: ContractHeaderComponent },
      { path: 'CreateContractHeader', component: CreateContractHeaderComponent },
      { path: 'UpdateContractHeader/:id', component: UpdateContractHeaderComponent },
    
      // Contract Detail
      { path: 'ContractDetail', component: ContractDetailComponent },
      { path: 'CreateContractDetail', component: CreateContractDetailComponent },
      { path: 'UpdateContractDetail/:id', component: UpdateContractDetailComponent },
    
      // Log Activities
      { path: 'LogActivities', component: LogActivitiesComponent },
      { path: 'DeleteLogActivities', component: DeleteLogActivitiesComponent },
  ]},

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
