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
import { DepartmentComponent } from '../department.component';
import { DepartmentModule } from '../model/department.module';
import { DepartmentService } from '../service/department.service';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})

export class CreateDepartmentComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();

  judulModal: string = 'Department Baru';
  showModals = false;
  statusButtonCreate: boolean | undefined;

  department: DepartmentModule = new DepartmentModule();
  alertValidasi: string = '';

  formDepartment = new FormGroup({
    name: new FormControl('',Validators.required,),
    status: new FormControl('',Validators.required,)
    // email: new FormControl('',[Validators.required, Validators.email]),
    // hp: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    // avatar: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(50)])
  });

  buttonSave = true;

  get name() {
    return this.formDepartment.controls['name'];
  }
  
  get status() {
    return this.formDepartment.controls['status'];
  }
  
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    private headerComponent: HeaderComponent,
    private departmentComponent: DepartmentComponent,
    private departmentService: DepartmentService,
  ) { }


  ngOnInit(): void {

  }

  onCreate() {
    console.log(this.department);
    this.departmentService.createDepartment(this.department).subscribe(
      (data: any) => {
         console.log(data);
        if(data.success == true){
          console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Department sudah dibuat');
          this.close();
          this.departmentComponent.ngOnInit();
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
    console.log('this.formDepartment = ' + this.formDepartment.invalid);
    if(this.formDepartment.invalid){
      this.buttonSave = true;
    }else{
      this.buttonSave = false;
    }
    console.log('this.buttonSave = ' + this.buttonSave);
  }

  cancel() {
    this.router.navigate(['/Department']);
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
