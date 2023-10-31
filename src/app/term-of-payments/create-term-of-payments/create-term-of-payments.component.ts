import { Component, OnInit, Output, EventEmitter, Renderer2, RendererFactory2, ElementRef, } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

// Clarity Design
import '@cds/core/forms/register.js';
import '@cds/core/input/register.js';
import '@cds/core/password/register.js';
import '@cds/core/button/register.js';
import { ClarityIcons } from "@clr/icons";
// import '@clr/icons';
// import '@clr/icons/shapes/essential-shapes';

// Component Library
import { HeaderComponent } from 'src/app/header/header.component';
import { TermOfPaymentsComponent } from '../term-of-payments.component';
import { TermOfPaymentsModule } from '../model/term-of-payments.module';
import { TermOfPaymentsService } from '../service/term-of-payments.service';
@Component({
  selector: 'app-create-term-of-payments',
  templateUrl: './create-term-of-payments.component.html',
  styleUrls: ['./create-term-of-payments.component.css']
})
export class CreateTermOfPaymentsComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  
  judulModal: string = 'Pembayaran Baru';
  showModals = false;
  statusButtonCreate: boolean | undefined;

  termOfPayments: TermOfPaymentsModule = new TermOfPaymentsModule();
  alertValidasi: string = '';

  title = 'Daftar Pembayaran';
  currentIndex = -1;
  pages: 1 = 1;
  page = 1;
  count = 0;
  pageSize = 5;

  formTermOfPayments = new FormGroup({
    name: new FormControl('',Validators.required,),
    tempo: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    status: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required)
  });

  buttonSave = true;

  get name() {
    return this.formTermOfPayments.controls['name'];
  }
  
  get tempo() {
    return this.formTermOfPayments.controls['tempo'];
  }
  
  get status() {
    return this.formTermOfPayments.controls['status'];
  }
  
  get description() {
    return this.formTermOfPayments.controls['description'];
  }
  
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    private headerComponent: HeaderComponent,
    private termOfPaymentsComponent: TermOfPaymentsComponent,
    private termOfPaymentsService: TermOfPaymentsService
  ) { }

  ngOnInit(): void {
    
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

  onCreate() {
    this.termOfPaymentsService.createTermsOfPayment(this.termOfPayments).subscribe(
      (data: any) => {
         console.log(data);
        if(data.success == true){
          // console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Data Pembayaran baru sudah dibuat');
          this.close();
          this.termOfPaymentsComponent.ngOnInit();
        } else {
            this.headerComponent.tampilToastr('error', '', data.message);
            // this.alertValidasi = '';
            // this.alertValidasi = data.message;
        }
      },(error: any) => {
        this.headerComponent.tampilToastr('error', error.error.message, '');
      }
    );
  }
  
  periksaAlert(event: any): void{
    console.log("Periksa alert");
    console.log('this.formTermOfPayments = ' + this.formTermOfPayments.invalid);
    if(this.formTermOfPayments.invalid){
      this.buttonSave = true;
    }else{
      this.buttonSave = false;
    }
    console.log('this.buttonSave = ' + this.buttonSave);
  }

  cancel() {
    this.router.navigate(['/TermOfPayments']);
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

