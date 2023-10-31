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
import { CodeSettingsComponent } from '../code-settings.component';
import { CodeSettingsModule } from '../model/code-settings.module';
import { CodeSettingsService } from '../service/code-settings.service';

@Component({
  selector: 'app-update-code-settings',
  templateUrl: './update-code-settings.component.html',
  styleUrls: ['./update-code-settings.component.css']
})
export class UpdateCodeSettingsComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  
  judulModal: string = 'Ubah Kode Master';
  showModals = false;
  statusButton: boolean | undefined;

  id: any;
  private sub: any;
  codeSettings: CodeSettingsModule = new CodeSettingsModule();
  alertValidasi: string = '';

  formCodeSettings = new FormGroup({
    id: new FormControl('',Validators.required,),
    table_name: new FormControl('',Validators.required,),
    label: new FormControl('',Validators.required,),
    prefix: new FormControl('',Validators.required),
    digit: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    counter: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")])
    // email: new FormControl('',[Validators.required, Validators.email]),
    // hp: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    // avatar: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(50)])
  });

  buttonSave = false;

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
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private headerComponent: HeaderComponent,
    private codeSettingsComponent: CodeSettingsComponent,
    private codeSettingsService: CodeSettingsService,
    
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
    console.log("ID = " + this.id);
    console.log("Sub = " + this.sub);
    this.getCodeSettingsByID(this.id);
  }
  
  getCodeSettingsByID(id: any){
    console.log("ID yang akan diupdate = " + id);
    this.codeSettingsService.getCodeSettingsByID(id).subscribe(
      (data: any) => {
        console.log("Get Permission By ID");
        console.log("data");
        console.log(data);
        // console.log("json");
        // console.log(JSON.stringify(data));
        this.codeSettings = data.data[0];
        this.codeSettings = data.data[0];

        console.log("Permission");
        console.log(this.codeSettings);
      },(error: any) => console.log(error)
    );
  }

  onUpdate() {
    console.log(this.codeSettings);
    this.codeSettingsService.updateCodeSettings(this.codeSettings).subscribe(
      (data: any) => {
         console.log(data);
        if(data.success == true){
          // console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Kode Master sudah diubah');
          this.close();
          this.codeSettingsComponent.ngOnInit();
          // this.router.navigate(['/Dashboard/Permission']);
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
    console.log(this.formCodeSettings);
    // console.log("Periksa alert");
    // console.log('this.formCodeSettings = ' + this.formPermission.invalid);
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
