import { Component, OnInit, AfterViewInit, Renderer2, ElementRef, ViewChild, Injectable, } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

// Clarity Design
import '@cds/core/forms/register.js';
import '@cds/core/input/register.js';
import '@cds/core/password/register.js';
import '@cds/core/button/register.js';
import { ClarityIcons, plusCircleIcon, pencilIcon, trashIcon, keyIcon } from '@cds/core/icon';

// Component Library
import { AppComponent } from '../app.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { DepartmentService } from '../department/service/department.service';
import { RoleService } from '../role/service/role.service';
import { PopupComponent } from '../popup/popup.component';
import { ModalsComponent } from '../modals/modals.component';

import { GlobalComponent } from 'src/app/global/global.component';

import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

@Injectable({
  providedIn: 'root' // HERE
})

export class EmployeeComponent implements OnInit, AfterViewInit {
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;
  @ViewChild(CreateEmployeeComponent) modalCreate: CreateEmployeeComponent | undefined;
  @ViewChild(UpdateEmployeeComponent) modalUpdate: UpdateEmployeeComponent | undefined;
  @ViewChild(ModalsComponent) modal: ModalsComponent | undefined;
  
  employee:any=[];
  currentIndex = -1;
  pages: 1 = 1;
  title = 'Employee';
  page = 1;
  count = 0;
  pageSize = 3;

  
  contohVariabel:any='';

  constructor(
    private router: Router,
    private appComponent: AppComponent,
    private headerComponent: HeaderComponent,
    private snackBar: MatSnackBar,
    private renderer:Renderer2,
    private el:ElementRef,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.appComponent.title = 'Employee';
    localStorage.setItem('menu', 'Employee');
    ClarityIcons.addIcons(plusCircleIcon, pencilIcon, trashIcon, keyIcon);
    this.employee = GlobalComponent.employee;

  }
  
  public ngAfterViewInit(): void {
    if(this.popupComponent == undefined){
      console.log('Pop Up Component Undefined');
    }
    if(this.modal == undefined){
      console.log('Modal Component Undefined');
    }
  }
  
  popupCreateEmployee(){
    const judulModal = 'Create Employee';
    const statusButtonCreate = false;

    this.modalCreate?.open(judulModal, statusButtonCreate);
  }

  popupUpdateEmployee(id:any, name: string, array: []){
    console.log('Array');
    console.log(array);
    const judulModal = 'Edit ' + name;
    const statusButtonEdit = false;

    // this.modalUpdate?.getUserByID(id);
    this.modalUpdate?.open(id, judulModal, statusButtonEdit, array);
  }

  popupDeleteEmployee(id: any, username: any){
    const judulModal = 'Delete Employee';
    const bodyMessage = 'Are you sure delete ' + username + '?';
    const gambar = '';
    const statusButton = false;
    const statusButtonResetPassword = true;
    const statusGambar = true;
    const jenisFunction = 'employee';
    
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
    
  }

  hapusEmployee(id: any){
    this.headerComponent.tampilToastr('info', '', 'Employee have been deleted');
  }

  popupDetailEmployee(id: any, username: any){
    const judulModal = 'Detail Employee';
    const bodyMessage = 'Detail Employee ' + username + '';
    const gambar = '';
    const statusButton = true;
    const statusButtonResetPassword = false;
    const statusGambar = true;
    const jenisFunction = 'reset-password-user';
    
    this.modal?.open(id, judulModal, bodyMessage, gambar, statusButton, statusButtonResetPassword, statusGambar, jenisFunction);
    
  }

}
