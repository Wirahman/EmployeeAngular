import { Component, OnInit, Output, EventEmitter, Renderer2, RendererFactory2, ElementRef, } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute,Router } from '@angular/router';
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
  selector: 'app-update-contract-header',
  templateUrl: './update-contract-header.component.html',
  styleUrls: ['./update-contract-header.component.css']
})
export class UpdateContractHeaderComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  
  judulModal: string = 'Ubah Package Header';
  showModals = false;
  statusButton: boolean | undefined;

  id: any;
  private sub: any;
  contractHeader: ContractHeaderModule = new ContractHeaderModule();
  alertValidasi: string = '';
  
  pelanggan!: [];
  selectPelanggan!: any;
  klinik!: [];
  selectKlinik!: any;
  termOfPayments!: [];
  selectTermOfPayments!: any;
  title = 'Daftar Package Header';
  currentIndex = -1;
  pages: 1 = 1;
  page = 1;
  count = 0;
  pageSize = 5;
  formKepalaKontrak = new FormGroup({
    id: new FormControl('',Validators.required,),
    code: new FormControl({ value: '', disabled: true },[Validators.required, Validators.pattern("^[0-9]*$")]),
    customer_id: new FormControl({ value: '', disabled: true },Validators.required,),
    clinic_id: new FormControl({ value: '', disabled: true },Validators.required,),
    contract_date: new FormControl('',Validators.required,),
    contract_start_date: new FormControl('',Validators.required,),
    contract_end_date: new FormControl('',Validators.required,),
    subtotal: new FormControl('',Validators.required,),
    // subtotal: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    discount_type: new FormControl('',Validators.required,),
    discount_value: new FormControl('',Validators.required,),
    // discount_value: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    tax_type: new FormControl('',Validators.required,),
    tax_percentage: new FormControl('',Validators.required,),
    tax_value: new FormControl('',Validators.required,),
    grand_total: new FormControl('',Validators.required,),
    // tax_percentage: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    // tax_value: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    // grand_total: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    term_of_payments_id: new FormControl('',Validators.required,),
    status: new FormControl('',Validators.required,),
    description: new FormControl('',Validators.required,)
  });
  
  buttonUpdate = false;

  get code() {
    return this.formKepalaKontrak.controls['code'];
  }
  
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
    private route: ActivatedRoute,
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
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
    console.log("ID = " + this.id);
    console.log("Sub = " + this.sub);
    this.ambilSemuaPelanggan();
    this.ambilContractHeaderByID(this.id);
    this.ambilSemuaKlinik();
    this.ambilSemuaTermOfPayments();
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
        // console.log("Nilai Provinsi");
        // console.log(data.data);
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

  ambilContractHeaderByID(id: any){
    console.log("ID yang akan diupdate = " + id);
    this.contractHeaderService.getContractHeaderByID(id).subscribe(
      (data: any) => {
        // console.log("Get Package Header By ID");
        // console.log("data");
        // console.log(data);
        // console.log("json");
        // console.log(JSON.stringify(data));
        this.contractHeader = data.data[0];
        if(this.contractHeader.status == 'active'){
          this.contractHeader.status = JSON.parse("true");
        } else {
          this.contractHeader.status = JSON.parse("false");
        }
        this.contractHeader.contract_date = this.datePipe.transform(this.contractHeader.contract_date,"MM/dd/yyyy");
        this.contractHeader.contract_start_date = this.datePipe.transform(this.contractHeader.contract_start_date,"MM/dd/yyyy");
        this.contractHeader.contract_end_date = this.datePipe.transform(this.contractHeader.contract_end_date,"MM/dd/yyyy");
        // console.log("Contract Header");
        // console.log(this.contractHeader);
        this.ambilPelangganByID(this.contractHeader.customer_id);
        this.ambilKlinikByID(this.contractHeader.clinic_id);
        this.ambilTermOfPaymentsByID(this.contractHeader.term_of_payments_id);
      },(error: any) => console.log(error)
    );
  }

  ambilPelangganByID(customer_id: any) {
    this.pelangganService.getPelangganByID(customer_id).subscribe(
      (data: any) => {
        // console.log("Nilai Pelanggan");
        // console.log(data.data);
        this.selectPelanggan = data.data[0];
      }
    );
  }

  ambilKlinikByID(clinic_id: any) {
    this.klinikService.getKlinikByID(clinic_id).subscribe(
      (data: any) => {
        // console.log("Nilai Pelanggan");
        // console.log(data.data);
        this.selectKlinik = data.data[0];
      }
    );
  }

  ambilTermOfPaymentsByID(term_of_payments_id: any) {
    this.termOfPaymentsService.getTermsOfPaymentByID(term_of_payments_id).subscribe(
      (data: any) => {
        // console.log("Nilai Pelanggan");
        // console.log(data.data);
        this.selectTermOfPayments = data.data[0];
      }
    );
  }

  onUpdate() {
    this.contractHeader.customer_id = this.selectPelanggan.id;
    this.contractHeader.contract_date = this.datePipe.transform(this.contractHeader.contract_date,"yyyy-MM-dd");
    this.contractHeader.contract_start_date = this.datePipe.transform(this.contractHeader.contract_start_date,"yyyy-MM-dd");
    this.contractHeader.contract_end_date = this.datePipe.transform(this.contractHeader.contract_end_date,"yyyy-MM-dd");
    console.log("Update Data Klinik");
    console.log(this.contractHeader);
    this.contractHeaderService.updateContractHeader(this.contractHeader).subscribe(
      (data: any) => {
         console.log(data);
        if(data.success == true){
          // console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Package Header sudah diubah');
          this.close();
          this.contractHeaderComponent.ngOnInit();
          // this.router.navigate(['/Dashboard/Permission']);
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
    // console.log(this.formKepalaKontrak);
    // console.log("Periksa alert");
    // console.log('this.formKepalaKontrak = ' + this.formKepalaKontrak.invalid);
    if(this.formKepalaKontrak.invalid){
      this.buttonUpdate = true;
    }else{
      this.buttonUpdate = false;
    }
    
    var invalid = this.findInvalidControls();
    console.log(invalid);
    // console.log('this.buttonUpdate = ' + this.buttonUpdate);
  }

  cancel() {
    this.router.navigate(['/ContractHeader']);
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.formKepalaKontrak.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
}
  


  

  // Function Modal
  open(id: any, judulModal: any, statusButton: boolean) {
    this.id = id;
    this.judulModal = judulModal;
    this.statusButton = statusButton;

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
