import { Component, OnInit } from '@angular/core';
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
import { RoleModule } from '../model/role.module';
import { RoleService } from '../service/role.service';
import { RolePermissionModule } from '../model/role-permission.module';
import { RolePermissionService } from '../service/role-permission.service';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})

export class UpdateRoleComponent implements OnInit {
  id: any;
  private sub: any;
  role: RoleModule = new RoleModule();
  rolePermission: any = [];
  // rolePermissionUpdate: any = [];
  rolePermissionUpdate: RolePermissionModule = new RolePermissionModule();
  alertValidasi: string = '';
  title = 'Role';
  titlePermission = 'Hak Akses Pengguna';
  currentIndex = -1;
  pages: 1 = 1;
  page = 1;
  count = 0;
  pageSize = 10;

  // CheckBox
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
    return this.formRole.controls['code'];
  }
  
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
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private headerComponent: HeaderComponent,
    private roleService: RoleService,
    private rolePermissionService: RolePermissionService
    
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    console.log("ID = " + this.id);
    console.log("Sub = " + this.sub);
    this.getRoleByID(this.id);

    this.periksaCheckBoxAllRolePermission();
  }
  
  getRoleByID(id: any){
    console.log("ID yang akan diupdate = " + id);
    this.roleService.getRoleByID(id).subscribe(
      (data: any) => {
        // console.log("Get Role By ID");
        // console.log("data");
        // console.log(data);
        // console.log("json");
        // console.log(JSON.stringify(data));
        this.role = data.data[0];
        if(this.role.status == 'active'){
          this.role.status = JSON.parse("true");
        } else {
          this.role.status = JSON.parse("false");
        }
        
        // console.log("Role");
        console.log(this.role);
      },(error: any) => console.log(error)
    );
  }

  onUpdate() {
    console.log(this.role);
    this.roleService.updateRole(this.role).subscribe(
      (data: any) => {
        //  console.log(data);
        if(data.success == true){
          // console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Peran sudah diubah');
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
    // console.log(this.formRole);
    // console.log("Periksa alert");
    // console.log('this.formRole = ' + this.formRole.invalid);
    if(this.formRole.invalid){
      this.buttonSave = true;
    }else{
      this.buttonSave = false;
    }
    // console.log('this.buttonSave = ' + this.buttonSave);
  }

  cancel() {
    this.router.navigate(['/Role']);
  }






  updateRolePermission(name: any){
    // console.log('Permission ID = ' + permission_id);
    this.rolePermissionUpdate['role_id'] = this.role.id;
    this.rolePermissionUpdate['name'] = name;
    // console.log('Role Permission');
    // console.log(this.rolePermissionUpdate);
    this.rolePermissionService.updateRolePermission(this.rolePermissionUpdate).subscribe(
      (data: any) => {
        console.log('data');
        console.log(data);
        this.ngOnInit();
      },(error: any) => console.log(error)
    );

  }

  updateRoleSemuaPermission(){
    console.log("Ini this.rolePermissionUpdate");
    console.log(this.rolePermissionUpdate);
    this.rolePermissionService.updateRoleSemuaPermission(this.role).subscribe(
      (data: any) => {
        // console.log('data');
        // console.log(data);
        this.checkBoxAllFitur = data.data;
        this.ngOnInit();
      },(error: any) => console.log(error)
    );

  }

  periksaCheckBoxAllRolePermission(){
    let params: any = {};
    params[`id`] = this.id;

    this.rolePermissionService.periksaCheckBoxAllRolePermission(params).subscribe(
      (data: any) => {
        console.log('data');
        console.log(data);
        this.checkBoxAllFitur = data.data.checkBoxAllFitur;

        this.checkboxReadUser = data.data.checkboxReadUser;
        this.checkboxCreateUser = data.data.checkboxCreateUser;
        this.checkboxUpdateUser = data.data.checkboxUpdateUser;
        this.checkboxDeleteUser = data.data.checkboxDeleteUser;
        
        this.checkboxReadRole = data.data.checkboxReadRole;
        this.checkboxCreateRole = data.data.checkboxCreateRole;
        this.checkboxUpdateRole = data.data.checkboxUpdateRole;
        this.checkboxDeleteRole = data.data.checkboxDeleteRole;
      
        this.checkboxReadPermission = data.data.checkboxReadPermission;
        this.checkboxCreatePermission = data.data.checkboxCreatePermission;
        this.checkboxUpdatePermission = data.data.checkboxUpdatePermission;
        this.checkboxDeletePermission = data.data.checkboxDeletePermission;
      
        this.checkboxReadDepartment = data.data.checkboxReadDepartment;
        this.checkboxCreateDepartment = data.data.checkboxCreateDepartment;
        this.checkboxUpdateDepartment = data.data.checkboxUpdateDepartment;
        this.checkboxDeleteDepartment = data.data.checkboxDeleteDepartment;
      
        this.checkboxReadCodeSettings = data.data.checkboxReadCodeSettings;
        this.checkboxCreateCodeSettings = data.data.checkboxCreateCodeSettings;
        this.checkboxUpdateCodeSettings = data.data.checkboxUpdateCodeSettings;
        this.checkboxDeleteCodeSettings = data.data.checkboxDeleteCodeSettings;
      
        this.checkboxReadCustomer = data.data.checkboxReadCustomer;
        this.checkboxCreateCustomer = data.data.checkboxCreateCustomer;
        this.checkboxUpdateCustomer = data.data.checkboxUpdateCustomer;
        this.checkboxDeleteCustomer = data.data.checkboxDeleteCustomer;
      
        this.checkboxReadKlinik = data.data.checkboxReadKlinik;
        this.checkboxCreateKlinik = data.data.checkboxCreateKlinik;
        this.checkboxUpdateKlinik = data.data.checkboxUpdateKlinik;
        this.checkboxDeleteKlinik = data.data.checkboxDeleteKlinik;
      
        this.checkboxReadUserClenic = data.data.checkboxReadUserClenic;
        this.checkboxCreateUserClenic = data.data.checkboxCreateUserClenic;
        this.checkboxUpdateUserClenic = data.data.checkboxUpdateUserClenic;
        this.checkboxDeleteUserClenic = data.data.checkboxDeleteUserClenic;
        
        this.checkboxReadPackageHeader = data.data.checkboxReadPackageHeader;
        this.checkboxCreatePackageHeader = data.data.checkboxCreatePackageHeader;
        this.checkboxUpdatePackageHeader = data.data.checkboxUpdatePackageHeader;
        this.checkboxDeletePackageHeader = data.data.checkboxDeletePackageHeader;
        
        this.checkboxReadPackageDetail = data.data.checkboxReadPackageDetail;
        this.checkboxCreatePackageDetail = data.data.checkboxCreatePackageDetail;
        this.checkboxUpdatePackageDetail = data.data.checkboxUpdatePackageDetail;
        this.checkboxDeletePackageDetail = data.data.checkboxDeletePackageDetail;
                
        this.checkboxReadTermsOfPayment = data.data.checkboxReadTermsOfPayment;
        this.checkboxCreateTermsOfPayment = data.data.checkboxCreateTermsOfPayment;
        this.checkboxUpdateTermsOfPayment = data.data.checkboxUpdateTermsOfPayment;
        this.checkboxDeleteTermsOfPayment = data.data.checkboxDeleteTermsOfPayment;

        this.checkboxReadContractHeader = data.data.checkboxReadContractHeader;
        this.checkboxCreateContractHeader = data.data.checkboxCreateContractHeader;
        this.checkboxUpdateContractHeader = data.data.checkboxUpdateContractHeader;
        this.checkboxDeleteContractHeader = data.data.checkboxDeleteContractHeader;
        
        this.checkboxReadContractDetail = data.data.checkboxReadContractDetail;
        this.checkboxCreateContractDetail = data.data.checkboxCreateContractDetail;
        this.checkboxUpdateContractDetail = data.data.checkboxUpdateContractDetail;
        this.checkboxDeleteContractDetail = data.data.checkboxDeleteContractDetail;
                
        this.checkboxReadLogActivities = data.data.checkboxReadLogActivities;
        this.checkboxCreateLogActivities = data.data.checkboxCreateLogActivities;
        this.checkboxUpdateLogActivities = data.data.checkboxUpdateLogActivities;
        this.checkboxDeleteLogActivities = data.data.checkboxDeleteLogActivities;
                
      },(error: any) => console.log(error)
    );
  }
  
  periksaCheckBoxAllRolePermissionLama(){
    let params: any = {};
    params[`id`] = this.id;

    this.rolePermissionService.periksaCheckBoxAllRolePermission(params).subscribe(
      (data: any) => {
        console.log('data');
        console.log(data);
        this.checkBoxAllFitur = data.data;
      },(error: any) => console.log(error)
    );
  }
  
  
  
  

}
