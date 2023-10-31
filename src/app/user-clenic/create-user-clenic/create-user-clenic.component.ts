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
import { UserClenicComponent } from '../user-clenic.component';
import { UserClenicModule } from '../model/user-clenic.module';
import { UserClenicService } from '../service/user-clenic.service';
import { PackageHeaderService } from 'src/app/package/package-header/service/packageheader.service';

@Component({
  selector: 'app-create-user-clenic',
  templateUrl: './create-user-clenic.component.html',
  styleUrls: ['./create-user-clenic.component.css']
})
export class CreateUserClenicComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  
  judulModal: string = 'Pengguna Clenic Baru';
  showModals = false;
  statusButtonCreate: boolean | undefined;

  userClenic: UserClenicModule = new UserClenicModule();
  alertValidasi: string = '';
  
  PackageHeader!: [];
  selectPackageHeader!: any;

  title = 'Daftar Pengguna Clenic';
  currentIndex = -1;
  pages: 1 = 1;
  page = 1;
  count = 0;
  pageSize = 5;

  formUserClenic = new FormGroup({
    name: new FormControl('',Validators.required,),
    category: new FormControl('',Validators.required,),
    description: new FormControl('',Validators.required,),
    status: new FormControl('',Validators.required,),
    user_sales_type: new FormControl('',Validators.required,),
    package_header_id: new FormControl('',Validators.required,),
    // price: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    price: new FormControl('', {
      validators: [Validators.required, Validators.pattern("^[0-9]*$")],
      updateOn: 'blur'
    })
  });
  buttonSave = true;

  get name() {
    return this.formUserClenic.controls['name'];
  }
  
  get category() {
    return this.formUserClenic.controls['category'];
  }
  
  get description() {
    return this.formUserClenic.controls['description'];
  }
  
  get status() {
    return this.formUserClenic.controls['status'];
  }
  
  get user_sales_type() {
    return this.formUserClenic.controls['user_sales_type'];
  }
  
  get package_header_id() {
    return this.formUserClenic.controls['package_header_id'];
  }
  
  get price() {
    return this.formUserClenic.controls['price'];
  }
  
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    private headerComponent: HeaderComponent,
    private userClenicComponent: UserClenicComponent,
    private userClenicService: UserClenicService,
    private packageHeaderService: PackageHeaderService,
  ) { }

  ngOnInit(): void {
    this.ambilSemuaPackageHeader();
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

  ambilSemuaPackageHeader() {
    this.packageHeaderService.getAllPackageHeader().subscribe(
      (data: any) => {
        // console.log("Nilai Provinsi");
        // console.log(data.data);
        this.PackageHeader = data.data;
      }
    );
  }

  onCreate() {
    this.userClenic.package_header_id = this.selectPackageHeader.id;
    this.userClenicService.createUserClenic(this.userClenic).subscribe(
      (data: any) => {
         console.log(data);
        if(data.success == true){
          // console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Pengguna Clenic baru sudah dibuat');
          this.close();
          this.userClenicComponent.ngOnInit();
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
    console.log('this.formUserClenic = ' + this.formUserClenic.invalid);
    if(this.formUserClenic.invalid){
      this.buttonSave = true;
    }else{
      this.buttonSave = false;
    }
    console.log('this.buttonSave = ' + this.buttonSave);
  }

  cancel() {
    this.router.navigate(['/UserClenic']);
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

