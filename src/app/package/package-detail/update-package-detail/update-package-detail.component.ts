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
import { PackageDetailComponent } from '../package-detail.component';
import { PackageDetail } from '../model/packagedetail.module';
import { PackageDetailService } from '../service/packagedetail.service';
import { UserClenicService } from 'src/app/user-clenic/service/user-clenic.service';
import { PackageHeaderService } from '../../package-header/service/packageheader.service';

@Component({
  selector: 'app-update-package-detail',
  templateUrl: './update-package-detail.component.html',
  styleUrls: ['./update-package-detail.component.css']
})

export class UpdatePackageDetailComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  
  judulModal: string = 'Ubah Package Details';
  showModals = false;
  statusButton: boolean | undefined;

  id: any;
  private sub: any;
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
    id: new FormControl('',Validators.required,),
    package_header_id: new FormControl('',Validators.required,),
    user_clenic_id: new FormControl('',Validators.required),
    qty: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")])
  });

  buttonUpdate = false;

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
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private headerComponent: HeaderComponent,
    private packageDetailComponent: PackageDetailComponent,
    private packageDetailService: PackageDetailService,
    private userClenicService: UserClenicService,
    private packageHeaderService: PackageHeaderService
    
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
    console.log("ID = " + this.id);
    console.log("Sub = " + this.sub);
    this.getPackageDetailByID(this.id);
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

  getPackageDetailByID(id: any){
    console.log("ID yang akan diupdate = " + id);
    this.packageDetailService.getPackageDetailByID(id).subscribe(
      (data: any) => {
        console.log("Get Package Detail By ID");
        console.log("data");
        console.log(data);
        // console.log("json");
        // console.log(JSON.stringify(data));
        this.packageDetail = data.data[0];
        console.log("Package Details");
        console.log(this.packageDetail);
        this.packageDetail.qty = Math.floor(this.packageDetail.qty);
        this.ambilPackageHeaderByID(this.packageDetail.package_header_id);
        this.ambilUserClenicByID(this.packageDetail.user_clenic_id);
      },(error: any) => console.log(error)
    );
  }

  ambilSemuaPackageHeader() {
    this.packageHeaderService.getAllPackageHeader().subscribe(
      (data: any) => {
        // console.log("Nilai Provinsi");
        // console.log(data.data);
        this.package_header = data.data;
      }
    );
  }

  ambilPackageHeaderByID(id: any) {
    this.packageHeaderService.getPackageHeaderByID(id).subscribe(
      (data: any) => {
        // console.log("Nilai Provinsi");
        // console.log(data.data);
        this.selectPackageHeader = data.data[0];
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

  ambilUserClenicByID(id: any) {
    this.userClenicService.getUserClenicByID(id).subscribe(
      (data: any) => {
        // console.log("Nilai Provinsi");
        // console.log(data.data);
        this.selectUserClenic = data.data[0];
      }
    );

  }

  onUpdate() {
    this.packageDetail.package_header_id = this.selectPackageHeader.id;
    this.packageDetail.user_clenic_id = this.selectUserClenic.id;
    console.log("this.packageDetail");
    console.log(this.packageDetail);
    this.packageDetailService.updatePackageDetail(this.packageDetail).subscribe(
      (data: any) => {
         console.log(data);
        if(data.success == true){
          // console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Package Detail sudah diubah');
          this.close();
          this.packageDetailComponent.ngOnInit();
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
    if(this.formPackageDetail.invalid){
      this.buttonUpdate = true;
    }else{
      this.buttonUpdate = false;
    }
    // console.log('this.buttonUpdate = ' + this.buttonUpdate);
  }

  cancel() {
    this.router.navigate(['/Klinik']);
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
