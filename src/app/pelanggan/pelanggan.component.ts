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
import { CreatePelangganComponent } from './create-pelanggan/create-pelanggan.component';
import { UpdatePelangganComponent } from './update-pelanggan/update-pelanggan.component';
import { PelangganService } from './service/pelanggan.service';
import { RolePermissionService } from '../role/service/role-permission.service';

@Component({
  selector: 'app-pelanggan',
  templateUrl: './pelanggan.component.html',
  styleUrls: ['./pelanggan.component.css']
})

@Injectable({
  providedIn: 'root' // HERE
})

export class PelangganComponent implements OnInit {
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;
  @ViewChild(ModalsComponent) modal: ModalsComponent | undefined;
  @ViewChild(CreatePelangganComponent) modalCreate: CreatePelangganComponent | undefined;
  @ViewChild(UpdatePelangganComponent) modalUpdate: UpdatePelangganComponent | undefined;

  pelanggan: any = [];
  title = 'Pelanggan';
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
    private pelangganService: PelangganService,
    private rolePermissionService: RolePermissionService
  ) { }

  ngOnInit(): void {
    this.appComponent.title = 'Pelanggan';
    this.getAllPelanggan();
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
    const kata = 'Customer';
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
    this.getAllPelanggan();
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

  getAllPelanggan() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    console.log(params);
    this.pelangganService.getAllPelanggan(params).subscribe(
      (data: any) => {
        console.log(data);
        console.log(JSON.stringify(data));
        this.pelanggan = data.data;
        this.count = data.total;
        console.log("Pelanggan");
        console.log(this.pelanggan);
      },(error: any) => console.log(error)
    );
  }
  
  // Navigate
  createPelanggan(){
    this.router.navigate(['/CreatePelanggan']);
  }
  
  updatePelanggan(id: any){
    this.router.navigate(['/UpdatePelanggan/'+id]);
  }
  
  detailPelanggan(
    id: any,
    code: any,
    company_name: any,
    owner_name: any,
    ktp_id: any,
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
    const judulModal = company_name + ' - Detail';
    const bodyMessage = 
    '\nKode Pelanggan\t= ' + code + 
    '\nNama Klinik\t\t= ' + company_name + 
    '\nStatus\t\t\t= ' + status + 
    '\nAlamat\t\t\t= ' + address + 
    ',\n\t\t\t\t   ' + nama_desa_kelurahan + 
    ',\n\t\t\t\t  ' + nama_kecamatan + 
    ',\n\t\t\t\t   ' + nama_kabupaten_kota + 
    ',\n\t\t\t\t   ' + nama_provinsi;
    const gambar = '';
    const statusButton = true;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = '';
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
  }
  
  hapusPelanggan(id: any){
    console.log("ID yang akan dihapus = " + id);
    this.pelangganService.deletePelanggan(id).subscribe(
      (data: any) => {
        const dataBaru = JSON.parse(data);
        console.log(data);
        console.log(dataBaru.message);
        if(dataBaru.success == true){
          this.headerComponent.tampilToastr('info', '', 'Data Pelanggan sudah dihapus');
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

  popupHapusPelanggan(id: any, name:any){
    const judulModal = 'Hapus Pelanggan';
    const bodyMessage = 'Anda yakin menghapus ' + name + '?';
    const gambar = '';
    const statusButton = false;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = 'pelanggan';
    
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
    
  }
  
  search(searchInput: any){
    console.log(searchInput);
    this.pelangganService.getPelangganByParams(searchInput).subscribe(
      (data: any) => {
        console.log(data);
        // console.log(JSON.stringify(data));
        this.pelanggan = data.data;
        this.count = data.total;
        // console.log("Pelanggan");
        // console.log(this.pelanggan);
      },(error: any) => console.log(error)
    );
  }

  popupCreatePelanggan(){
    const judulModal = 'Tambah Pelanggan';
    const statusButtonCreate = false;

    this.modalCreate?.open(judulModal, statusButtonCreate);
  }
  
  popupUpdatePelanggan(id:any, name: string){
    const judulModal = 'Ubah ' + name;
    const statusButtonCreate = false;

    this.modalUpdate?.getPelangganByID(id);
    this.modalUpdate?.open(id, judulModal, this.statusButtonEdit);
  }






}
