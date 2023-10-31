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
import { PermissionComponent } from '../permission.component';
import { PermissionModule } from '../model/permission.module';
import { PermissionService } from '../service/permission.service';

@Component({
  selector: 'app-create-permission',
  templateUrl: './create-permission.component.html',
  styleUrls: ['./create-permission.component.css']
})

export class CreatePermissionComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  
  judulModal: string = 'Hak Akses Baru';
  showModals = false;
  statusButtonCreate: boolean | undefined;

  permission: PermissionModule = new PermissionModule();
  alertValidasi: string = '';

  formPermission = new FormGroup({
    name: new FormControl('',Validators.required,),
    status: new FormControl('',Validators.required,),
    description: new FormControl('',Validators.required),
    // email: new FormControl('',[Validators.required, Validators.email]),
    // hp: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    // avatar: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(50)])
  });

  buttonSave = true;

  get name() {
    return this.formPermission.controls['name'];
  }
  
  get status() {
    return this.formPermission.controls['status'];
  }
  
  get description() {
    return this.formPermission.controls['description'];
  }
  
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    private headerComponent: HeaderComponent,
    private permissionComponent: PermissionComponent,
    private permissionService: PermissionService,
  ) { }

  ngOnInit(): void {

  }

  onCreate() {
    console.log(this.permission);
    this.permissionService.createPermission(this.permission).subscribe(
      (data: any) => {
         console.log(data);
        if(data.success == true){
          // console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Hak akses baru sudah dibuat');
          this.close();
          this.permissionComponent.ngOnInit();
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
    console.log('this.formPermission = ' + this.formPermission.invalid);
    if(this.formPermission.invalid){
      this.buttonSave = true;
    }else{
      this.buttonSave = false;
    }
    console.log('this.buttonSave = ' + this.buttonSave);
  }

  cancel() {
    this.router.navigate(['/Permission']);
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
