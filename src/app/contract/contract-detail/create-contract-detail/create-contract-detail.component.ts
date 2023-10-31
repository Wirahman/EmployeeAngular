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
import { ContractDetailComponent } from '../contract-detail.component';
import { ContractDetailModule } from '../model/contract-detail.module';
import { ContractDetailService } from '../service/contract-detail.service';
import { ContractHeaderService } from '../../contract-header/service/contract-header.service';
import { UserClenicService } from 'src/app/user-clenic/service/user-clenic.service';

@Component({
  selector: 'app-create-contract-detail',
  templateUrl: './create-contract-detail.component.html',
  styleUrls: ['./create-contract-detail.component.css']
})
export class CreateContractDetailComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  
  judulModal: string = 'Detail Kontrak Baru';
  showModals = false;
  statusButtonCreate: boolean | undefined;

  contractDetail: ContractDetailModule = new ContractDetailModule();
  alertValidasi: string = '';
  
  contractHeader!: [];
  selectContractHeader!: any;
  userClenic!: [];
  selectUserClenic!: any;
  title = 'Daftar Detail Kontrak';
  currentIndex = -1;
  pages: 1 = 1;
  page = 1;
  count = 0;
  pageSize = 5;

  formDetailKontrak = new FormGroup({
    contract_header_id: new FormControl('',Validators.required,),
    user_clenic_id: new FormControl('',Validators.required,),
    qty: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    price: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    discount_type: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    discount_value: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    subtotal: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
  });
  
  buttonSave = true;

  get contract_header_id() {
    return this.formDetailKontrak.controls['contract_header_id'];
  }
  
  get user_clenic_id() {
    return this.formDetailKontrak.controls['user_clenic_id'];
  }
  
  get qty() {
    return this.formDetailKontrak.controls['qty'];
  }
  
  get price() {
    return this.formDetailKontrak.controls['price'];
  }
  
  get discount_type() {
    return this.formDetailKontrak.controls['discount_type'];
  }
  
  get discount_value() {
    return this.formDetailKontrak.controls['discount_value'];
  }
  
  get subtotal() {
    return this.formDetailKontrak.controls['subtotal'];
  }
  
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private headerComponent: HeaderComponent,
    private contractDetailComponent: ContractDetailComponent,
    private contractDetailService: ContractDetailService,
    private contractHeaderService: ContractHeaderService,
    private userClenicService: UserClenicService,
  ) { }

  ngOnInit(): void {
    this.ambilSemuaContractHeader();
    this.ambilSemuaUserKlinik();
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

  ambilSemuaContractHeader() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    console.log(params);
    this.contractHeaderService.getAllContractHeader().subscribe(
      (data: any) => {
        console.log("Nilai Contract Header");
        console.log(data.data);
        this.contractHeader = data.data;
      }
    );
  }

  ambilSemuaUserKlinik() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    console.log(params);
    this.userClenicService.getAllUserClenic(params).subscribe(
      (data: any) => {
        // console.log("Nilai Provinsi");
        // console.log(data.data);
        this.userClenic = data.data;
      }
    );
  }

  onCreate() {
    this.contractDetail.contract_header_id = this.contract_header_id.value.id.toString();
    this.contractDetail.user_clenic_id = this.user_clenic_id.value.id.toString();

    this.contractDetailService.createContractDetail(this.contractDetail).subscribe(
      (data: any) => {
         console.log(data);
        if(data.success == true){
          // console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Contract Detail baru sudah dibuat');
          this.close();
          this.contractDetailComponent.ngOnInit();
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
    // console.log('this.formDetailKontrak = ' + this.formDetailKontrak.invalid);
    if(this.formDetailKontrak.invalid){
      this.buttonSave = true;
    }else{
      this.buttonSave = false;
    }
    var invalid = this.findInvalidControls();
    console.log(invalid);
    // console.log('this.buttonSave = ' + this.buttonSave);
  }

  cancel() {
    this.router.navigate(['/ContractDetail']);
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

  public findInvalidControls() {
    const invalid = [];
    const controls = this.formDetailKontrak.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
}
  
  

}

