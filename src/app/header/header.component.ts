import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import '@cds/core/icon/register.js';
import { 
  ClarityIcons, 
  userIcon, 
  angleIcon, 
  gridViewIcon, 
  wrenchIcon, 
  logoutIcon, 
  networkSettingsIcon, 
  refreshIcon, 
  accessibility2Icon,
  nodesIcon,
  qrCodeIcon,
  usersIcon,
  firstAidIcon,
  briefcaseIcon,
  toolsIcon,
  employeeIcon,
  coinBagIcon,
  eCheckIcon,
  chatBubbleIcon,
  noteIcon
} from '@cds/core/icon';
import { ToastrService } from 'ngx-toastr';

import { AppComponent } from '../app.component';
import { PenggunaModule } from '../pengguna/model/pengguna.module';
import { PenggunaService } from '../pengguna/service/pengguna.service';
import { ResetPasswordComponent } from '../pengguna/reset-password/reset-password.component';
import { RolePermissionService } from '../role/service/role-permission.service';
import { RoleService } from '../role/service/role.service';

ClarityIcons.addIcons(
  gridViewIcon, 
  userIcon, 
  angleIcon, 
  wrenchIcon, 
  logoutIcon,
  networkSettingsIcon,
  refreshIcon,
  accessibility2Icon,
  nodesIcon,
  qrCodeIcon,
  usersIcon,
  firstAidIcon,
  briefcaseIcon,
  toolsIcon,
  employeeIcon,
  coinBagIcon,
  eCheckIcon,
  chatBubbleIcon,
  noteIcon
  );

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

@Injectable({
  providedIn: 'root' // HERE
})

export class HeaderComponent implements OnInit {
  @ViewChild(ResetPasswordComponent) modalResetPassword: ResetPasswordComponent | undefined;
  pengguna: PenggunaModule = new PenggunaModule();
  hiddenMenu = true;
  menu = localStorage.getItem('pengguna');
  rolePermission: any = [];
  userID = localStorage.getItem('userID');
  roleID = localStorage.getItem('role_id');
  username = localStorage.getItem('username');
  hak_akses = localStorage.getItem('hak_akses');

  statusButtonResetPassword = false;
  constructor(
    private router: Router,
    public appComponent : AppComponent,
    private penggunaService: PenggunaService,
    private rolePermissionService: RolePermissionService,
    private roleService: RoleService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.tampilMenu();
    this.ambilSemuaMenu();
    this.pasangRoleID();
    console.log("Daftar Menu");
    console.log(this.rolePermission);
  }

  tampilMenu(){
    if(this.menu == 'Pengguna'){
      this.router.navigate(['/Pengguna']);
    }
  }

  ambilSemuaMenu(){
    let params: any = {};
    params[`title`] = 'Ambil Semua Menu';
    params[`offset`] = 1;
    params[`limit`] = 1000;
    
    this.rolePermissionService.getAllMenu(params).subscribe(
      (data: any) => {
        // console.log(data);
        // console.log(JSON.stringify(data));
        this.rolePermission = data.data;
        // console.log("Permission");
        // console.log(this.permission);
      },(error: any) => console.log(error)
    );

  }

  pasangRoleID(){
    const role_id = localStorage.getItem('role_id');
    console.log("Role ID");
    console.log(role_id);
    
    this.roleService.getRoleByID(role_id).subscribe(
      (data: any) => {
        // console.log("Nilai Department");
        // console.log("Nilai Department");
        console.log("Hak Akses");
        console.log(data.data[0]['name']);
        localStorage.setItem('hak_akses', data.data[0]['name']);
      }
    );
  }
  
  checkSession(){
    const pengguna = localStorage.getItem('pengguna');
    console.log(pengguna);
    console.log('UserID = ' + localStorage.getItem('userID'));
    console.log('Username 2 = ' + localStorage.getItem('username'));
    console.log('Menu = ' + localStorage.getItem('menu'));
    console.log('Header ID = ' + localStorage.getItem('userID'));
    console.log('Token = ' + localStorage.getItem('token'));
  }

  resetPassword(){
    const username = localStorage.getItem('username');
    const judulModal = 'Ubah Kata Sandi ' + username;
    const statusButtonResetPassword = false;

    // this.modalResetPassword?.getUserByID(id);
    this.modalResetPassword?.open(judulModal, this.statusButtonResetPassword);
  }

  logout(){
    this.pengguna.username = localStorage.getItem('username')!;
    this.penggunaService.logout(this.pengguna).subscribe(
      (data: any) => {
        console.log(data.success);
         if(data.success == true){
          this.tampilToastr('info', 'Terima Kasih', localStorage.getItem('username'));
          localStorage.clear();
          localStorage.setItem('menu', 'Login');
          this.router.navigate(['/Login']);
         } else {
            this.tampilToastr('error', data.message, '');
            console.log("Data Tidak Ada");
            console.log(data.message);
         }
      },(error: any) => {
        this.tampilToastr('error', 'Gagal', error.error.message);
      }
    );
  }

  contohTampilToastr(){
    this.toastr.error('Isi Pesan', 'Error', {
      timeOut: 5000,
    });
  }

  tampilToastr(jenis: any, kalimatatas: any, kalimatbawah:any){
    if(jenis == 'error'){
      this.toastr.error(kalimatbawah, kalimatatas, {
        timeOut: 5000,
      });
    } else if (jenis == 'info'){
      this.toastr.info(kalimatbawah, kalimatatas, {
        timeOut: 5000,
      });
    } else if (jenis == 'show'){
      this.toastr.show(kalimatbawah, kalimatatas, {
        timeOut: 5000,
      });
    } else if (jenis == 'success'){
      this.toastr.success(kalimatbawah, kalimatatas, {
        timeOut: 5000,
      });
    } else if (jenis == 'warning'){
      this.toastr.warning(kalimatbawah, kalimatatas, {
        timeOut: 5000,
      });
    }
  }

}