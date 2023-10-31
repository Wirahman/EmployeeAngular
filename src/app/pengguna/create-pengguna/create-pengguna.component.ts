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
import { AppComponent } from '../../app.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { PenggunaModule } from '../model/pengguna.module';
import { PenggunaService } from '../service/pengguna.service';
import { DepartmentService } from '../../department/service/department.service';
import { RoleService } from 'src/app/role/service/role.service';

@Component({
  selector: 'app-create-pengguna',
  templateUrl: './create-pengguna.component.html',
  styleUrls: ['./create-pengguna.component.css']
})
export class CreatePenggunaComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  
  judulModal: string = 'Pengguna Baru';
  showModals = false;
  statusButtonCreate: boolean | undefined;
  
  pengguna: PenggunaModule = new PenggunaModule();
  department!: [];
  selectDepartment!: any;
  role!: [];
  selectRoleID!: any;
  alertValidasi: string = '';

  formRegister = new FormGroup({
    name: new FormControl('',Validators.required,),
    username: new FormControl('',Validators.required,),
    password: new FormControl('',Validators.required,),
    password_conf: new FormControl('',Validators.required,),
    department_id: new FormControl('',Validators.required,),
    role_id: new FormControl('',Validators.required,),
    status: new FormControl('',Validators.required,),
    // email: new FormControl('',[Validators.required, Validators.email]),
    // handphone: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    // avatar: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(50)])
  });

  buttonSave = true;
  
  get name() {
    return this.formRegister.controls['name'];
  }

  get username() {
    return this.formRegister.controls['username'];
  }

  get password() {
    return this.formRegister.controls['password'];
  }

  get department_id() {
    return this.formRegister.controls['department_id'];
  }

  get role_id() {
    return this.formRegister.controls['role_id'];
  }

  get status() {
    return this.formRegister.controls['status'];
  }
  
  constructor(
    private snackBar: MatSnackBar,
    private renderer:Renderer2,
    private el:ElementRef,
    private router: Router,
    private formBuilder: FormBuilder,
    private AppComponent: AppComponent,
    private headerComponent: HeaderComponent,
    private penggunaService: PenggunaService,
    private departmentService: DepartmentService,
    private roleService: RoleService,
  ) { }

  ngOnInit(): void {
    this.ambilSemuaDepartmentAktif();
    this.ambilSemuaRoleAktif();
  }

  ambilSemuaDepartmentAktif() {
    this.departmentService.getAllAktif().subscribe(
      (data: any) => {
        // console.log("Nilai Department");
        // console.log(data.data);
        this.department = data.data;
      }
    );
  }

  ambilSemuaRoleAktif(){
    this.roleService.getAllRole().subscribe(
      (data: any) => {
        // console.log("Nilai Department");
        // console.log(data.data);
        this.role = data.data;
      }
    );
  }
  
  onRegister() {
    // console.log(this.pengguna);
    // console.log(this.selectDepartment.id);
    if(this.pengguna.password === this.pengguna.password_conf){
      this.pengguna.department_id = this.selectDepartment.id;
      this.pengguna.role_id = this.selectRoleID.id;
      this.penggunaService.register(this.pengguna).subscribe(
        (data: any) => {
           console.log(data);
          if(data.success == true){
            console.log("Data Ada");
            this.headerComponent.tampilToastr('info', '', 'Pengguna baru sudah dibuat');
            this.router.navigate(['/']);
         } else {
            this.headerComponent.tampilToastr('error', '', data.message);
            // this.alertValidasi = '';
            // this.alertValidasi = data.message;
         }
        },(error: any) => {
          this.headerComponent.tampilToastr('error', error.error.message, '');
        }
      );
    }else{
      this.headerComponent.tampilToastr('error', '', 'Password dan password konfirmasi tidak sesuai');
      // this.alertValidasi = 'Password dan password konfirmasi tidak sesuai';
    }
  }

  periksaAlert(event: any): void{
    // console.log("Periksa alert");
    // console.log('this.formPengguna = ' + this.formRegister.invalid);
    if(this.formRegister.invalid){
      this.buttonSave = true;
    }else{
      this.buttonSave = false;
    }
    // console.log('this.buttonSave = ' + this.buttonSave);
  }

  cancel() {
    this.router.navigate(['/']);
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
