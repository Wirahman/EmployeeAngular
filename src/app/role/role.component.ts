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
import { PopupComponent } from '../popup/popup.component';
import { ModalsComponent } from '../modals/modals.component';
import { RoleService } from './service/role.service';
import { RolePermissionService } from '../role/service/role-permission.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})

@Injectable({
  providedIn: 'root' // HERE
})

export class RoleComponent implements OnInit {
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;
  @ViewChild(ModalsComponent) modal: ModalsComponent | undefined;

  role: any = [];
  currentIndex = -1;
  pages: 1 = 1;
  title = 'Peran';
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
    private roleService: RoleService,
    private rolePermissionService: RolePermissionService,
    private snackBar: MatSnackBar,
    private renderer:Renderer2,
    private el:ElementRef
  ) { }

  ngOnInit(): void {
    this.appComponent.title = 'Peran';
    localStorage.setItem('menu', 'Role');
    this.getSemuaRole();
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
    const kata = 'Role';
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
    this.getSemuaRole();
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

  getSemuaRole() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    console.log(params);
    this.roleService.getDaftarRole(params).subscribe(
      (data: any) => {
        console.log(data);
        console.log(JSON.stringify(data));
        this.role = data.data;
        this.count = data.total;
        console.log("Role");
        console.log(this.role);
      },(error: any) => console.log(error)
    );
  }
  
  // Navigate
  createRole(){
    this.router.navigate(['/CreateRole']);
  }
  
  updateRole(id: any){
    this.router.navigate(['/UpdateRole/'+id]);
  }  
  
  detailRole(id: any, code: any, name: any, status: any, description: any){
    if(status == 'active'){
      status = 'Aktif';
    }else{
      status = 'Tidak Aktif';
    }
    const judulModal = name + ' - Detail';
    const bodyMessage = 
    '\nKode Peran\t= ' + code + 
    '\nNama Peran\t= ' + name + 
    '\nStatus\t\t= ' + status + 
    '\nDeskripsi\t\t= ' + description;
    const gambar = '';
    const statusButton = true;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = '';
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
  }

  hapusRole(id: any){
    console.log("ID yang akan dihapus = " + id);
    this.roleService.deleteRole(id).subscribe(
      (data: any) => {
        const dataBaru = JSON.parse(data);
        console.log(data);
        console.log(dataBaru.message);
        if(dataBaru.success == true){
          this.headerComponent.tampilToastr('info', '', 'Peran sudah dihapus');
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

  popupHapusRole(id: any, name: any){
    const judulModal = 'Hapus Peran';
    const bodyMessage = 'Anda yakin menghapus ' + name + '?';
    const gambar = '';
    const statusButton = false;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = 'role';
    
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
    
  }
  
  search(searchInput: any){
    console.log(searchInput);
    this.roleService.getRoleByParams(searchInput).subscribe(
      (data: any) => {
        console.log(data);
        // console.log(JSON.stringify(data));
        this.role = data.data;
        this.count = data.total;
        // console.log("Role");
        // console.log(this.role);
      },(error: any) => console.log(error)
    );
  }
  




}
