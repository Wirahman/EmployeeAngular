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
import { PackageHeaderComponent } from '../package-header.component';
import { PackageHeader } from '../model/packageheader.module';
import { PackageHeaderService } from '../service/packageheader.service';

@Component({
  selector: 'app-update-package-header',
  templateUrl: './update-package-header.component.html',
  styleUrls: ['./update-package-header.component.css']
})
export class UpdatePackageHeaderComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  
  judulModal: string = 'Ubah Package Header';
  showModals = false;
  statusButton: boolean | undefined;

  id: any;
  private sub: any;
  packageHeader: PackageHeader = new PackageHeader();
  alertValidasi: string = '';
  
  title = 'Daftar Package Header';
  currentIndex = -1;
  pages: 1 = 1;
  page = 1;
  count = 0;
  pageSize = 5;
  formPackageHeader = new FormGroup({
    id: new FormControl('',Validators.required,),
    code: new FormControl({ value: '', disabled: true },[Validators.required, Validators.pattern("^[0-9]*$")]),
    name: new FormControl('',Validators.required,),
    status: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    // email: new FormControl('',[Validators.required, Validators.email]),
    // hp: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    // avatar: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(50)])
  });

  buttonUpdate = false;

  get code() {
    return this.formPackageHeader.controls['code'];
  }
  
  get name() {
    return this.formPackageHeader.controls['name'];
  }
  
  get status() {
    return this.formPackageHeader.controls['status'];
  }
  
  get description() {
    return this.formPackageHeader.controls['description'];
  }
  
  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private headerComponent: HeaderComponent,
    private packageHeaderComponent: PackageHeaderComponent,
    private packageheaderService: PackageHeaderService
    
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
    console.log("ID = " + this.id);
    console.log("Sub = " + this.sub);
    this.getPackageHeaderByID(this.id);
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

  getPackageHeaderByID(id: any){
    console.log("ID yang akan diupdate = " + id);
    this.packageheaderService.getPackageHeaderByID(id).subscribe(
      (data: any) => {
        console.log("Get Package Header By ID");
        console.log("data");
        console.log(data);
        // console.log("json");
        // console.log(JSON.stringify(data));
        this.packageHeader = data.data[0];
        if(this.packageHeader.status == 'active'){
          this.packageHeader.status = JSON.parse("true");
        } else {
          this.packageHeader.status = JSON.parse("false");
        }
        console.log("Package Header");
        console.log(this.packageHeader);

      },(error: any) => console.log(error)
    );
  }

  onUpdate() {
    console.log("Update Data Package Header");
    console.log(this.packageHeader);
    this.packageheaderService.updatePackageHeader(this.packageHeader).subscribe(
      (data: any) => {
         console.log(data);
        if(data.success == true){
          // console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Package Header sudah diubah');
          this.close();
          this.packageHeaderComponent.ngOnInit();
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
    // console.log(this.formPackageHeader);
    // console.log("Periksa alert");
    // console.log('this.formPackageHeader = ' + this.formPackageHeader.invalid);
    if(this.formPackageHeader.invalid){
      this.buttonUpdate = true;
    }else{
      this.buttonUpdate = false;
    }
    // console.log('this.buttonUpdate = ' + this.buttonUpdate);
  }

  cancel() {
    this.router.navigate(['/PackageHeader']);
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
