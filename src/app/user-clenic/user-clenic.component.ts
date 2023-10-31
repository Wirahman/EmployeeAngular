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
import { RolePermissionService } from '../role/service/role-permission.service';
import { CreateUserClenicComponent } from './create-user-clenic/create-user-clenic.component';
import { UpdateUserClenicComponent } from './update-user-clenic/update-user-clenic.component';
import { UserClenicService } from './service/user-clenic.service';


@Component({
  selector: 'app-user-clenic',
  templateUrl: './user-clenic.component.html',
  styleUrls: ['./user-clenic.component.css']
})

@Injectable({
  providedIn: 'root' // HERE
})

export class UserClenicComponent implements OnInit {
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;
  @ViewChild(ModalsComponent) modal: ModalsComponent | undefined;
  @ViewChild(CreateUserClenicComponent) modalCreate: CreateUserClenicComponent | undefined;
  @ViewChild(UpdateUserClenicComponent) modalUpdate: UpdateUserClenicComponent | undefined;

  userClenic: any = [];
  title = 'Pengguna Clenic';
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
    private snackBar: MatSnackBar,
    private renderer:Renderer2,
    private el:ElementRef,
    private appComponent: AppComponent,
    private headerComponent: HeaderComponent,
    private rolePermissionService: RolePermissionService,
    private userClenicService: UserClenicService
  ) { }

  ngOnInit(): void {
    this.appComponent.title = 'Pengguna Clenic';
    this.getAllUserClenic();
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
    const kata = 'User Clenic';
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
    this.getAllUserClenic();
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

  getAllUserClenic() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    console.log(params);
    this.userClenicService.getAllUserClenic(params).subscribe(
      (data: any) => {
        console.log(data);
        console.log(JSON.stringify(data));
        this.userClenic = data.data;
        this.count = data.total;
        console.log("User Clenic");
        console.log(this.userClenic);
      },(error: any) => console.log(error)
    );
  }
  
  // Navigate
  CreateUserClenic(){
    this.router.navigate(['/CreateUserClenic']);
  }
  
  UpdateUserClenic(id: any){
    this.router.navigate(['/UpdateUserClenic/'+id]);
  }
  
  detailUserClenic(
    id: any,
    code: any,
    name: any,
    category: any,
    description: any,
    status: any,
    user_sales_type: any,
    package_header_id: any,
    name_package: any
  ){
    if(status == 'active'){
      status = 'Aktif';
    }else{
      status = 'Tidak Aktif';
    }
    const judulModal = name + ' - Detail';
    const bodyMessage = 
    '\nKode Klinik\t\t\t= ' + code + 
    '\nNama Klinik\t\t\t= ' + name + 
    '\nKategori\t\t\t\t= ' + category + 
    '\nDeskripsi\t\t\t\t= ' + description + 
    '\nStatus\t\t\t\t= ' + status + 
    '\nTipe Sales\t\t\t= ' + user_sales_type + 
    '\nPackage Header ID\t= ' + package_header_id + 
    '\nNama Paket\t\t\t= ' + name_package;
    const gambar = '';
    const statusButton = true;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = '';
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
  }
  
  hapusUserClenic(id: any){
    console.log("ID yang akan dihapus = " + id);
    this.userClenicService.deleteUserClenic(id).subscribe(
      (data: any) => {
        const dataBaru = JSON.parse(data);
        console.log(data);
        console.log(dataBaru.message);
        if(dataBaru.success == true){
          this.headerComponent.tampilToastr('info', '', 'Data User Clenic sudah dihapus');
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

  popupHapusUserClenic(id: any, name:any){
    const judulModal = 'Hapus Pengguna Clenic';
    const bodyMessage = 'Anda yakin menghapus ' + name + '?';
    const gambar = '';
    const statusButton = false;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = 'userClenic';
    
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
    
  }
  
  search(searchInput: any){
    console.log(searchInput);
    this.userClenicService.getUserClenicByParams(searchInput).subscribe(
      (data: any) => {
        console.log(data);
        // console.log(JSON.stringify(data));
        this.userClenic = data.data;
        this.count = data.total;
        // console.log("Klinik");
        // console.log(this.klinik);
      },(error: any) => console.log(error)
    );
  }

  popupCreateUserClenic(){
    const judulModal = 'Tambah Pengguna Clenic';
    const statusButtonCreate = false;

    this.modalCreate?.open(judulModal, statusButtonCreate);
  }
  
  popupUpdateUserClenic(id:any, name: string){
    const judulModal = 'Ubah ' + name;
    const statusButtonCreate = false;

    this.modalUpdate?.getUserClenickByID(id);
    this.modalUpdate?.open(id, judulModal, this.statusButtonEdit);
  }






}

