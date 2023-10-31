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
import { CreatePermissionComponent } from './create-permission/create-permission.component';
import { UpdatePermissionComponent } from './update-permission/update-permission.component';
import { PopupComponent } from '../popup/popup.component';
import { ModalsComponent } from '../modals/modals.component';
import { PermissionService } from './service/permission.service';
import { RolePermissionService } from '../role/service/role-permission.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})

@Injectable({
  providedIn: 'root' // HERE
})

export class PermissionComponent implements OnInit {
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;
  @ViewChild(ModalsComponent) modal: ModalsComponent | undefined;
  @ViewChild(CreatePermissionComponent) modalCreate: CreatePermissionComponent | undefined;
  @ViewChild(UpdatePermissionComponent) modalUpdate: UpdatePermissionComponent | undefined;

  permission: any = [];
  title = 'Hak Akses';
  currentIndex = -1;
  pages: 1 = 1;
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
    private permissionService: PermissionService,
    private rolePermissionService: RolePermissionService,
    private snackBar: MatSnackBar,
    private renderer:Renderer2,
    private el:ElementRef
  ) { }

  ngOnInit(): void {
    this.appComponent.title = 'Permission';
    this.getSemuaPermission();
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
    const kata = 'Permission';
    namePermission['namePermissionCreate'] = 'Create ' + kata;
    namePermission['namePermissionEdit'] = 'Update ' + kata;
    namePermission['namePermissionDelete'] = 'Delete ' + kata;
    console.log("Ini untuk name permission");
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
    this.getSemuaPermission();
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

  getSemuaPermission() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    console.log(params);
    this.permissionService.getDaftarPermission(params).subscribe(
      (data: any) => {
        console.log(data);
        console.log(JSON.stringify(data));
        this.permission = data.data;
        this.count = data.total;
        console.log("Permission");
        console.log(this.permission);
      },(error: any) => console.log(error)
    );
  }
  
  // Navigate
  createPermission(){
    this.router.navigate(['/CreatePermission']);
  }
  
  updatePermission(id: any){
    this.router.navigate(['/UpdatePermission/'+id]);
  }  
  
  detailPermission(id: any, code: any, name: any, status: any, description: any){
    if(status == 'active'){
      status = 'Aktif';
    }else{
      status = 'Tidak Aktif';
    }
    const judulModal = name + ' - Detail';
    const bodyMessage = 
    '\nKode Hak Akses\t= ' + code + 
    '\nNama Hak Akses\t= ' + name + 
    '\nStatus\t\t\t= ' + status + 
    '\nDeskripsi\t\t\t= ' + description;
    const gambar = '';
    const statusButton = true;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = '';
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
  }

  hapusPermission(id: any){
    console.log("ID yang akan dihapus = " + id);
    this.permissionService.deletePermission(id).subscribe(
      (data: any) => {
        const dataBaru = JSON.parse(data);
        console.log(data);
        console.log(dataBaru.message);
        if(dataBaru.success == true){
          this.headerComponent.tampilToastr('info', '', 'Hak akses sudah dihapus');
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

  popupHapusPermission(id: any, name:any){
    const judulModal = 'Hapus Hak Akses';
    const bodyMessage = 'Anda yakin menghapus ' + name + '?';
    const gambar = '';
    const statusButton = false;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = 'permission';
    
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
    
  }
  
  search(searchInput: any){
    console.log(searchInput);
    this.permissionService.getPermissionByParams(searchInput).subscribe(
      (data: any) => {
        console.log(data);
        // console.log(JSON.stringify(data));
        this.permission = data.data;
        this.count = data.total;
        // console.log("Permission");
        // console.log(this.permission);
      },(error: any) => console.log(error)
    );
  }

  popupCreatePermission(){
    const judulModal = 'Tambah Hak Akses';
    const statusButtonCreate = false;

    this.modalCreate?.open(judulModal, statusButtonCreate);
  }
  
  popupUpdatePermission(id:any, name: string){
    const judulModal = 'Ubah ' + name;
    const statusButtonCreate = false;

    this.modalUpdate?.getPermissionByID(id);
    this.modalUpdate?.open(id, judulModal, this.statusButtonEdit);
  }






}
