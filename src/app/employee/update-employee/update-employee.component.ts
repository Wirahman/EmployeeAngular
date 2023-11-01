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
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  judulModal: string = 'Update Employee';
  showModals = false;
  statusButton: boolean | undefined;

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
  
  buttonUpdate = true;
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

  onUpdate() {
    console.log("Karena Menggunakan Data Dummy, jadi saya tidak menggunakan API untuk hit Ke Database");
    this.headerComponent.tampilToastr('success', 'Employee Data Has Been Updated', '');
    this.close();
    this.employeeComponent.ngOnInit();
  }
  
  periksaAlert(event: any): void{
    let tanggalSekarang = new Date();
    if(this.form.invalid){
      this.buttonUpdate = true;
    }else{
      if(this.datepipe.transform(tanggalSekarang, 'yyyy-MM-dd')! > this.datepipe.transform(this.birthDate,"yyyy-MM-dd")!){
        this.buttonUpdate = false;
      } else {
        this.headerComponent.tampilToastr('error', 'Please Insert Correct Birth Date', '');
        this.buttonUpdate = true;
      }
    }
  }

  checkNilaiGroup(event: any): void{
    console.log('group');
    console.log(this.group);
    console.log('event');
    console.log(event);
  }


  cancel() {
    this.router.navigate(['/Pengguna']);
  }
  


  

  // Function Modal
  open(id: any, judulModal: any, statusButton: boolean, array: []) {
    // this.id = id;
    this.pasangArray(array);
    this.judulModal = judulModal;
    this.statusButton = statusButton;

    this.showModals = true;
  }

  pasangArray(array:  any = [])
  {
    this.username = array.username;
    this.firstName = array.firstName;
    this.lastName = array.lastName;
    this.email = array.email;
    this.birthDate = this.datepipe.transform(array.birthDate,"MM/dd/yyyy");
    // this.birthDate = array.birthDate;
    this.basicSalary = array.basicSalary;
    this.status = array.status;
    this.group = array.group;
    this.description = this.datepipe.transform(array.description,"MM/dd/yyyy");
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
