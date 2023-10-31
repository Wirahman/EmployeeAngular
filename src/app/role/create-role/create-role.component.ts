import { Component, OnInit } from '@angular/core';
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
import { RoleModule } from '../model/role.module';
import { RoleService } from '../service/role.service';
import { RolePermissionModule } from '../model/role-permission.module';
import { RolePermissionService } from '../service/role-permission.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})

export class CreateRoleComponent implements OnInit {

  role: RoleModule = new RoleModule();
  alertValidasi: string = '';
  // isiCheckBox: string = '';
  isiCheckBox: Array<string> = [];

  titlePermission = 'Hak Akses Pengguna';
  // CheckBox
  jumlahCheckBox = 13;
  checkBoxAllFitur = false;
  checkboxReadUser = false;
  checkboxCreateUser = false;
  checkboxUpdateUser = false;
  checkboxDeleteUser = false;
  
  checkboxReadRole = false;
  checkboxCreateRole = false;
  checkboxUpdateRole = false;
  checkboxDeleteRole = false;

  checkboxReadPermission = false;
  checkboxCreatePermission = false;
  checkboxUpdatePermission = false;
  checkboxDeletePermission = false;
  
  checkboxReadDepartment = false;
  checkboxCreateDepartment = false;
  checkboxUpdateDepartment = false;
  checkboxDeleteDepartment = false;
  
  checkboxReadCodeSettings = false;
  checkboxCreateCodeSettings = false;
  checkboxUpdateCodeSettings = false;
  checkboxDeleteCodeSettings = false;

  checkboxReadCustomer = false;
  checkboxCreateCustomer = false;
  checkboxUpdateCustomer = false;
  checkboxDeleteCustomer = false;

  checkboxReadKlinik = false;
  checkboxCreateKlinik = false;
  checkboxUpdateKlinik = false;
  checkboxDeleteKlinik = false;

  checkboxReadUserClenic = false;
  checkboxCreateUserClenic = false;
  checkboxUpdateUserClenic = false;
  checkboxDeleteUserClenic = false;

  checkboxReadPackageHeader = false;
  checkboxCreatePackageHeader = false;
  checkboxUpdatePackageHeader = false;
  checkboxDeletePackageHeader = false;

  checkboxReadPackageDetail = false;
  checkboxCreatePackageDetail = false;
  checkboxUpdatePackageDetail = false;
  checkboxDeletePackageDetail = false;

  checkboxReadTermsOfPayment = false;
  checkboxCreateTermsOfPayment = false;
  checkboxUpdateTermsOfPayment = false;
  checkboxDeleteTermsOfPayment = false;

  checkboxReadContractHeader = false;
  checkboxCreateContractHeader = false;
  checkboxUpdateContractHeader = false;
  checkboxDeleteContractHeader = false;

  checkboxReadContractDetail = false;
  checkboxCreateContractDetail = false;
  checkboxUpdateContractDetail = false;
  checkboxDeleteContractDetail = false;

  checkboxReadLogActivities = false;
  checkboxCreateLogActivities = false;
  checkboxUpdateLogActivities = false;
  checkboxDeleteLogActivities = false;

  formRole = new FormGroup({
    name: new FormControl('',Validators.required,),
    status: new FormControl('',Validators.required,),
    description: new FormControl('',Validators.required),
    // email: new FormControl('',[Validators.required, Validators.email]),
    // hp: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    // avatar: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(50)])
  });

  buttonSave = true;

  get name() {
    return this.formRole.controls['name'];
  }
  
  get status() {
    return this.formRole.controls['status'];
  }
  
