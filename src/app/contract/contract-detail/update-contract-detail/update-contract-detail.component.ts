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
import { ContractDetailComponent } from '../contract-detail.component';
import { ContractDetailModule } from '../model/contract-detail.module';
import { ContractDetailService } from '../service/contract-detail.service';
import { ContractHeaderService } from '../../contract-header/service/contract-header.service';
import { UserClenicService } from 'src/app/user-clenic/service/user-clenic.service';

@Component({
  selector: 'app-update-contract-detail',
  templateUrl: './update-contract-detail.component.html',
  styleUrls: ['./update-contract-detail.component.css']
})
export class UpdateContractDetailComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  
  judulModal: string = 'Ubah Detail Kontrak';
  showModals = false;
  statusButton: boolean | undefined;

  id: any;
  private sub: any;
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
    id: new FormControl('',Validators.required,),
    code: new FormControl({ value: '', disabled: true },[Validators.required, Validators.pattern("^[0-9]*$")]),
    contract_header_id: new FormControl('',Validators.required,),
    user_clenic_id: new FormControl('',Validators.required,),
    qty: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    price: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    discount_type: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    discount_value: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    subtotal: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
  });
  
  buttonUpdate = false;

  get code() {
    return this.formDetailKontrak.controls['code'];
  }
  
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
    // this.sub = this.route.params.subscribe(params => {
    //   this.id = +params['id']; // (+) converts string 'id' to a number

    //   // In a real app: dispatch action to load the details here.
    // });
    console.log("ID = " + this.id);
    console.log("Sub = " + this.sub);
    this.ambilContractDetailByID(this.id);
    this.ambilSemuaContractHeader();
    this.ambilSemuaUserKlinik();
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
        // console.log("Nilai Contract Detail");
        // console.log(data.data);
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

  ambilContractDetailByID(id: any){
    console.log("ID yang akan diupdate = " + id);
    this.contractDetailService.getContractDetailByID(id).subscribe(
      (data: any) => {
        // console.log("Get Kepala Kontrak By ID");
        // console.log("data");
        // console.log(data);
        // console.log("json");
        // console.log(JSON.stringify(data));
        this.contractDetail = data.data[0];
        console.log("Contract Detail");
        console.log(this.contractDetail);
        this.contractDetail.qty = Math.floor(this.contractDetail.qty);
        this.contractDetail.price = Math.floor(this.contractDetail.price);
        this.contractDetail.discount_value = Math.floor(this.contractDetail.discount_value);
        this.contractDetail.subtotal = Math.floor(this.contractDetail.subtotal);
        this.ambilContractHeaderByID(this.contractDetail.contract_header_id);
        this.ambilUserClenic(this.contractDetail.user_clenic_id);
      },(error: any) => console.log(error)
    );
  }

  ambilContractHeaderByID(contractHeaderID: any) {
    this.contractHeaderService.getContractHeaderByID(contractHeaderID).subscribe(
      (data: any) => {
        // console.log("Nilai Pelanggan");
        // console.log(data.data);
        this.selectContractHeader = data.data[0];
      }
    );
  }

  ambilUserClenic(userClenicID: any) {
    this.userClenicService.getUserClenicByID(userClenicID).subscribe(
      (data: any) => {
        // console.log("Nilai Pelanggan");
        // console.log(data.data);
        this.selectUserClenic = data.data[0];
      }
    );
  }

  onUpdate() {
    this.contractDetail.contract_header_id = this.selectContractHeader.id;
    this.contractDetail.user_clenic_id = this.selectUserClenic.id;
    console.log("Update Data Contract Detail");
    console.log(this.contractDetail);
    this.contractDetailService.updateContractDetail(this.contractDetail).subscribe(
      (data: any) => {
         console.log(data);
        if(data.success == true){
          // console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Detail Kontrak sudah diubah');
          this.close();
          this.contractDetailComponent.ngOnInit();
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
    // console.log(this.formDetailKontrak);
    // console.log("Periksa alert");
    // console.log('this.formKepalaKontrak = ' + this.formDetailKontrak.invalid);
    if(this.formDetailKontrak.invalid){
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
    const controls = this.formDetailKontrak.controls;
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
