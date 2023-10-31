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
import { CreatePackageDetailComponent } from './create-package-detail/create-package-detail.component';
import { UpdatePackageDetailComponent } from './update-package-detail/update-package-detail.component';
import { PackageDetailService } from './service/packagedetail.service';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.css']
})

@Injectable({
  providedIn: 'root' // HERE
})

export class PackageDetailComponent implements OnInit {
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;
  @ViewChild(ModalsComponent) modal: ModalsComponent | undefined;
  @ViewChild(CreatePackageDetailComponent) modalCreate: CreatePackageDetailComponent | undefined;
  @ViewChild(UpdatePackageDetailComponent) modalUpdate: UpdatePackageDetailComponent | undefined;

  packageDetails: any = [];
  title = 'Package Details';
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
    private packagedetailService: PackageDetailService
  ) { }

  ngOnInit(): void {
    this.appComponent.title = 'Package Details';
    this.getAllPackageDetail();
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
    const kata = 'Package Detail';
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
    this.getAllPackageDetail();
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

  getAllPackageDetail() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    console.log(params);
    this.packagedetailService.getAllPackageDetail().subscribe(
      (data: any) => {
        console.log(data);
        console.log(JSON.stringify(data));
        this.packageDetails = data.data;
        this.count = data.total;
        console.log("Package Detail");
        console.log(this.packageDetails);
      },(error: any) => console.log(error)
    );
  }
  
  // Navigate
  createPackageDetail(){
    this.router.navigate(['/CreatePackageDetail']);
  }
  
  updatePackageDetail(id: any){
    this.router.navigate(['/UpdatePackageDetail/'+id]);
  }
  
  detailPackageDetail(
    id: any,
    code_package: any,
    name_package: any,
    code: any,
    name: any,
    qty: any,
  ){
    const judulModal = code_package + ' - Detail';
    const bodyMessage = 
    '\nKode Package Header\t= ' + code_package + 
    '\nPackage Header\t\t= ' + name_package + 
    '\nKode User Clenic\t\t= ' + code +  
    '\nNama User Clenic\t\t= ' + name +  
    '\nJumlah\t\t\t\t= ' + qty;
    const gambar = '';
    const statusButton = true;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = '';
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
  }
  
  hapusPackageDetail(id: any){
    console.log("ID yang akan dihapus = " + id);
    this.packagedetailService.deletePackageDetail(id).subscribe(
      (data: any) => {
        const dataBaru = JSON.parse(data);
        console.log(data);
        console.log(dataBaru.message);
        if(dataBaru.success == true){
          this.headerComponent.tampilToastr('info', '', 'Data Package Detail sudah dihapus');
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

  popupHapusPackageDetail(id: any, name:any){
    const judulModal = 'Hapus Package Detail';
    const bodyMessage = 'Anda yakin menghapus ' + name + '?';
    const gambar = '';
    const statusButton = false;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = 'packageDetail';
    
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
    
  }
  
  search(searchInput: any){
    console.log(searchInput);
    this.packagedetailService.getPackageDetailByParams(searchInput).subscribe(
      (data: any) => {
        console.log(data);
        // console.log(JSON.stringify(data));
        this.packageDetails = data.data;
        this.count = data.total;
        // console.log("Package Detail");
        // console.log(this.packageDetails);
      },(error: any) => console.log(error)
    );
  }

  popupCreatePackageDetail(){
    const judulModal = 'Tambah Package Detail';
    const statusButtonCreate = false;

    this.modalCreate?.open(judulModal, statusButtonCreate);
  }
  
  popupUpdatePackageDetail(id:any, name: string){
    const judulModal = 'Ubah ' + name;
    const statusButtonCreate = false;

    this.modalUpdate?.getPackageDetailByID(id);
    this.modalUpdate?.open(id, judulModal, this.statusButtonEdit);
  }






}


