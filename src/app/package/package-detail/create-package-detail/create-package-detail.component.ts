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
import { PackageDetailComponent } from '../package-detail.component';
import { PackageDetail } from '../model/packagedetail.module';
import { PackageDetailService } from '../service/packagedetail.service';
import { UserClenicService } from 'src/app/user-clenic/service/user-clenic.service';
import { PackageHeaderService } from '../../package-header/service/packageheader.service';

@Component({
  selector: 'app-create-package-detail',
  templateUrl: './create-package-detail.component.html',
  styleUrls: ['./create-package-detail.component.css']
})

export class CreatePackageDetailComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  
  judulModal: string = 'Package Details Baru';
  showModals = false;
  statusButtonCreate: boolean | undefined;

  packageDetail: PackageDetail = new PackageDetail();
  alertValidasi: string = '';
  
  package_header!: [];
  selectPackageHeader!: any;
  user_clenic!: [];
  selectUserClenic!: any;
  title = 'Daftar Package Details';
  currentIndex = -1;
  pages: 1 = 1;
  page = 1;
  count = 0;
  pageSize = 5;

  formPackageDetail = new FormGroup({
    package_header_id: new FormControl('',Validators.required,),
    user_clenic_id: new FormControl('',Validators.required),
    qty: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")])
  });

  buttonSave = true;

  get package_header_id() {
    return this.formPackageDetail.controls['package_header_id'];
  }
  
  get user_clenic_id() {
    return this.formPackageDetail.controls['user_clenic_id'];
  }
  
  get qty() {
    return this.formPackageDetail.controls['qty'];
  }
  
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    private headerComponent: HeaderComponent,
    private packageDetailComponent: PackageDetailComponent,
    private packageDetailService: PackageDetailService,
    private userClenicService: UserClenicService,
    private packageHeaderService: PackageHeaderService
  ) { }

  ngOnInit(): void {
    this.ambilSemuaPackageHeader();
    this.ambilSemuaUserClenic();
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
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    console.log(params);
    this.packageHeaderService.getAllPackageHeader().subscribe(
      (data: any) => {
        // console.log("Nilai Provinsi");
        // console.log(data.data);
        this.package_header = data.data;
      }
    );
  }

  ambilSemuaUserClenic() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    console.log(params);
    this.userClenicService.getAllUserClenic(params).subscribe(
      (data: any) => {
        // console.log("Nilai Provinsi");
        // console.log(data.data);
        this.user_clenic = data.data;
      }
    );
  }

  onCreate() {
    this.packageDetail.package_header_id = this.package_header_id.value.id.toString();
    this.packageDetail.user_clenic_id = this.user_clenic_id.value.id.toString();
    this.packageDetailService.createPackageDetail(this.packageDetail).subscribe(
      (data: any) => {
         console.log(data);
        if(data.success == true){
          // console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Package Details baru sudah dibuat');
          this.close();
          this.packageDetailComponent.ngOnInit();
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
    console.log('this.formPackageDetail = ' + this.formPackageDetail.invalid);
    if(this.formPackageDetail.invalid){
      this.buttonSave = true;
    }else{
      this.buttonSave = false;
    }
    console.log('this.buttonSave = ' + this.buttonSave);
  }

  cancel() {
    this.router.navigate(['/PackageDetail']);
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
