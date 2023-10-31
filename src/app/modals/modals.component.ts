import { Component, OnInit, Output, EventEmitter, Renderer2, RendererFactory2, ElementRef, } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// Component
// import { PelangganComponent } from '../pelanggan/pelanggan.component';
import { RoleComponent } from 'src/app/role/role.component';
import { PermissionComponent } from 'src/app/permission/permission.component';
import { PenggunaComponent } from 'src/app/pengguna/pengguna.component';
import { DepartmentComponent } from '../department/department.component';
import { CodeSettingsComponent } from '../code-settings/code-settings.component';
import { PelangganComponent } from '../pelanggan/pelanggan.component';
import { KlinikComponent } from '../klinik/klinik.component';
import { UserClenicComponent } from '../user-clenic/user-clenic.component';
import { PackageHeaderComponent } from '../package/package-header/package-header.component';
import { PackageDetailComponent } from '../package/package-detail/package-detail.component';
import { TermOfPaymentsComponent } from '../term-of-payments/term-of-payments.component';
import { ContractHeaderComponent } from '../contract/contract-header/contract-header.component';
import { ContractDetailComponent } from '../contract/contract-detail/contract-detail.component';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();

  show = false;
  id: any;
  judulModal: any;
  bodyMessage: any;
  statusButtonDelete: boolean | undefined;
  statusButtonResetPassword: boolean | undefined;
  gambarModal: any;
  statusGambar: boolean | undefined;
  jenisFunction: any;

  constructor(
    private snackBar: MatSnackBar,
    private renderer:Renderer2,
    private el:ElementRef,
    // private pelangganComponent: PelangganComponent,
    private roleComponent: RoleComponent,
    private permissionComponent: PermissionComponent,
    private penggunaComponent: PenggunaComponent,
    private departmentComponent: DepartmentComponent,
    private codeSettingsComponent: CodeSettingsComponent,
    private pelangganComponent: PelangganComponent,
    private klinikComponent: KlinikComponent,
    private userClenicComponent: UserClenicComponent,
    private packageHeaderComponent: PackageHeaderComponent,
    private packageDetailComponent: PackageDetailComponent,
    private termOfPaymentsComponent: TermOfPaymentsComponent,
    private contractHeaderComponent: ContractHeaderComponent,
    private contractDetailComponent: ContractDetailComponent
    
  ) { }

  ngOnInit(): void {
    
  }

  open(id:any, judulModal: any, bodyMessage: any, gambarModal: any, statusButtonDelete: boolean, statusButtonResetPassword: boolean, statusGambar: boolean, jenisFunction: any) {
    this.id = id;
    this.judulModal = judulModal;
    this.bodyMessage = bodyMessage;
    this.gambarModal = gambarModal;
    this.statusButtonDelete = statusButtonDelete;
    this.statusButtonResetPassword = statusButtonResetPassword;
    this.statusGambar = statusGambar;
    this.jenisFunction = jenisFunction;

    this.show = true;
  }

  functionHapus(jenisFunction: any, id:any){
    if(jenisFunction == 'user'){
      this.penggunaComponent.hapusUser(id);
      this.close();
    }else if(jenisFunction == 'reset-password-user'){
      this.penggunaComponent.resetPassword(id);
      this.close();
    }else if(jenisFunction == 'pelanggan'){
      this.pelangganComponent.hapusPelanggan(id);
      this.close();
    }else if(jenisFunction == 'role'){
      this.roleComponent.hapusRole(id);
      this.close();
    }else if(jenisFunction == 'permission'){
      this.permissionComponent.hapusPermission(id);
      this.close();
    }else if(jenisFunction == 'department'){
      this.departmentComponent.hapusDepartment(id);
      this.close();
    }else if(jenisFunction == 'codesettings'){
      this.codeSettingsComponent.hapusCodeSettings(id);
      this.close();
    }else if(jenisFunction == 'klinik'){
      this.klinikComponent.hapusKlinik(id);
      this.close();
    }else if(jenisFunction == 'packageHeader'){
      this.packageHeaderComponent.hapusPackageHeader(id);
      this.close();
    }else if(jenisFunction == 'userClenic'){
      this.userClenicComponent.hapusUserClenic(id);
      this.close();
    }else if(jenisFunction == 'packageDetail'){
      this.packageDetailComponent.hapusPackageDetail(id);
      this.close();
    }else if(jenisFunction == 'pembayaran'){
      this.termOfPaymentsComponent.hapusTermOfPayments(id);
      this.close();
    }else if(jenisFunction == 'contractHeader'){
      this.contractHeaderComponent.hapusContractHeader(id);
      this.close();
    }else if(jenisFunction == 'contractDetail'){
      this.contractDetailComponent.hapusContractDetail(id);
      this.close();
    }
    else{

    }
  }

  close() {
    this.show = false;
  }
  
  pesanSnackBar(pesan: any){
    this.snackBar.open(pesan, '', {
      duration: 3000
    });
  }





}
