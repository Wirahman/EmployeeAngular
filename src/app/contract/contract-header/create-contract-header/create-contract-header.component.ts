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
import { HeaderComponent } from 'src/app/header/header.component';
import { ContractHeaderComponent } from '../contract-header.component';
import { ContractHeaderModule } from '../model/contractheader.module';
import { ContractHeaderService } from '../service/contract-header.service';
import { PelangganService } from 'src/app/pelanggan/service/pelanggan.service';
import { KlinikService } from 'src/app/klinik/service/klinik.service';
import { TermOfPaymentsService } from 'src/app/term-of-payments/service/term-of-payments.service';

@Component({
  selector: 'app-create-contract-header',
  templateUrl: './create-contract-header.component.html',
  styleUrls: ['./create-contract-header.component.css']
})
export class CreateContractHeaderComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  
  judulModal: string = 'Contract Header Baru';
  showModals = false;
  statusButtonCreate: boolean | undefined;

  contractHeader: ContractHeaderModule = new ContractHeaderModule();
  alertValidasi: string = '';
  
  pelanggan!: [];
  selectPelanggan!: any;
  klinik!: [];
  selectKlinik!: any;
  termOfPayments!: [];
  selectTermOfPayments!: any;
  title = 'Daftar Contract Header';
  currentIndex = -1;
  pages: 1 = 1;
  page = 1;
  count = 0;
  pageSize = 5;

  formKepalaKontrak = new FormGroup({
    customer_id: new FormControl('',Validators.required,),
    clinic_id: new FormControl('',Validators.required,),
    contract_date: new FormControl('',Validators.required,),
    contract_start_date: new FormControl('',Validators.required,),
    contract_end_date: new FormControl('',Validators.required,),
    subtotal: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    discount_type: new FormControl('',Validators.required,),
    discount_value: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    tax_type: new FormControl('',Validators.required,),
    tax_percentage: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    tax_value: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    grand_total: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    term_of_payments_id: new FormControl('',Validators.required,),
    status: new FormControl('',Validators.required,),
    description: new FormControl('',Validators.required,)
  });
  
  buttonSave = true;

  get customer_id() {
    return this.formKepalaKontrak.controls['customer_id'];
  }
  
  get clinic_id() {
    return this.formKepalaKontrak.controls['clinic_id'];
  }
  
  get contract_date() {
    return this.formKepalaKontrak.controls['contract_date'];
  }
  
  get contract_start_date() {
    return this.formKepalaKontrak.controls['contract_start_date'];
  }
  
  get contract_end_date() {
    return this.formKepalaKontrak.controls['contract_end_date'];
  }
  
  get subtotal() {
    return this.formKepalaKontrak.controls['subtotal'];
  }
  
  get discount_type() {
    return this.formKepalaKontrak.controls['discount_type'];
  }
  
  get discount_value() {
    return this.formKepalaKontrak.controls['discount_value'];
  }
  
  get tax_type() {
    return this.formKepalaKontrak.controls['tax_type'];
  }
  
  get tax_percentage() {
    return this.formKepalaKontrak.controls['tax_percentage'];
  }
  
  get tax_value() {
    return this.formKepalaKontrak.controls['tax_value'];
  }
  
  get grand_total() {
    return this.formKepalaKontrak.controls['grand_total'];
  }
  
  get term_of_payments_id() {
    return this.formKepalaKontrak.controls['term_of_payments_id'];
  }
  
  get status() {
    return this.formKepalaKontrak.controls['status'];
  }
  
  get description() {
    return this.formKepalaKontrak.controls['description'];
  }
  
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private headerComponent: HeaderComponent,
    private contractHeaderComponent: ContractHeaderComponent,
    private contractHeaderService: ContractHeaderService,
    private pelangganService: PelangganService,
    private klinikService: KlinikService,
    private termOfPaymentsService: TermOfPaymentsService,
  ) { }

  ngOnInit(): void {
    this.ambilSemuaPelanggan();
    this.ambilSemuaKlinik();
    this.ambilSemuaTermOfPayments();
    var date = new Date();
    console.log(this.datePipe.transform(date,"yyyy-MM-dd")); //output : 2018-02-13
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

  ambilSemuaPelanggan() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    console.log(params);
    this.pelangganService.getAllPelanggan(params).subscribe(
      (data: any) => {
        console.log("Nilai Pelanggan");
        console.log(data.data);
        this.pelanggan = data.data;
      }
    );
  }

  ambilSemuaKlinik() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    console.log(params);
    this.klinikService.getAllKlinik(params).subscribe(
      (data: any) => {
        // console.log("Nilai Provinsi");
        // console.log(data.data);
        this.klinik = data.data;
      }
    );
  }

  ambilSemuaTermOfPayments() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    console.log(params);
    this.termOfPaymentsService.getAllTermsOfPayment(params).subscribe(
      (data: any) => {
        // console.log("Nilai Provinsi");
        // console.log(data.data);
        this.termOfPayments = data.data;
      }
    );
  }

  onCreate() {
    this.contractHeader.customer_id = this.customer_id.value.id.toString();
    this.contractHeader.clinic_id = this.clinic_id.value.id.toString();
    this.contractHeader.term_of_payments_id = this.term_of_payments_id.value.id.toString();

    // var date = new Date();
    // console.log(this.datePipe.transform(date,"yyyy-MM-dd")); //output : 2018-02-13
    console.log(this.klinik);
    this.contractHeader.contract_date = this.datePipe.transform(this.contractHeader.contract_date,"yyyy-MM-dd");
    this.contractHeader.contract_start_date = this.datePipe.transform(this.contractHeader.contract_start_date,"yyyy-MM-dd");
    this.contractHeader.contract_end_date = this.datePipe.transform(this.contractHeader.contract_end_date,"yyyy-MM-dd");

    this.contractHeaderService.createContractHeader(this.contractHeader).subscribe(
      (data: any) => {
         console.log(data);
        if(data.success == true){
          // console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Contract Header baru sudah dibuat');
          this.close();
          this.contractHeaderComponent.ngOnInit();
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
    // console.log("Periksa alert");
    // console.log('this.formKepalaKontrak = ' + this.formKepalaKontrak.invalid);
    if(this.formKepalaKontrak.invalid){
      this.buttonSave = true;
    }else{
      this.buttonSave = false;
    }
    // console.log('this.buttonSave = ' + this.buttonSave);
  }

  ambilKlinikPerCustomer(){
    this.klinikService.getAllKlinikByCustomerID(this.customer_id.value.id).subscribe(
      (data: any) => {
        console.log("Nilai Klinik per Customer ID");
        console.log(data.data);
        this.klinik = data.data;
      }
    );
  }
  
  cancel() {
    this.router.navigate(['/ContractHeader']);
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

