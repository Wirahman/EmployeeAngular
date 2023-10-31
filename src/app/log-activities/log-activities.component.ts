// Angular Library
import { Component, OnInit, AfterViewInit, Renderer2, ElementRef, ViewChild, Injectable } from '@angular/core';
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
import { LogActivitiesService } from './service/log-activities.service';
import { DeleteLogActivitiesComponent } from './delete-log-activities/delete-log-activities.component';

@Component({
  selector: 'app-log-activities',
  templateUrl: './log-activities.component.html',
  styleUrls: ['./log-activities.component.css']
})

@Injectable({
  providedIn: 'root' // HERE
})

export class LogActivitiesComponent implements OnInit {
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;
  @ViewChild(ModalsComponent) modal: ModalsComponent | undefined;
  @ViewChild(DeleteLogActivitiesComponent) modalDelete: DeleteLogActivitiesComponent | undefined;

  logActivities: any = [];
  title = 'Log Activities';
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
    private logActivitiesService: LogActivitiesService
  ) { }

  ngOnInit(): void {
    this.appComponent.title = 'Log Activities';
    this.getAllLogActivities();
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
    const kata = 'Log Activities';
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
    this.getAllLogActivities();
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

  getAllLogActivities() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    console.log(params);
    this.logActivitiesService.getAllLogActivities(params).subscribe(
      (data: any) => {
        console.log(data);
        console.log(JSON.stringify(data));
        this.logActivities = data.data;
        this.count = data.total;
        console.log("Log Activities");
        console.log(this.logActivities);
      },(error: any) => console.log(error)
    );
  }
  
  // Navigate
  createLogActivities(){
    this.router.navigate(['/CreateLogActivities']);
  }
  
  updateLogActivities(id: any){
    this.router.navigate(['/UpdateLogActivities/'+id]);
  }
  
  detailLogActivities(
    id: any,
    table_name: any,
    table_id: any,
    action: any,
    changes: any,
    ip: any,
    agent: any,
    code_user: any,
    name_user: any
  ){
    if(status == 'active'){
      status = 'Aktif';
    }else{
      status = 'Tidak Aktif';
    }
    const judulModal = table_name + ' - Detail';
    const bodyMessage = 
    '\nNama Table\t\t= ' + table_name + 
    '\nID Table\t\t\t= ' + table_id + 
    '\nAksi\t\t\t\t= ' + action + 
    '\nPerubahan\t\t= ' + changes + 
    '\nIP Address\t\t= ' + ip + 
    '\nAgent\t\t\t= ' + agent +
    '\nKode Pengguna\t= ' + code_user +
    '\nNama Pengguna\t= ' + name_user;
    const gambar = '';
    const statusButton = true;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = '';
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
  }

  pesanSnackBar(pesan: any){
    this.snackBar.open(pesan, '', {
      duration: 3000
    });
  }

  popupHapusActivities(id: any, name:any){
    const judulModal = 'Hapus Log Activities';
    const bodyMessage = 'Anda yakin menghapus ' + name + '?';
    const gambar = '';
    const statusButton = false;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = 'logActivities';
    
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
    
  }
  
  search(searchInput: any){
    console.log(searchInput);
    this.logActivitiesService.getLogActivitiesByParams(searchInput).subscribe(
      (data: any) => {
        console.log(data);
        // console.log(JSON.stringify(data));
        this.logActivities = data.data;
        this.count = data.total;
        // console.log("Log Activities");
        // console.log(this.logActivities);
      },(error: any) => console.log(error)
    );
  }

  popupDeleteLogAktifitas(){
    const judulModal = 'Hapus Log Aktifitas';
    const statusButtonDelete = false;

    this.modalDelete?.open(judulModal, statusButtonDelete);
  }
  





}


