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
import { PermissionComponent } from '../permission.component';
import { PermissionModule } from '../model/permission.module';
import { PermissionService } from '../service/permission.service';

@Component({
  selector: 'app-update-permission',
  templateUrl: './update-permission.component.html',
  styleUrls: ['./update-permission.component.css']
})

export class UpdatePermissionComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  
  judulModal: string = 'Ubah Hak Akses';
  showModals = false;
  statusButton: boolean | undefined;

  id: any;
  private sub: any;
  permission: PermissionModule = new PermissionModule();
  alertValidasi: string = '';

  formPermission = new FormGroup({
    id: new FormControl('',Validators.required,),
    code: new FormControl({ value: '', disabled: true },[Validators.required, Validators.pattern("^[0-9]*$")]),
    name: new FormControl('',Validators.required,),
    status: new FormControl('',Validators.required,),
    description: new FormControl('',Validators.required),
    // email: new FormControl('',[Validators.required, Validators.email]),
    // hp: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    // avatar: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(50)])
  });

  buttonSave = false;

  get code() {
    return this.formPermission.controls['code'];
  }
  
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
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private headerComponent: HeaderComponent,
    private permissionComponent: PermissionComponent,
    private permissionService: PermissionService
    
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
    console.log("ID = " + this.id);
    console.log("Sub = " + this.sub);
    this.getPermissionByID(this.id);
  }
  
  getPermissionByID(id: any){
    console.log("ID yang akan diupdate = " + id);
    this.permissionService.getPermissionByID(id).subscribe(
      (data: any) => {
        console.log("Get Permission By ID");
        console.log("data");
        console.log(data);
        // console.log("json");
        // console.log(JSON.stringify(data));
        this.permission = data.data[0];
        this.permission = data.data[0];
        if(this.permission.status == 'active'){
          this.permission.status = JSON.parse("true");
        } else {
          this.permission.status = JSON.parse("false");
        }
        
        console.log("Permission");
        console.log(this.permission);
      },(error: any) => console.log(error)
    );
  }

  onUpdate() {
    console.log(this.permission);
    this.permissionService.updatePermission(this.permission).subscribe(
      (data: any) => {
         console.log(data);
        if(data.success == true){
          // console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Hak akses sudah diubah');
          this.close();
          this.permissionComponent.ngOnInit();
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
    console.log(this.formPermission);
    // console.log("Periksa alert");
    // console.log('this.formPermission = ' + this.formPermission.invalid);
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
