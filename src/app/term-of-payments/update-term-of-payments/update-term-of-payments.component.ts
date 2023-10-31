import { Component, OnInit, Output, EventEmitter, Renderer2, RendererFactory2, ElementRef, } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute,Router } from '@angular/router';
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
  selector: 'app-update-term-of-payments',
  templateUrl: './update-term-of-payments.component.html',
  styleUrls: ['./update-term-of-payments.component.css']
})
export class UpdateTermOfPaymentsComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  
  judulModal: string = 'Ubah Data Pembayaran';
  showModals = false;
  statusButton: boolean | undefined;

  id: any;
  private sub: any;
  termOfPayments: TermOfPaymentsModule = new TermOfPaymentsModule();
  alertValidasi: string = '';
  
  title = 'Daftar Data Pembayaran';
  currentIndex = -1;
  pages: 1 = 1;
  page = 1;
  count = 0;
  pageSize = 5;
  
  formTermOfPayments = new FormGroup({
    id: new FormControl('',Validators.required,),
    code: new FormControl({ value: '', disabled: true },[Validators.required, Validators.pattern("^[0-9]*$")]),
    name: new FormControl('',Validators.required,),
    tempo: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    status: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required)
  });
  buttonUpdate = false;

  get code() {
    return this.formTermOfPayments.controls['code'];
  }
  
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
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private headerComponent: HeaderComponent,
    private termOfPaymentsComponent: TermOfPaymentsComponent,
    private termOfPaymentsService: TermOfPaymentsService
    
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
    console.log("ID = " + this.id);
    console.log("Sub = " + this.sub);
    this.getTermOfPaymentsByID(this.id);
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

  getTermOfPaymentsByID(id: any){
    console.log("ID yang akan diupdate = " + id);
    this.termOfPaymentsService.getTermsOfPaymentByID(id).subscribe(
      (data: any) => {
        console.log("Get Term Of Payments By ID");
        console.log("data");
        console.log(data);
        // console.log("json");
        // console.log(JSON.stringify(data));
        this.termOfPayments = data.data[0];
        if(this.termOfPayments.status == 'active'){
          this.termOfPayments.status = JSON.parse("true");
        } else {
          this.termOfPayments.status = JSON.parse("false");
        }
      },(error: any) => console.log(error)
    );
  }

  onUpdate() {
    this.termOfPaymentsService.updateTermsOfPayment(this.termOfPayments).subscribe(
      (data: any) => {
         console.log(data);
        if(data.success == true){
          // console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Data Pembayaran sudah diubah');
          this.close();
          this.termOfPaymentsComponent.ngOnInit();
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
    // console.log(this.formKlinik);
    // console.log("Periksa alert");
    // console.log('this.formKlinik = ' + this.formKlinik.invalid);
    if(this.formTermOfPayments.invalid){
      this.buttonUpdate = true;
    }else{
      this.buttonUpdate = false;
    }
    // console.log('this.buttonUpdate = ' + this.buttonUpdate);
  }

  cancel() {
    this.router.navigate(['/TermOfPayments']);
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
