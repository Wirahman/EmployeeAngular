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
import { CreateKlinikComponent } from './create-klinik/create-klinik.component';
import { UpdateKlinikComponent } from './update-klinik/update-klinik.component';
import { KlinikService } from './service/klinik.service';

@Component({
  selector: 'app-klinik',
  templateUrl: './klinik.component.html',
  styleUrls: ['./klinik.component.css']
})

@Injectable({
  providedIn: 'root' // HERE
})

export class KlinikComponent implements OnInit {
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;
  @ViewChild(ModalsComponent) modal: ModalsComponent | undefined;
  @ViewChild(CreateKlinikComponent) modalCreate: CreateKlinikComponent | undefined;
  @ViewChild(UpdateKlinikComponent) modalUpdate: UpdateKlinikComponent | undefined;

  klinik: any = [];
  title = 'Klinik';
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
    private klinikService: KlinikService
  ) { }

  ngOnInit(): void {
    this.appComponent.title = 'Klinik';
    this.getAllKlinik();
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
    const kata = 'Klinik';
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
    this.getAllKlinik();
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

  getAllKlinik() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    console.log(params);
    this.klinikService.getAllKlinik(params).subscribe(
      (data: any) => {
        console.log(data);
        console.log(JSON.stringify(data));
        this.klinik = data.data;
        this.count = data.total;
        console.log("Klinik");
        console.log(this.klinik);
      },(error: any) => console.log(error)
    );
  }
  
  // Navigate
  createKlinik(){
    this.router.navigate(['/CreateKlinik']);
  }
  
  updateKlinik(id: any){
    this.router.navigate(['/UpdateKlinik/'+id]);
  }
  
  detailKlinik(
    id: any,
    code: any,
    name: any,
    owner_name_customer: any,
    npwp: any,
    address: any,
    provinsi_id: any,
    kabupaten_kota_id: any,
    kecamatan_id: any,
    desa_kelurahan_id: any,
    zipcode: any,
    phone_number: any,
    email: any,
    email_verified_at: any,
    pic_name: any,
    pic_phone_number: any,
    status: any,
    created_date: any,
    updated_date: any,
    nama_provinsi: any,
    nama_kabupaten_kota: any,
    nama_kecamatan: any,
    nama_desa_kelurahan: any
  ){
    if(status == 'active'){
      status = 'Aktif';
    }else{
      status = 'Tidak Aktif';
    }
    const judulModal = name + ' - Detail';
    const bodyMessage = '\nKode Klinik\t= ' + code + 
    '\nNama Klinik\t= ' + name + 
    '\nNama Pemilik\t= ' + owner_name_customer + 
    '\nStatus\t\t= ' + status + 
    '\nAlamat\t\t= ' + address + 
    ',\n\t\t\t   ' + nama_desa_kelurahan + 
    ',\n\t\t\t  ' + nama_kecamatan + ',\n\t\t\t   ' + 
    nama_kabupaten_kota + ',\n\t\t\t   ' + 
    nama_provinsi;
    const gambar = '';
    const statusButton = true;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = '';
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
  }
  
  hapusKlinik(id: any){
    console.log("ID yang akan dihapus = " + id);
    this.klinikService.deleteKlinik(id).subscribe(
      (data: any) => {
        const dataBaru = JSON.parse(data);
        console.log(data);
        console.log(dataBaru.message);
        if(dataBaru.success == true){
          this.headerComponent.tampilToastr('info', '', 'Data Klinik sudah dihapus');
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

  popupHapusKlinik(id: any, name:any){
    const judulModal = 'Hapus Klinik';
    const bodyMessage = 'Anda yakin menghapus ' + name + '?';
    const gambar = '';
    const statusButton = false;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = 'klinik';
    
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
    
  }
  
  search(searchInput: any){
    console.log(searchInput);
    this.klinikService.getKlinikByParams(searchInput).subscribe(
      (data: any) => {
        console.log(data);
        // console.log(JSON.stringify(data));
        this.klinik = data.data;
        this.count = data.total;
        // console.log("Klinik");
        // console.log(this.klinik);
      },(error: any) => console.log(error)
    );
  }

  popupCreateKlinik(){
    const judulModal = 'Tambah Klinik';
    const statusButtonCreate = false;

    this.modalCreate?.open(judulModal, statusButtonCreate);
  }
  
  popupUpdateKlinik(id:any, name: string){
    const judulModal = 'Ubah ' + name;
    const statusButtonCreate = false;

    this.modalUpdate?.getKlinikByID(id);
    this.modalUpdate?.open(id, judulModal, this.statusButtonEdit);
  }






}

