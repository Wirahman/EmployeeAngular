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
import { AppComponent } from 'src/app/app.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { PopupComponent } from 'src/app/popup/popup.component';
import { ModalsComponent } from 'src/app/modals/modals.component';
import { RolePermissionService } from 'src/app/role/service/role-permission.service';
import { CreatePackageHeaderComponent } from './create-package-header/create-package-header.component';
import { UpdatePackageHeaderComponent } from './update-package-header/update-package-header.component';
import { PackageHeaderService } from './service/packageheader.service';

@Component({
  selector: 'app-package-header',
  templateUrl: './package-header.component.html',
  styleUrls: ['./package-header.component.css']
})

@Injectable({
  providedIn: 'root' // HERE
})

export class PackageHeaderComponent implements OnInit {
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;
  @ViewChild(ModalsComponent) modal: ModalsComponent | undefined;
  @ViewChild(CreatePackageHeaderComponent) modalCreate: CreatePackageHeaderComponent | undefined;
  @ViewChild(UpdatePackageHeaderComponent) modalUpdate: UpdatePackageHeaderComponent | undefined;

  packageHeader: any = [];
  title = 'Package Header';
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
    private packageheaderService: PackageHeaderService
  ) { }

  ngOnInit(): void {
    this.appComponent.title = 'Package Header';
    this.getAllPackageHeader();
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
    const kata = 'Package Header';
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
    this.getAllPackageHeader();
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

  getAllPackageHeader() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    console.log(params);
    this.packageheaderService.getAllPackageHeader().subscribe(
      (data: any) => {
        console.log(data);
        console.log(JSON.stringify(data));
        this.packageHeader = data.data;
        this.count = data.total;
        console.log("Package Header");
        console.log(this.packageHeader);
      },(error: any) => console.log(error)
    );
  }
  
  // Navigate
  createPackageHeader(){
    this.router.navigate(['/CreatePackageHeader']);
  }
  
  updatePackageHeader(id: any){
    this.router.navigate(['/UpdatePackageHeader/'+id]);
  }
  
  detailPackageHeader(
    id: any,
    code: any,
    name: any,
    status: any,
    description: any
  ){
    if(status == 'active'){
      status = 'Aktif';
    }else{
      status = 'Tidak Aktif';
    }
    const judulModal = name + ' - Detail';
    const bodyMessage = 
    '\nKode\t= ' + code + 
    '\nNama\t= ' + name +
    '\nStatus\t= ' + status + 
    '\nDeskripsi\t= ' + description;
    const gambar = '';
    const statusButton = true;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = '';
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
  }
  
  hapusPackageHeader(id: any){
    console.log("ID yang akan dihapus = " + id);
    this.packageheaderService.deletePackageHeader(id).subscribe(
      (data: any) => {
        const dataBaru = JSON.parse(data);
        console.log(data);
        console.log(dataBaru.message);
        if(dataBaru.success == true){
          this.headerComponent.tampilToastr('info', '', 'Data Package Header sudah dihapus');
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

  popupHapusPackageHeader(id: any, name:any){
    const judulModal = 'Hapus Package Header';
    const bodyMessage = 'Anda yakin menghapus ' + name + '?';
    const gambar = '';
    const statusButton = false;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = 'packageHeader';
    
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
    
  }
  
  search(searchInput: any){
    console.log(searchInput);
    this.packageheaderService.getPackageHeaderByParams(searchInput).subscribe(
      (data: any) => {
        console.log(data);
        // console.log(JSON.stringify(data));
        this.packageHeader = data.data;
        this.count = data.total;
        // console.log("Package Header");
        // console.log(this.packageHeader);
      },(error: any) => console.log(error)
    );
  }

  popupCreatePackageHeader(){
    const judulModal = 'Tambah Package Header';
    const statusButtonCreate = false;

    this.modalCreate?.open(judulModal, statusButtonCreate);
  }
  
  popupUpdatePackageHeader(id:any, name: string){
    const judulModal = 'Ubah data ' + name;
    const statusButtonCreate = false;

    this.modalUpdate?.getPackageHeaderByID(id);
    this.modalUpdate?.open(id, judulModal, this.statusButtonEdit);
  }





}
