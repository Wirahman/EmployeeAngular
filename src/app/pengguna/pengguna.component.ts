// Angular Library
import { Component, OnInit, AfterViewInit, Renderer2, ElementRef, ViewChild, Injectable, } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

// Clarity Design
import '@cds/core/forms/register.js';
import '@cds/core/input/register.js';
import '@cds/core/password/register.js';
import '@cds/core/button/register.js';
import { ClarityIcons, plusCircleIcon, pencilIcon, trashIcon, keyIcon } from '@cds/core/icon';

// Component Library
import { AppComponent } from '../app.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { CreatePenggunaComponent } from './create-pengguna/create-pengguna.component';
import { UpdatePenggunaComponent } from './update-pengguna/update-pengguna.component';
import { DepartmentService } from '../department/service/department.service';
import { RoleService } from '../role/service/role.service';
import { PopupComponent } from '../popup/popup.component';
import { ModalsComponent } from '../modals/modals.component';
import { PenggunaService } from './service/pengguna.service';
import { RolePermissionService } from '../role/service/role-permission.service';

@Component({
  selector: 'app-pengguna',
  templateUrl: './pengguna.component.html',
  styleUrls: ['./pengguna.component.css']
})

@Injectable({
  providedIn: 'root' // HERE
})

export class PenggunaComponent implements OnInit, AfterViewInit {
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;
  @ViewChild(CreatePenggunaComponent) modalCreate: CreatePenggunaComponent | undefined;
  @ViewChild(UpdatePenggunaComponent) modalUpdate: UpdatePenggunaComponent | undefined;
  @ViewChild(ModalsComponent) modal: ModalsComponent | undefined;
  
  pengguna: any = [];
  currentIndex = -1;
  pages: 1 = 1;
  title = 'Pengguna';
  page = 1;
  count = 0;
  pageSize = 3;

  statusButtonCreate = true;
  statusButtonEdit = true;
  statusButtonDelete = true;

  constructor(
    private router: Router,
    private appComponent: AppComponent,
    private headerComponent: HeaderComponent,
    private penggunaService: PenggunaService,
    private rolePermissionService: RolePermissionService,
    private snackBar: MatSnackBar,
    private renderer:Renderer2,
    private el:ElementRef,
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private roleService: RoleService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.appComponent.title = 'Pengguna';
    localStorage.setItem('menu', 'Pengguna');
    this.getSemuaPengguna();
    ClarityIcons.addIcons(plusCircleIcon, pencilIcon, trashIcon, keyIcon);
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
    const kata = 'User';
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
    this.getSemuaPengguna();
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

  getSemuaPengguna() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    console.log(params);
    this.penggunaService.getAllUser(params).subscribe(
      (data: any) => {
        console.log(data);
        console.log(JSON.stringify(data));
        this.pengguna = data.data;
        this.count = data.total;
        console.log("Pengguna");
        console.log(this.pengguna);
      },(error: any) => console.log(error)
    );
  }
  
  // Navigate
  menuRegister(){
    localStorage.setItem('menu', 'Register');
    // this.router.navigate(['/Pengguna/CreatePengguna']);
    this.router.navigate(['Pengguna','CreatePengguna']);
  }
  
  updateUser(id: any){
    localStorage.setItem('menu', 'Update User');
    this.router.navigate(['/UpdatePengguna/'+id]);
  }  

  detailUser(id: any, code: any, name: any, username: any, status: any, department: any, role: any){
    if(status == 'active'){
      status = 'Aktif';
    }else{
      status = 'Tidak Aktif';
    }
    const judulModal = name + ' - Detail';
    const bodyMessage = 
    '\nKode Pengguna\t= ' + code + 
    '\nNama\t\t\t= ' + name + 
    '\nNama Pengguna\t= ' + username + 
    '\nStatus\t\t\t= ' + status + 
    '\nUnit\t\t\t\t= ' + department + 
    '\nPeran\t\t\t= ' + role;
    const gambar = '';
    const statusButton = true;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = '';
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
  }

  resetPassword(id:any){
    console.log("ID yang akan dihapus = " + id);
    this.penggunaService.resetPassword(id).subscribe(
      (data: any) => {
        console.log(data);
        console.log(JSON.stringify(data));
        this.headerComponent.tampilToastr('info', 'Berhasil', 'Reset Password');
        // this.pesanSnackBar('Data ' + id + " sudah reset password");
        this.ngOnInit();
      },(error: any) => {
        console.log(error.message);
        console.log(JSON.stringify(error.message));
        this.headerComponent.tampilToastr('error', 'Gagal Reset Password', '');
      }
    );
  }

  hapusUser(id: any){
    console.log("ID yang akan dihapus = " + id);
    this.penggunaService.deleteUser(id).subscribe(
      (data: any) => {
        const dataBaru = JSON.parse(data);
        console.log(data);
        console.log(dataBaru.message);
        if(dataBaru.success == true){
          this.headerComponent.tampilToastr('info', '', 'Pengguna sudah dihapus');
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

  popupCreateUser(){
    const judulModal = 'Tambah Pengguna';
    const statusButtonCreate = false;

    this.modalCreate?.open(judulModal, statusButtonCreate);
  }

  popupUpdateUser(id:any, name: string){
    const judulModal = 'Ubah ' + name;
    const statusButtonCreate = false;

    this.modalUpdate?.getUserByID(id);
    this.modalUpdate?.open(id, judulModal, this.statusButtonEdit);
  }

  popupResetPassword(id: any, username: any){
    const judulModal = 'Reset Password';
    const bodyMessage = 'Anda yakin reset password ' + username + '?';
    const gambar = '';
    const statusButton = true;
    const statusButtonResetPassword = false;
    const statusGambar = true;
    const jenisFunction = 'reset-password-user';
    
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
    
  }

  popupHapusUser(id: any, username: any){
    const judulModal = 'Hapus Pengguna';
    const bodyMessage = 'Anda yakin menghapus ' + username + '?';
    const gambar = '';
    const statusButton = false;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = 'user';
    
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
    
  }

  search(searchInput: any){
    console.log(searchInput);
    this.penggunaService.getUserByParams(searchInput).subscribe(
      (data: any) => {
        console.log(data);
        // console.log(JSON.stringify(data));
        this.pengguna = data.data;
        this.count = data.total;
        // console.log("Pengguna");
        // console.log(this.pengguna);
      },(error: any) => console.log(error)
    );
  }







  // Fungsi Update
  
  close() {
    if(this.modalUpdate?.showModals != undefined){
      this.modalUpdate.showModals = false;
    }
    

  }
  

  






}
