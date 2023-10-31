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
import { CreateContractHeaderComponent } from './create-contract-header/create-contract-header.component';
import { UpdateContractHeaderComponent } from './update-contract-header/update-contract-header.component';
import { ContractHeaderService } from './service/contract-header.service';

@Component({
  selector: 'app-contract-header',
  templateUrl: './contract-header.component.html',
  styleUrls: ['./contract-header.component.css']
})

@Injectable({
  providedIn: 'root' // HERE
})

export class ContractHeaderComponent implements OnInit {
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;
  @ViewChild(ModalsComponent) modal: ModalsComponent | undefined;
  @ViewChild(CreateContractHeaderComponent) modalCreate: CreateContractHeaderComponent | undefined;
  @ViewChild(UpdateContractHeaderComponent) modalUpdate: UpdateContractHeaderComponent | undefined;

  contractHeader: any = [];
  title = 'Contract Header';
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
    private contractheaderService: ContractHeaderService
  ) { }

  ngOnInit(): void {
    this.appComponent.title = 'Contract Header';
    this.getAllContractHeader();
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
    const kata = 'Contract Header';
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
    this.getAllContractHeader();
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

  getAllContractHeader() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    console.log(params);
    this.contractheaderService.getAllContractHeader().subscribe(
      (data: any) => {
        console.log(data);
        console.log(JSON.stringify(data));
        this.contractHeader = data.data;
        this.count = data.total;
        console.log("Contract Header");
        console.log(this.contractHeader);
      },(error: any) => console.log(error)
    );
  }
  
  // Navigate
  createContractHeader(){
    this.router.navigate(['/CreateContractHeader']);
  }
  
  updateContractHeader(id: any){
    this.router.navigate(['/UpdateContractHeader/'+id]);
  }
  
  detailContractHeader(
    id: any,
    code: any,
    namaPelanggan: any,
    namaKlinik: any,
    terms_of_payment: any,
    contractDate: any,
    contractStartDate: any,
    contractEndDate: any
  ){
    contractDate = this.formatTanggal(contractDate);
    contractStartDate = this.formatTanggal(contractStartDate);
    contractEndDate = this.formatTanggal(contractEndDate);

    const judulModal = namaPelanggan + ' - Detail';
    const bodyMessage = 
    '\nKode Contract Header\t= ' + code + 
    '\nNama Pelanggan\t\t= ' + namaPelanggan +
    '\nNama Klinik\t\t\t= ' + namaKlinik + 
    '\nTanggal\t\t\t\t= ' + contractDate + 
    '\nTanggal Awal\t\t\t= ' + contractStartDate + 
    '\nTanggal Akhir\t\t\t= ' + contractEndDate + 
    '\nTerm of Payments\t\t= ' + terms_of_payment;
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
  
  hapusContractHeader(id: any){
    console.log("ID yang akan dihapus = " + id);
    this.contractheaderService.deleteContractHeader(id).subscribe(
      (data: any) => {
        const dataBaru = JSON.parse(data);
        console.log(data);
        console.log(dataBaru.message);
        if(dataBaru.success == true){
          this.headerComponent.tampilToastr('info', '', 'Data Contract Header sudah dihapus');
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

  popupHapusContractHeader(id: any, name:any){
    const judulModal = 'Hapus Contract Header';
    const bodyMessage = 'Anda yakin menghapus ' + name + '?';
    const gambar = '';
    const statusButton = false;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = 'contractHeader';
    
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
    
  }
  
  search(searchInput: any){
    console.log(searchInput);
    this.contractheaderService.getContractHeaderByParams(searchInput).subscribe(
      (data: any) => {
        console.log(data);
        // console.log(JSON.stringify(data));
        this.contractHeader = data.data;
        this.count = data.total;
        // console.log("Contract Header");
        // console.log(this.contractHeader);
      },(error: any) => console.log(error)
    );
  }

  popupCreateContractHeader(){
    const judulModal = 'Tambah Contract Header';
    const statusButtonCreate = false;

    this.modalCreate?.open(judulModal, statusButtonCreate);
  }
  
  popupUpdateContractHeader(id:any, name: string){
    const judulModal = 'Ubah ' + name;
    const statusButtonCreate = false;

    this.modalUpdate?.ambilContractHeaderByID(id);
    this.modalUpdate?.open(id, judulModal, this.statusButtonEdit);
  }





}
