import { Component, OnInit, Output, EventEmitter, Renderer2, RendererFactory2, ElementRef, } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

// Clarity Design
import '@cds/core/forms/register.js';
import '@cds/core/input/register.js';
import '@cds/core/password/register.js';
import '@cds/core/button/register.js';
import { ClarityIcons } from "@clr/icons";
// import '@clr/icons';
// import '@clr/icons/shapes/essential-shapes';

// Component Library
import { GlobalComponent } from 'src/app/global/global.component';

import { AppComponent } from '../../app.component';
import { HeaderComponent } from 'src/app/header/header.component';

import { EmployeeComponent } from '../employee.component';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  
  judulModal: string = 'New Employee';
  showModals = false;
  statusButtonCreate: boolean | undefined;

  alertValidasi: string = '';

  arrayGroup!: [];

  username:any='';
  firstName:any='';
  lastName:any='';
  email:any='';
  birthDate:any='';
  basicSalary:any='';
  status:any='';
  group:any='';
  description:any='';
  
  buttonSave = true;

  form = new FormGroup({
    username: new FormControl('',Validators.required,),
    firstName: new FormControl('',Validators.required,),
    lastName: new FormControl('',Validators.required,),
    email: new FormControl('',[Validators.required, Validators.email]),
    birthDate: new FormControl('',Validators.required,),
    basicSalary: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    status: new FormControl('',Validators.required,),
    group: new FormControl('',Validators.required,),
    description: new FormControl('',Validators.required,),
    // email: new FormControl('',[Validators.required, Validators.email]),
    // handphone: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    // avatar: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(50)])
  });

  constructor(
    private snackBar: MatSnackBar,
    private renderer:Renderer2,
    private el:ElementRef,
    private router: Router,
    private formBuilder: FormBuilder,
    private AppComponent: AppComponent,
    private headerComponent: HeaderComponent,
    private datepipe: DatePipe,
    private employeeComponent: EmployeeComponent
  ) { }

  ngOnInit(): void {
    this.arrayGroup = GlobalComponent.groupEmployee;
  }

  onCreate() {
    console.log("Karena Menggunakan Data Dummy, jadi saya tidak menggunakan API untuk hit Ke Database");
    this.headerComponent.tampilToastr('success', 'Employee Data Has Been Created', '');
    this.close();
    this.employeeComponent.ngOnInit();
  }
  
  periksaAlert(event: any): void{
    let tanggalSekarang = new Date();
    if(this.form.invalid){
      this.buttonSave = true;
    }else{
      if(this.datepipe.transform(tanggalSekarang, 'yyyy-MM-dd')! > this.datepipe.transform(this.birthDate,"yyyy-MM-dd")!){
        this.buttonSave = false;
      } else {
        this.headerComponent.tampilToastr('error', 'Please Insert Correct Birth Date', '');
        this.buttonSave = true;
      }
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }


  

  // Function Modal
  open(judulModal: any, statusButtonCreate: boolean) {
    this.judulModal = judulModal;
    this.statusButtonCreate = statusButtonCreate;

    this.showModals = true;
  }

  close() {
    this.showModals = false;
  }
  
  pesanSnackBar(pesan: any){
    this.snackBar.open(pesan, '', {
      duration: 3000
    });
  }

}
