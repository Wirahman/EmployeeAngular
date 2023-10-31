// Angular Library
import { Component, OnInit, AfterViewInit, Renderer2, ElementRef, ViewChild, Injectable, } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// Clarity Design
import '@cds/core/forms/register.js';
import '@cds/core/input/register.js';
import '@cds/core/password/register.js';
import '@cds/core/button/register.js';
import { ClarityIcons, plusIcon, pencilIcon, trashIcon } from '@cds/core/icon';

// Component Library
import { AppComponent } from '../app.component';
import { HeaderComponent } from '../header/header.component';
import { CreateCodeSettingsComponent } from './create-code-settings/create-code-settings.component';
import { UpdateCodeSettingsComponent } from './update-code-settings/update-code-settings.component';
import { PopupComponent } from '../popup/popup.component';
import { ModalsComponent } from '../modals/modals.component';
import { CodeSettingsService } from './service/code-settings.service';
import { RolePermissionService } from '../role/service/role-permission.service';

@Component({
  selector: 'app-code-settings',
  templateUrl: './code-settings.component.html',
  styleUrls: ['./code-settings.component.css']
})

@Injectable({
  providedIn: 'root' // HERE
})

export class CodeSettingsComponent implements OnInit {
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;
  @ViewChild(ModalsComponent) modal: ModalsComponent | undefined;
  @ViewChild(CreateCodeSettingsComponent) modalCreate: CreateCodeSettingsComponent | undefined;
  @ViewChild(UpdateCodeSettingsComponent) modalUpdate: UpdateCodeSettingsComponent | undefined;

  codeSettings: any = [];
  currentIndex = -1;
  pages: 1 = 1;
  title = 'Kode Master';
  page = 1;
  count = 0;
  pageSize = 5;
  
  statusButtonCreate = true;
  statusButtonEdit = true;
  statusButtonDelete = true;

  constructor(
    private router: Router,
    private appComponent: AppComponent,
    private headerComponent: HeaderComponent,
    private codeSettingsService: CodeSettingsService,
    private rolePermissionService: RolePermissionService,
    private snackBar: MatSnackBar,
    private renderer:Renderer2,
    private el:ElementRef
  ) { }

  ngOnInit(): void {
    this.appComponent.title = 'Peran';
    localStorage.setItem('menu', 'CodeSettings');
    this.getSemuaCodeSettings();
    ClarityIcons.addIcons(plusIcon, pencilIcon, trashIcon);
    this.validasiButtonMenu();
  }
  
  public ngAfterViewInit(): void {
    if(this.popupComponent == undefined){
      console.log('Pop Up Component Undefined');
    }
    // this.popupComponent!.passEntry.subscribe(() => {
    //   this.popupComponent.close();
    // });
    if(this.modal == undefined){
      console.log('Modal Component Undefined');
    }
  }

  validasiButtonMenu(){
    let namePermission: any = {};
    const kata = 'Code Settings';
    namePermission['namePermissionCreate'] = 'Create ' + kata;
    namePermission['namePermissionEdit'] = 'Update ' + kata;
    namePermission['namePermissionDelete'] = 'Delete ' + kata;
    console.log("Ini untuk name code settings");
    console.log(namePermission);
    this.rolePermissionService.getValidasiButton(namePermission).subscribe(
      (data: any) => {
        // console.log(data);
        // console.log("Data Validasi Button");
        // console.log(data.data.statusButtonCreate);
              
        this.statusButtonCreate = data.data.statusButtonCreate;
        this.statusButtonEdit = data.data.statusButtonEdit;
        this.statusButtonDelete = data.data.statusButtonDelete;
      },(error: any) => console.log(error)
    );
  }
  
  handlePageChange(event: number): void {
    this.page = event;
    this.getSemuaCodeSettings();
  }
  
  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`offset`] = page;
    }

    if (pageSize) {
      params[`limit`] = pageSize;
    }

    return params;
  }

  getSemuaCodeSettings() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    console.log(params);
    this.codeSettingsService.getDaftarCodeSettings(params).subscribe(
      (data: any) => {
        console.log(data);
        console.log(JSON.stringify(data));
        this.codeSettings = data.data;
        this.count = data.total;
        console.log("Code Settings");
        console.log(this.codeSettings);
      },(error: any) => console.log(error)
    );
  }
  
  // Navigate
  createCodeSettings(){
    this.router.navigate(['/CreateCodeSettings']);
  }
  
  updateCodeSettings(id: any){
    this.router.navigate(['/UpdateCodeSettings/'+id]);
  }  
  
  detailCodeSettings(id: any, table_name: any, label: any, prefix: any, digit: any, counter: any){
    if(status == 'active'){
      status = 'Aktif';
    }else{
      status = 'Tidak Aktif';
    }
    const judulModal = table_name + ' - Detail';
    const bodyMessage = 
    '\nLabel\t= ' + label + 
    '\nPrefix\t= ' + prefix + 
    '\nDigit\t= ' + digit + 
    '\nCounter\t= ' + counter;
    const gambar = '';
    const statusButton = true;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = '';
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
  }
  
  hapusCodeSettings(id: any){
    console.log("ID yang akan dihapus = " + id);
    this.codeSettingsService.deleteCodeSettings(id).subscribe(
      (data: any) => {
        const dataBaru = JSON.parse(data);
        console.log(data);
        console.log(dataBaru.message);
        if(dataBaru.success == true){
          this.headerComponent.tampilToastr('info', '', 'Kode Master sudah dihapus');
          this.ngOnInit();
        }else{
          this.headerComponent.tampilToastr('error', '', dataBaru.message);
        }
      },(error: any) => {
        console.log("Error");
        console.log(error);
        const errorBaru = JSON.parse(error.error);
        this.headerComponent.tampilToastr('error', errorBaru.message, '');
      }
    );
  }

  pesanSnackBar(pesan: any){
    this.snackBar.open(pesan, '', {
      duration: 3000
    });
  }

  popupHapusCodeSettings(id: any, table_name: any){
    const judulModal = 'Hapus Code Master';
    const bodyMessage = 'Anda yakin menghapus ' + table_name + '?';
    const gambar = '';
    const statusButton = false;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = 'codesettings';
    
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
    
  }
  
  search(searchInput: any){
    console.log(searchInput);
    this.codeSettingsService.getCodeSettingsByParams(searchInput).subscribe(
      (data: any) => {
        console.log(data);
        // console.log(JSON.stringify(data));
        this.codeSettings = data.data;
        this.count = data.total;
        // console.log("Role");
        // console.log(this.role);
      },(error: any) => console.log(error)
    );
  }
  
  popupCreateCodeSettings(){
    const judulModal = 'Tambah Kode Master';
    const statusButtonCreate = false;

    this.modalCreate?.open(judulModal, statusButtonCreate);
  }
  
  popupUpdateCodeSettings(id:any, name: string){
    const judulModal = 'Ubah ' + name;
    const statusButtonCreate = false;

    this.modalUpdate?.getCodeSettingsByID(id);
    this.modalUpdate?.open(id, judulModal, this.statusButtonEdit);
  }



}
