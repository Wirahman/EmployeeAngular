import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

// Clarity Design
import '@cds/core/forms/register.js';
import '@cds/core/input/register.js';
import '@cds/core/password/register.js';
import '@cds/core/button/register.js';

// Component Library
import { AppComponent } from 'src/app/app.component';
import { PenggunaModule } from '../model/pengguna.module';
import { PenggunaService } from '../service/pengguna.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pengguna: PenggunaModule = new PenggunaModule();
  alertValidasi: string = '';
  
  formLogin = new FormGroup({
    username: new FormControl('',Validators.required,),
    password: new FormControl('',Validators.required,)
  });

  buttonSave = true;

  get username() {
    return this.formLogin.controls['username'];
  }

  get password() {
    return this.formLogin.controls['password'];
  }

  constructor(
    private router: Router,
    private AppComponent: AppComponent,
    private penggunaService: PenggunaService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.checkSessionLogin();
  }

  checkSessionLogin() {
    const pengguna = localStorage.getItem('pengguna');
    // console.log(pengguna);
    // console.log(this.username);
    if(localStorage.getItem('username') != undefined){
      localStorage.setItem('menu', 'Pengguna');
      this.router.navigate(['/Dashboard']);
    }else{
      localStorage.setItem('menu', '');
      this.router.navigate(['/Login']);
    }
  }

  onLogin() {
    // alert("Ini Function On Login");
    this.penggunaService.login(this.pengguna).subscribe(
      (data: any) => {
         if(data.success == true){
            // console.log("Data Login");
            // console.log(data);
            // console.log(data.message);
            const penggunaLogin = JSON.stringify(data.data);
            console.log(penggunaLogin);
            // console.log("Data Ada");
            localStorage.setItem('pengguna', data.data);
            localStorage.setItem('username', data.data[0]['username']);
            localStorage.setItem('userID', data.data[0]['id']);
            localStorage.setItem('token', data.data[0]['token']);
            localStorage.setItem('token_expired', data.data[0]['token_expired']);
            localStorage.setItem('role_id', data.data[0]['role_id'])
            this.toastr.info(data.data[0]['username'], 'Selamat Datang', {
              timeOut: 5000,
            });
            this.AppComponent.ngOnInit();
         } else {
            console.log("Data Tidak Ada");
            console.log(data.message);
            // this.alertValidasi = '';
            // this.alertValidasi = data.message;
            // this.toastr.success(data.message);
            // this.toastr.show(data.message);
            this.toastr.error(data.message, 'Error', {
              timeOut: 5000,
            });
         }
      },(error: any) => {
        this.toastr.error(error.error.message, 'Error', {
          timeOut: 5000,
        });
      }
    );
    // console.log('ok');
  }

}
