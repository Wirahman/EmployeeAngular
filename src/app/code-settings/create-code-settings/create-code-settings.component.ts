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
import { CodeSettingsComponent } from '../code-settings.component';
import { CodeSettingsModule } from '../model/code-settings.module';
import { CodeSettingsService } from '../service/code-settings.service';

@Component({
  selector: 'app-create-code-settings',
  templateUrl: './create-code-settings.component.html',
  styleUrls: ['./create-code-settings.component.css']
})
export class CreateCodeSettingsComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  
  judulModal: string = 'Kode Master Baru';
  showModals = false;
  statusButtonCreate: boolean | undefined;

  codeSettings: CodeSettingsModule = new CodeSettingsModule();
  alertValidasi: string = '';

  formCodeSettings = new FormGroup({
    table_name: new FormControl('',Validators.required,),
    label: new FormControl('',Validators.required,),
    prefix: new FormControl('',Validators.required),
    digit: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    counter: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")])
    // email: new FormControl('',[Validators.required, Validators.email]),
    // hp: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    // avatar: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(50)])
  });

  buttonSave = true;

  get table_name() {
    return this.formCodeSettings.controls['table_name'];
  }
  
  get label() {
    return this.formCodeSettings.controls['label'];
  }
  
  get prefix() {
    return this.formCodeSettings.controls['prefix'];
  }
  
  get digit() {
    return this.formCodeSettings.controls['digit'];
  }
  
  get counter() {
    return this.formCodeSettings.controls['counter'];
  }
  
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    private headerComponent: HeaderComponent,
    private codeSettingsComponent: CodeSettingsComponent,
    private codeSettingsService: CodeSettingsService,
  ) { }

  ngOnInit(): void {

  }

  onCreate() {
    console.log(this.codeSettings);
    this.codeSettingsService.createCodeSettings(this.codeSettings).subscribe(
      (data: any) => {
         console.log(data);
        if(data.success == true){
          // console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Kode Master baru sudah dibuat');
          this.close();
          this.codeSettingsComponent.ngOnInit();
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
    console.log('this.formCodeSettings = ' + this.formCodeSettings.invalid);
    if(this.formCodeSettings.invalid){
      this.buttonSave = true;
    }else{
      this.buttonSave = false;
    }
    console.log('this.buttonSave = ' + this.buttonSave);
  }

  cancel() {
    this.router.navigate(['/CodeSettings']);
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
