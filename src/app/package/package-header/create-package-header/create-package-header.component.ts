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
import { PackageHeaderComponent } from '../package-header.component';
import { PackageHeader } from '../model/packageheader.module';
import { PackageHeaderService } from '../service/packageheader.service';

@Component({
  selector: 'app-create-package-header',
  templateUrl: './create-package-header.component.html',
  styleUrls: ['./create-package-header.component.css']
})
export class CreatePackageHeaderComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  
  judulModal: string = 'Package Header Baru';
  showModals = false;
  statusButtonCreate: boolean | undefined;

  packageHeader: PackageHeader = new PackageHeader();
  alertValidasi: string = '';
  
  title = 'Daftar Package Header';
  currentIndex = -1;
  pages: 1 = 1;
  page = 1;
  count = 0;
  pageSize = 5;

  formPackageHeader = new FormGroup({
    name: new FormControl('',Validators.required,),
    status: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required,)
  });

  buttonSave = true;

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
    private router: Router,
    private formBuilder: FormBuilder,
    private headerComponent: HeaderComponent,
    private packageHeaderComponent: PackageHeaderComponent,
    private packageheaderService: PackageHeaderService
  ) { }

  ngOnInit(): void {
    
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

  onCreate() {
    this.packageheaderService.createPackageHeader(this.packageHeader).subscribe(
      (data: any) => {
         console.log(data);
        if(data.success == true){
          // console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Package Header baru sudah dibuat');
          this.close();
          this.packageHeaderComponent.ngOnInit();
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
    console.log('this.formKlinik = ' + this.formPackageHeader.invalid);
    if(this.formPackageHeader.invalid){
      this.buttonSave = true;
    }else{
      this.buttonSave = false;
    }
    console.log('this.buttonSave = ' + this.buttonSave);
  }

  cancel() {
    this.router.navigate(['/Klinik']);
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
