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
import { CreateContractDetailComponent } from './create-contract-detail/create-contract-detail.component';
import { UpdateContractDetailComponent } from './update-contract-detail/update-contract-detail.component';
import { ContractDetailService } from './service/contract-detail.service';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.css']
})

@Injectable({
  providedIn: 'root' // HERE
})

export class ContractDetailComponent implements OnInit {
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;
  @ViewChild(ModalsComponent) modal: ModalsComponent | undefined;
  @ViewChild(CreateContractDetailComponent) modalCreate: CreateContractDetailComponent | undefined;
  @ViewChild(UpdateContractDetailComponent) modalUpdate: UpdateContractDetailComponent | undefined;

  contractDetail: any = [];
  title = 'Contract Details';
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
    private contractDetailService: ContractDetailService
  ) { }

  ngOnInit(): void {
    this.appComponent.title = 'Contract Details';
    this.getAllContractDetail();
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
    const kata = 'Contract Detail';
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
    this.getAllContractDetail();
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

  getAllContractDetail() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    console.log(params);
    this.contractDetailService.getAllContractDetail().subscribe(
      (data: any) => {
        console.log(data);
        console.log(JSON.stringify(data));
        this.contractDetail = data.data;
        this.count = data.total;
        console.log("Contract Detail");
        console.log(this.contractDetail);
      },(error: any) => console.log(error)
    );
  }
  
  // Navigate
  createContractDetail(){
    this.router.navigate(['/CreateContractDetail']);
  }
  
  updateContractDetail(id: any){
    this.router.navigate(['/UpdateContractDetail/'+id]);
  }
  
  detailContractDetail(
    id: any,
    code: any,
    nama_pengguna_klinik: any,
    qty: any,
    price: any,
    discount_type: any,
    discount_value: any,
    subtotal: any
  ){

    const judulModal = nama_pengguna_klinik + ' - Detail';
    const bodyMessage = 
    '\nKode Contract Details\t= ' + code + 
    '\nJumlah\t\t\t\t= ' + qty +
    '\nHarga\t\t\t\t= ' + price + 
    '\nTipe Diskon\t\t\t= ' + discount_type + 
    '\nNilai Diskon\t\t\t= ' + discount_value + 
    '\nSub Total\t\t\t= ' + subtotal;
    const gambar = '';
    const statusButton = true;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = '';
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
  }

  formatTanggal(tanggal: any){
    var tanggalFormat = tanggal.split("-");
    var bulanTanggal = '';
    if(tanggalFormat[1] == '01'){
      bulanTanggal = "Januari";
    }else if(tanggalFormat[1] == '02'){
      bulanTanggal = "Februari";
    }else if(tanggalFormat[1] == '03'){
      bulanTanggal = "Maret";
    }else if(tanggalFormat[1] == '04'){
      bulanTanggal = "April";
    }else if(tanggalFormat[1] == '05'){
      bulanTanggal = "Mei";
    }else if(tanggalFormat[1] == '06'){
      bulanTanggal = "Juni";
    }else if(tanggalFormat[1] == '07'){
      bulanTanggal = "Juli";
    }else if(tanggalFormat[1] == '08'){
      bulanTanggal = "Agustus";
    }else if(tanggalFormat[1] == '09'){
      bulanTanggal = "September";
    }else if(tanggalFormat[1] == '10'){
      bulanTanggal = "Oktober";
    }else if(tanggalFormat[1] == '11'){
      bulanTanggal = "November";
    }else if(tanggalFormat[1] == '12'){
      bulanTanggal = "Desember";
    }
    return tanggalFormat[2] + " " + bulanTanggal + " " + tanggalFormat[0];
  }
  
  hapusContractDetail(id: any){
    console.log("ID yang akan dihapus = " + id);
    this.contractDetailService.deleteContractDetail(id).subscribe(
      (data: any) => {
        const dataBaru = JSON.parse(data);
        console.log(data);
        console.log(dataBaru.message);
        if(dataBaru.success == true){
          this.headerComponent.tampilToastr('info', '', 'Data Contract Details sudah dihapus');
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

  popupHapusContractDetail(id: any, name:any){
    const judulModal = 'Hapus Contract Details';
    const bodyMessage = 'Anda yakin menghapus ' + name + '?';
    const gambar = '';
    const statusButton = false;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = 'contractDetail';
    
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
    
  }
  
  search(searchInput: any){
    console.log(searchInput);
    this.contractDetailService.getContractDetailByParams(searchInput).subscribe(
      (data: any) => {
        console.log(data);
        // console.log(JSON.stringify(data));
        this.contractDetail = data.data;
        this.count = data.total;
        // console.log("Contract Header");
        // console.log(this.contractHeader);
      },(error: any) => console.log(error)
    );
  }

  popupCreateContractDetail(){
    const judulModal = 'Tambah Contract Details';
    const statusButtonCreate = false;

    this.modalCreate?.open(judulModal, statusButtonCreate);
  }
  
  popupUpdateContractDetail(id:any, name: string){
    const judulModal = 'Ubah ' + name;
    const statusButtonCreate = false;

    this.modalUpdate?.ambilContractDetailByID(id);
    this.modalUpdate?.open(id, judulModal, this.statusButtonEdit);
  }





}
