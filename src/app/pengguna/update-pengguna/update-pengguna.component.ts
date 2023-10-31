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
import { PenggunaComponent } from '../pengguna.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { PenggunaModule } from '../model/pengguna.module';
import { PenggunaService } from '../service/pengguna.service';
import { DepartmentService } from '../../department/service/department.service';
import { RoleService } from 'src/app/role/service/role.service';

@Component({
  selector: 'app-update-pengguna',
  templateUrl: './update-pengguna.component.html',
  styleUrls: ['./update-pengguna.component.css']
})
export class UpdatePenggunaComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  judulModal: string = 'Update Pengguna';
  showModals = false;
  statusButton: boolean | undefined;
  
  id: any;
  private sub: any;
  pengguna: PenggunaModule = new PenggunaModule();
  department!: [];
  selectDepartment!: any;
  role!: [];
  selectRoleID!: any;
  alertValidasi: string = '';

  formPengguna = new FormGroup({
    id: new FormControl('',Validators.required,),
    code: new FormControl({ value: '', disabled: true },[Validators.required, Validators.pattern("^[0-9]*$")]),
    name: new FormControl('',Validators.required,),
    username: new FormControl('',Validators.required),
    status: new FormControl('',Validators.required,),
    department_id: new FormControl('',Validators.required),
    role_id: new FormControl('',Validators.required),
    // email: new FormControl('',[Validators.required, Validators.email]),
    // hp: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    // avatar: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(50)])
  });

  buttonUpdate = false;

  get codeUpdate() {
    return this.formPengguna.controls['codeUpdate'];
  }
  
  get nameUpdate() {
    return this.formPengguna.controls['nameUpdate'];
  }
  
  get usernameUpdate() {
    return this.formPengguna.controls['usernameUpdate'];
  }
  
  get statusUpdate() {
    return this.formPengguna.controls['statusUpdate'];
  }
  
  get department_id() {
    return this.formPengguna.controls['department_id'];
  }
  
  get role_id() {
    return this.formPengguna.controls['role_id'];
  }
  
  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private headerComponent: HeaderComponent,
    private penggunaService: PenggunaService,
    private departmentService: DepartmentService,
    private penggunaComp: PenggunaComponent,
    private roleService: RoleService,
    private formBuilder: FormBuilder
    
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
    console.log("ID = " + this.id);
    console.log("Sub = " + this.sub);
    this.ambilSemuaDepartmentAktif();
    this.ambilSemuaRoleAktif();
    this.getUserByID(this.id);
  }
  
  ambilSemuaDepartmentAktif() {
    this.departmentService.getAllAktif().subscribe(
      (data: any) => {
        // console.log("Nilai Department");
        // console.log(data.data);
        // console.log("Nilai Department");
        this.department = data.data;
      }
    );
  }

  getDepartmentByID(department_id: any) {
    this.departmentService.getDepartmentByID(department_id).subscribe(
      (data: any) => {
        // console.log("Nilai Department");
        // console.log("Nilai Department");
        this.selectDepartment = data.data[0];
      }
    );
  }

  getRoleByID(role_id: any) {
    this.roleService.getRoleByID(role_id).subscribe(
      (data: any) => {
        // console.log("Nilai Department");
        // console.log("Nilai Department");
        this.selectRoleID = data.data[0];
      }
    );
  }

  ambilSemuaRoleAktif(){
    this.roleService.getAllRole().subscribe(
      (data: any) => {
        // console.log("Nilai Department");
        // console.log(data.data);
        // console.log("Nilai Department");
        this.role = data.data;
      }
    );
  }
  
  getUserByID(id: any){
    console.log("ID yang akan diupdate = " + id);
    this.penggunaService.getUserByID(id).subscribe(
      (data: any) => {
        console.log("Get User By ID");
        console.log("data");
        console.log(data);
        // console.log("json");
        // console.log(JSON.stringify(data));
        this.pengguna = data.data[0];
        this.selectDepartment = this.pengguna.department_id;
        console.log("User");
        console.log(this.pengguna);
        if(this.pengguna.status == 'active'){
          this.pengguna.status = JSON.parse("true");
        } else {
          this.pengguna.status = JSON.parse("false");
        }
        
        this.getDepartmentByID(this.pengguna.department_id);
        this.getRoleByID(this.pengguna.role_id);
      },(error: any) => console.log(error)
    );
  }
  
  onUpdate() {
    console.log(this.pengguna);
    this.pengguna.department_id = this.selectDepartment.id;
    this.pengguna.role_id = this.selectRoleID.id;
    this.penggunaService.updateUser(this.pengguna).subscribe(
      (data: any) => {
         console.log(data);
        if(data.success == true){
          console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Pengguna sudah diupdate');
          this.penggunaComp.getSemuaPengguna();
          this.close();
       } else {
        this.headerComponent.tampilToastr('error', '', data.message);
       }
      },(error: any) => {
        this.headerComponent.tampilToastr('error', error.error.message, '');
      }
    );
  }
  
  periksaAlert(event: any): void{
    // console.log(this.formPengguna);
    // console.log("Periksa alert");
    // console.log('this.formRole = ' + this.formRole.invalid);
    if(this.formPengguna.invalid){
      this.buttonUpdate = true;
    }else{
      this.buttonUpdate = false;
    }
    // console.log('this.buttonUpdate = ' + this.buttonUpdate);
  }

  cancel() {
    this.router.navigate(['/Pengguna']);
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
