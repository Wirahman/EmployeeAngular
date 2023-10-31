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
import { PenggunaComponent } from '../pengguna.component';
import { PenggunaModule } from '../model/pengguna.module';
import { PenggunaService } from '../service/pengguna.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  judulModal: string = 'Ubah Kata Sandi';
  showModals = false;
  statusButton: boolean | undefined;

  private sub: any;
  pengguna: PenggunaModule = new PenggunaModule();
  alertValidasi: string = '';
  
  formResetPassword = new FormGroup({
    password: new FormControl('',Validators.required,),
    password_conf: new FormControl('',Validators.required,),
  });

  buttonReset = false;

  get password() {
    return this.formResetPassword.controls['password'];
  }
  
  get password_conf() {
    return this.formResetPassword.controls['password_conf'];
  }
  
  constructor(
    private headerComponent: HeaderComponent,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private penggunaService: PenggunaService,
    private penggunaComp: PenggunaComponent,
    private formBuilder: FormBuilder
    
  ) { }

  ngOnInit(): void {

  }
  
  periksaAlert(event: any): void{
    // console.log(this.formResetPassword);
    // console.log("Periksa alert");
    // console.log('this.formResetPassword = ' + this.formResetPassword.invalid);
    if(this.formResetPassword.invalid){
      this.buttonReset = true;
    }else{
      this.buttonReset = false;
    }
    // console.log('this.buttonReset = ' + this.buttonReset);
  }

  onReset(){
    if(this.pengguna.password_conf != this.pengguna.password){
      this.headerComponent.tampilToastr('warning', '', 'Password dan konfirmasi password tidak sesuai');
      // this.alertValidasi = "Password dan konfirmasi password tidak sesuai";
    } else {
      this.pengguna.id = localStorage.getItem('userID')!;
      this.pengguna.password = this.pengguna.password;

      console.log("Password = " + this.pengguna.password);
      
      this.penggunaService.ubahPassword(this.pengguna).subscribe(
        (data: any) => {
           console.log(data);
          if(data.success == true){
            this.headerComponent.tampilToastr('info', '', 'Password anda sudah diubah');
            this.close();
         } else {
            this.headerComponent.tampilToastr('error', '', data.message);
            // this.alertValidasi = '';
            // this.alertValidasi = data.message;
         }
        },(error: any) => {
          this.headerComponent.tampilToastr('error', 'Gagal', error.error.message);
        }
      );
    }
  }






  
  // Function Modal
  open(judulModal: any, statusButton: boolean) {
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