  get description() {
    return this.formRole.controls['description'];
  }
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private headerComponent: HeaderComponent,
    private roleService: RoleService,
    private rolePermissionService: RolePermissionService,
  ) { }

  ngOnInit(): void {
    
  }

  onCreate() {
    console.log(this.role);
    this.role.isiCheckBox = this.isiCheckBox;
    this.roleService.createRole(this.role).subscribe(
      (data: any) => {
         console.log(data);
        if(data.success == true){
          console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Peran baru sudah dibuat');
          this.router.navigate(['/Dashboard/Role']);
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
    console.log('this.formRole = ' + this.formRole.invalid);
    if(this.formRole.invalid){
      this.buttonSave = true;
    }else{
      this.buttonSave = false;
    }
    console.log('this.buttonSave = ' + this.buttonSave);
  }

  cancel() {
    this.router.navigate(['/Role']);
  }

  updateRoleSemuaPermission(){
    if(this.checkBoxAllFitur == true){
      this.isiCheckBox = [];
      this.checkBoxAllFitur = false;
          
      this.checkboxReadUser = false;
      this.checkboxCreateUser = false;
      this.checkboxUpdateUser = false;
      this.checkboxDeleteUser = false;
      
      this.checkboxReadRole = false;
      this.checkboxCreateRole = false;
      this.checkboxUpdateRole = false;
      this.checkboxDeleteRole = false;

      this.checkboxReadPermission = false;
      this.checkboxCreatePermission = false;
      this.checkboxUpdatePermission = false;
      this.checkboxDeletePermission = false;
      
      this.checkboxReadDepartment = false;
      this.checkboxCreateDepartment = false;
      this.checkboxUpdateDepartment = false;
      this.checkboxDeleteDepartment = false;
          
      this.checkboxReadCodeSettings = false;
      this.checkboxCreateCodeSettings = false;
      this.checkboxUpdateCodeSettings = false;
      this.checkboxDeleteCodeSettings = false;
      
      this.checkboxReadCustomer = false;
      this.checkboxCreateCustomer = false;
      this.checkboxUpdateCustomer = false;
      this.checkboxDeleteCustomer = false;

      this.checkboxReadKlinik = false;
      this.checkboxCreateKlinik = false;
      this.checkboxUpdateKlinik = false;
      this.checkboxDeleteKlinik = false;
      
      this.checkboxReadUserClenic = false;
      this.checkboxCreateUserClenic = false;
      this.checkboxUpdateUserClenic = false;
      this.checkboxDeleteUserClenic = false;
      
      this.checkboxReadPackageHeader = false;
      this.checkboxCreatePackageHeader = false;
      this.checkboxUpdatePackageHeader = false;
      this.checkboxDeletePackageHeader = false;
      
      this.checkboxReadPackageDetail = false;
      this.checkboxCreatePackageDetail = false;
      this.checkboxUpdatePackageDetail = false;
      this.checkboxDeletePackageDetail = false;
      
      this.checkboxReadTermsOfPayment = false;
      this.checkboxCreateTermsOfPayment = false;
      this.checkboxUpdateTermsOfPayment = false;
      this.checkboxDeleteTermsOfPayment = false;
            
      this.checkboxReadContractHeader = false;
      this.checkboxCreateContractHeader = false;
      this.checkboxUpdateContractHeader = false;
      this.checkboxDeleteContractHeader = false;

      this.checkboxReadContractDetail = false;
      this.checkboxCreateContractDetail = false;
      this.checkboxUpdateContractDetail = false;
      this.checkboxDeleteContractDetail = false;
      
      this.checkboxReadLogActivities = false;
      this.checkboxCreateLogActivities = false;
      this.checkboxUpdateLogActivities = false;
      this.checkboxDeleteLogActivities = false;
      
    } else if(this.checkBoxAllFitur == false) {
      this.isiCheckBox = [
        'Read User',
        'Create User',
        'Update User',
        'Delete User',
        'Read Role',
        'Create Role',
        'Update Role',
        'Delete Role',
        'Read Permission',
        'Create Permission',
        'Update Permission',
        'Delete Permission',
        'Read Department',
        'Create Department',
        'Update Department',
        'Delete Department',
        'Read Code Settings',
        'Create Code Settings',
        'Update Code Settings',
        'Delete Code Settings',
        'Read Customer',
        'Create Customer',
        'Update Customer',
        'Delete Customer',
        'Read Klinik',
        'Create Klinik',
        'Update Klinik',
        'Delete Klinik',
        'Read User Clenic',
        'Create User Clenic',
        'Update User Clenic',
        'Delete User Clenic',
        'Read Package Header',
        'Create Package Header',
        'Update Package Header',
        'Delete Package Header',
        'Read Package Detail',
        'Create Package Detail',
        'Update Package Detail',
        'Delete Package Detail',
        'Read Terms Of Payment',
        'Create Terms Of Payment',
        'Update Terms Of Payment',
        'Delete Terms Of Payment',
        'Read Contract Header',
        'Create Contract Header',
        'Update Contract Header',
        'Delete Contract Header',
        'Read Contract Detail',
        'Create Contract Detail',
        'Update Contract Detail',
        'Delete Contract Detail',
        'Read Log Activities',
        'Create Log Activities',
        'Update Log Activities',
        'Delete Log Activities'
      ];
      this.checkBoxAllFitur = true
        
      this.checkboxReadUser = true;
      this.checkboxCreateUser = true;
      this.checkboxUpdateUser = true;
      this.checkboxDeleteUser = true;
      
      this.checkboxReadRole = true;
      this.checkboxCreateRole = true;
      this.checkboxUpdateRole = true;
      this.checkboxDeleteRole = true;
    
      this.checkboxReadPermission = true;
      this.checkboxCreatePermission = true;
      this.checkboxUpdatePermission = true;
      this.checkboxDeletePermission = true;
      
      this.checkboxReadDepartment = true;
      this.checkboxCreateDepartment = true;
      this.checkboxUpdateDepartment = true;
      this.checkboxDeleteDepartment = true;
          
      this.checkboxReadCodeSettings = true;
      this.checkboxCreateCodeSettings = true;
      this.checkboxUpdateCodeSettings = true;
      this.checkboxDeleteCodeSettings = true;

      this.checkboxReadCustomer = true;
      this.checkboxCreateCustomer = true;
      this.checkboxUpdateCustomer = true;
      this.checkboxDeleteCustomer = true;
    
      this.checkboxReadKlinik = true;
      this.checkboxCreateKlinik = true;
      this.checkboxUpdateKlinik = true;
      this.checkboxDeleteKlinik = true;
    
      this.checkboxReadUserClenic = true;
      this.checkboxCreateUserClenic = true;
      this.checkboxUpdateUserClenic = true;
      this.checkboxDeleteUserClenic = true;
    
      this.checkboxReadPackageHeader = true;
      this.checkboxCreatePackageHeader = true;
      this.checkboxUpdatePackageHeader = true;
      this.checkboxDeletePackageHeader = true;
    
      this.checkboxReadPackageDetail = true;
      this.checkboxCreatePackageDetail = true;
      this.checkboxUpdatePackageDetail = true;
      this.checkboxDeletePackageDetail = true;
    
      this.checkboxReadTermsOfPayment = true;
      this.checkboxCreateTermsOfPayment = true;
      this.checkboxUpdateTermsOfPayment = true;
      this.checkboxDeleteTermsOfPayment = true;
            
      this.checkboxReadContractHeader = true;
      this.checkboxCreateContractHeader = true;
      this.checkboxUpdateContractHeader = true;
      this.checkboxDeleteContractHeader = true;

      this.checkboxReadContractDetail = true;
      this.checkboxCreateContractDetail = true;
      this.checkboxUpdateContractDetail = true;
      this.checkboxDeleteContractDetail = true;

      this.checkboxReadLogActivities = true;
      this.checkboxCreateLogActivities = true;
      this.checkboxUpdateLogActivities = true;
      this.checkboxDeleteLogActivities = true;
      
    }
    
  }

  periksaSessionCheckButton(){
    console.log(this.isiCheckBox);
  }

  updateRolePermission(modules: any){
    var statusHapus = 'ditambah';
    
    this.isiCheckBox.forEach((item, index) => {
      if(item === modules){
        this.isiCheckBox.splice(index,1);
        statusHapus = 'dikurang';
      }
    });

    if(statusHapus == 'ditambah'){
      this.isiCheckBox.push(modules);
    }

    
    
  }

  
  

  
  

}
