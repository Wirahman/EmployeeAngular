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

  // Main Data Input
  username:any='';
  password:any='';
  
  alertValidasi: string = '';
  
  form = new FormGroup({
    username: new FormControl('',Validators.required,),
    password: new FormControl('',Validators.required,)
  });

  buttonSave = true;

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
    if(localStorage.getItem('username') != undefined){
      this.router.navigate(['/Dashboard']);
    }else{
      this.router.navigate(['/Login']);
    }
  }

  onLogin() {
    if(this.username == 'Wirahman' && this.password == 'Employee'){
      localStorage.setItem('username', 'Wirahman');
      this.toastr.info(this.username, 'Selamat Datang', {
        timeOut: 5000,
      });
      this.AppComponent.ngOnInit();
    } else {
      this.toastr.error('Harap Periksa Username dan Password Anda', 'Error', {
        timeOut: 5000,
      });
    }
  }

}
