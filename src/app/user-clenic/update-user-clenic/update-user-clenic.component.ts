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
import { UserClenicComponent } from '../user-clenic.component';
import { UserClenicModule } from '../model/user-clenic.module';
import { UserClenicService } from '../service/user-clenic.service';
import { PackageHeaderService } from 'src/app/package/package-header/service/packageheader.service';

@Component({
  selector: 'app-update-user-clenic',
  templateUrl: './update-user-clenic.component.html',
  styleUrls: ['./update-user-clenic.component.css']
})
export class UpdateUserClenicComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  
  judulModal: string = 'Ubah Pengguna Clenic';
  showModals = false;
  statusButton: boolean | undefined;

  id: any;
  private sub: any;
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
    id: new FormControl('',Validators.required,),
    code: new FormControl({ value: '', disabled: true },[Validators.required, Validators.pattern("^[0-9]*$")]),
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

  buttonUpdate = false;

  get code() {
    return this.formUserClenic.controls['code'];
  }
  
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
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private headerComponent: HeaderComponent,
    private userClenicComponent: UserClenicComponent,
    private userClenicService: UserClenicService,
    private packageHeaderService: PackageHeaderService,
    
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
    console.log("ID = " + this.id);
    console.log("Sub = " + this.sub);
    this.ambilSemuaPackageHeader();
    this.getUserClenickByID(this.id);
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

  getUserClenickByID(id: any){
    console.log("ID yang akan diupdate = " + id);
    this.userClenicService.getUserClenicByID(id).subscribe(
      (data: any) => {
        console.log("Get User Clenic By ID");
        console.log("data");
        console.log(data);
        // console.log("json");
        // console.log(JSON.stringify(data));
        this.userClenic = data.data[0];
        this.userClenic.price = Math.floor(this.userClenic.price);
        if(this.userClenic.status == 'active'){
          this.userClenic.status = JSON.parse("true");
        } else {
          this.userClenic.status = JSON.parse("false");
        }
        console.log("userClenic");
        console.log(this.userClenic);

        this.ambilPackageHeaderByID(this.userClenic.package_header_id);
      },(error: any) => console.log(error)
    );
  }
  
  onUpdate() {
    this.userClenic.package_header_id = this.selectPackageHeader.id;
    console.log("Update Data User Clenic");
    console.log(this.userClenic);
    this.userClenicService.updateUserClenic(this.userClenic).subscribe(
      (data: any) => {
         console.log(data);
        if(data.success == true){
          // console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Pengguna Clenic sudah diubah');
          this.close();
          this.userClenicComponent.ngOnInit();
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
    if(this.formUserClenic.invalid){
      this.buttonUpdate = true;
    }else{
      this.buttonUpdate = false;
    }
    // console.log('this.buttonUpdate = ' + this.buttonUpdate);
  }

  cancel() {
    this.router.navigate(['/UserClenic']);
  }
  


  ambilPackageHeaderByID(package_header_id: any) {
    this.packageHeaderService.getPackageHeaderByID(package_header_id).subscribe(
      (data: any) => {
        // console.log("Nilai Pelanggan");
        // console.log(data.data);
        this.selectPackageHeader = data.data[0];
      }
    );
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
