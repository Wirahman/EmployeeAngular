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
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { UpdateDepartmentComponent } from './update-department/update-department.component';
import { DepartmentService } from './service/department.service';
import { RolePermissionService } from '../role/service/role-permission.service';
import { PopupComponent } from '../popup/popup.component';
import { ModalsComponent } from '../modals/modals.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})

@Injectable({
  providedIn: 'root' // HERE
})

export class DepartmentComponent implements OnInit {
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;
  @ViewChild(ModalsComponent) modal: ModalsComponent | undefined;
  @ViewChild(CreateDepartmentComponent) modalCreate: CreateDepartmentComponent | undefined;
  @ViewChild(UpdateDepartmentComponent) modalUpdate: UpdateDepartmentComponent | undefined;

  department: any = [];
  title = 'Department';
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
    private departmentService: DepartmentService,
    private rolePermissionService: RolePermissionService
  ) { }

  ngOnInit(): void {
    this.appComponent.title = 'Department';
    this.getSemuaDepartment();
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
    const kata = 'Department';
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
    this.getSemuaDepartment();
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

  getSemuaDepartment() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    console.log(params);
    this.departmentService.getAll(params).subscribe(
      (data: any) => {
        console.log(data);
        console.log(JSON.stringify(data));
        this.department = data.data;
        this.count = data.total;
        console.log("Department");
        console.log(this.department);
      },(error: any) => console.log(error)
    );
  }
  
  // Navigate
  createDepartment(){
    this.router.navigate(['/CreateDepartment']);
  }
  
  updateDepartment(id: any){
    this.router.navigate(['/UpdateDepartment/'+id]);
  }  
  
  detailDepartment(id: any, code: any, name: any, status: any){
    if(status == 'active'){
      status = 'Aktif';
    }else{
      status = 'Tidak Aktif';
    }
    const judulModal = name + ' - Detail';
    const bodyMessage = 
    '\nKode Department\t= ' + code + 
    '\nNama Department\t= ' + name + 
    '\nStatus\t\t\t= ' + status;
    const gambar = '';
    const statusButton = true;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = '';
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
  }

  hapusDepartment(id: any){
    console.log("ID yang akan dihapus = " + id);
    this.departmentService.deleteDepartment(id).subscribe(
      (data: any) => {
        const dataBaru = JSON.parse(data);
        console.log(data);
        console.log(dataBaru.message);
        if(dataBaru.success == true){
          this.headerComponent.tampilToastr('info', '', 'Department sudah dihapus');
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

  popupHapusDepartment(id: any, name:any){
    const judulModal = 'Hapus Department';
    const bodyMessage = 'Anda yakin menghapus ' + name + '?';
    const gambar = '';
    const statusButton = false;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = 'department';
    
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
    
  }
  
  search(searchInput: any){
    console.log(searchInput);
    this.departmentService.getDepartmentByParams(searchInput).subscribe(
      (data: any) => {
        console.log(data);
        // console.log(JSON.stringify(data));
        this.department = data.data;
        this.count = data.total;
        // console.log("Department");
        // console.log(this.department);
      },(error: any) => console.log(error)
    );
  }

  popupCreateDepartment(){
    const judulModal = 'Tambah Department';
    const statusButtonCreate = false;

    this.modalCreate?.open(judulModal, statusButtonCreate);
  }
  
  popupUpdateDepartment(id:any, name: string){
    const judulModal = 'Ubah ' + name;
    const statusButtonCreate = false;

    this.modalUpdate?.getDepartmentByID(id);
    this.modalUpdate?.open(id, judulModal, this.statusButtonEdit);
  }


  
  

  
}
