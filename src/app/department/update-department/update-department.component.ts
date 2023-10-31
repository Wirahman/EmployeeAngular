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
import { DepartmentModule } from '../model/department.module';
import { DepartmentComponent } from '../department.component';
import { DepartmentService } from '../service/department.service';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css']
})
export class UpdateDepartmentComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  
  judulModal: string = 'Ubah Department';
  showModals = false;
  statusButton: boolean | undefined;

  id: any;
  private sub: any;
  department: DepartmentModule = new DepartmentModule();
  alertValidasi: string = '';

  formDepartment = new FormGroup({
    id: new FormControl('',Validators.required,),
    code: new FormControl({ value: '', disabled: true },[Validators.required, Validators.pattern("^[0-9]*$")]),
    name: new FormControl('',Validators.required,),
    status: new FormControl('',Validators.required,),
    // email: new FormControl('',[Validators.required, Validators.email]),
    // hp: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    // avatar: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(50)])
  });

  buttonSave = false;

  get code() {
    return this.formDepartment.controls['code'];
  }
  
  get name() {
    return this.formDepartment.controls['name'];
  }
  
  get status() {
    return this.formDepartment.controls['status'];
  }
  
  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private headerComponent: HeaderComponent,
    private departmentComponent: DepartmentComponent,
    private departmentService: DepartmentService
    
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
    console.log("ID = " + this.id);
    console.log("Sub = " + this.sub);
    this.getDepartmentByID(this.id);
  }
  
  getDepartmentByID(id: any){
    console.log("ID yang akan diupdate = " + id);
    this.departmentService.getDepartmentByID(id).subscribe(
      (data: any) => {
        console.log("Get Department By ID");
        console.log("data");
        console.log(data);
        // console.log("json");
        // console.log(JSON.stringify(data));
        this.department = data.data[0];
        this.department = data.data[0];
        if(this.department.status == 'active'){
          this.department.status = JSON.parse("true");
        } else {
          this.department.status = JSON.parse("false");
        }
        
        console.log("Department");
        console.log(this.department);
      },(error: any) => console.log(error)
    );
  }

  onUpdate() {
    console.log(this.department);
    this.departmentService.updateDepartment(this.department).subscribe(
      (data: any) => {
         console.log(data);
        if(data.success == true){
          // console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Department sudah diubah');
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
    console.log(this.formDepartment);
    // console.log("Periksa alert");
    // console.log('this.formPermission = ' + this.formPermission.invalid);
    if(this.formDepartment.invalid){
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
