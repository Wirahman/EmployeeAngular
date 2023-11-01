import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CdsModule } from '@cds/angular';
import { ClarityModule } from "@clr/angular";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';



// Component
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './pengguna/login/login.component';
import { PenggunaComponent } from './pengguna/pengguna.component';
import { CreatePenggunaComponent } from './pengguna/create-pengguna/create-pengguna.component';
import { UpdatePenggunaComponent } from './pengguna/update-pengguna/update-pengguna.component';
import { PopupComponent } from './popup/popup.component';
import { ModalsComponent } from './modals/modals.component';
import { RoleComponent } from './role/role.component';
import { CreateRoleComponent } from './role/create-role/create-role.component';
import { UpdateRoleComponent } from './role/update-role/update-role.component';
import { CreatePermissionComponent } from './permission/create-permission/create-permission.component';
import { UpdatePermissionComponent } from './permission/update-permission/update-permission.component';
import { PermissionComponent } from './permission/permission.component';
import { ResetPasswordComponent } from './pengguna/reset-password/reset-password.component';
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
import { PackageHeaderComponent } from './package/package-header/package-header.component';
import { CreatePackageHeaderComponent } from './package/package-header/create-package-header/create-package-header.component';
import { UpdatePackageHeaderComponent } from './package/package-header/update-package-header/update-package-header.component';
import { PackageDetailComponent } from './package/package-detail/package-detail.component';
import { CreatePackageDetailComponent } from './package/package-detail/create-package-detail/create-package-detail.component';
import { UpdatePackageDetailComponent } from './package/package-detail/update-package-detail/update-package-detail.component';
import { UserClenicComponent } from './user-clenic/user-clenic.component';
import { CreateUserClenicComponent } from './user-clenic/create-user-clenic/create-user-clenic.component';
import { UpdateUserClenicComponent } from './user-clenic/update-user-clenic/update-user-clenic.component';
import { TermOfPaymentsComponent } from './term-of-payments/term-of-payments.component';
import { CreateTermOfPaymentsComponent } from './term-of-payments/create-term-of-payments/create-term-of-payments.component';
import { UpdateTermOfPaymentsComponent } from './term-of-payments/update-term-of-payments/update-term-of-payments.component';
import { ContractHeaderComponent } from './contract/contract-header/contract-header.component';
import { CreateContractHeaderComponent } from './contract/contract-header/create-contract-header/create-contract-header.component';
import { UpdateContractHeaderComponent } from './contract/contract-header/update-contract-header/update-contract-header.component';
import { ContractDetailComponent } from './contract/contract-detail/contract-detail.component';
import { CreateContractDetailComponent } from './contract/contract-detail/create-contract-detail/create-contract-detail.component';
import { UpdateContractDetailComponent } from './contract/contract-detail/update-contract-detail/update-contract-detail.component';
import { LogActivitiesComponent } from './log-activities/log-activities.component';
import { DeleteLogActivitiesComponent } from './log-activities/delete-log-activities/delete-log-activities.component';
import { GlobalComponent } from './global/global.component';
import { EmployeeComponent } from './employee/employee.component';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    PenggunaComponent,
    CreatePenggunaComponent,
    UpdatePenggunaComponent,
    PopupComponent,
    ModalsComponent,
    RoleComponent,
    CreateRoleComponent,
    UpdateRoleComponent,
    CreatePermissionComponent,
    UpdatePermissionComponent,
    PermissionComponent,
    ResetPasswordComponent,
    DepartmentComponent,
    CreateDepartmentComponent,
    UpdateDepartmentComponent,
    CodeSettingsComponent,
    CreateCodeSettingsComponent,
    UpdateCodeSettingsComponent,
    PelangganComponent,
    CreatePelangganComponent,
    UpdatePelangganComponent,
    KlinikComponent,
    CreateKlinikComponent,
    UpdateKlinikComponent,
    PackageHeaderComponent,
    CreatePackageHeaderComponent,
    UpdatePackageHeaderComponent,
    PackageDetailComponent,
    CreatePackageDetailComponent,
    UpdatePackageDetailComponent,
    UserClenicComponent,
    CreateUserClenicComponent,
    UpdateUserClenicComponent,
    TermOfPaymentsComponent,
    CreateTermOfPaymentsComponent,
    UpdateTermOfPaymentsComponent,
    ContractHeaderComponent,
    CreateContractHeaderComponent,
    UpdateContractHeaderComponent,
    ContractDetailComponent,
    CreateContractDetailComponent,
    UpdateContractDetailComponent,
    LogActivitiesComponent,
    DeleteLogActivitiesComponent,
    GlobalComponent,
    EmployeeComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule, 
    CdsModule, 
    BrowserAnimationsModule,
    NgbModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    ClarityModule,
    ToastrModule.forRoot({
      timeOut: 800,
      progressBar: true,
      onActivateTick: true,
      enableHtml: true,
    }),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
