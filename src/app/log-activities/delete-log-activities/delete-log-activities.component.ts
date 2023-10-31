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
import { LogActivitiesModule } from '../model/log-activities.module';
import { LogActivitiesComponent } from '../log-activities.component';
import { LogActivitiesService } from '../service/log-activities.service';

@Component({
  selector: 'app-delete-log-activities',
  templateUrl: './delete-log-activities.component.html',
  styleUrls: ['./delete-log-activities.component.css']
})
export class DeleteLogActivitiesComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();

  judulModal: string = 'Hapus Log Aktifitas';
  showModals = false;
  statusButtonDelete: boolean | undefined;
  
  logActivities: LogActivitiesModule = new LogActivitiesModule();

  formLogActivities = new FormGroup({
    tahun: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")])
  });

  buttonDelete = true;

  get tahun() {
    return this.formLogActivities.controls['tahun'];
  }
  
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    private headerComponent: HeaderComponent,
    private logActivitiesComponent: LogActivitiesComponent,
    private logActivitiesService: LogActivitiesService
  ) { }

  ngOnInit(): void {
    
  }

  onDeleteBaru() {
    console.log(this.logActivities);
  }

  onDelete() {
    this.logActivitiesService.deleteLogActivities(this.logActivities.tahun).subscribe(
      (data: any) => {
        console.log(data);
        console.log(data.success);
        if(data.success == true){
          // console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Log Aktifitas tahun ' + this.logActivities.tahun + ' sudah dihapus');
          this.close();
          this.logActivitiesComponent.ngOnInit();
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
    // console.log("Periksa alert");
    // console.log('this.formLogActivities = ' + this.formLogActivities.invalid);
    if(this.formLogActivities.invalid){
      this.buttonDelete = true;
    }else{
      this.buttonDelete = false;
    }
    // console.log('this.buttonSave = ' + this.buttonDelete);
  }






  

  // Function Modal
  open(judulModal: any, statusButtonDelete: boolean) {
    this.judulModal = judulModal;
    this.statusButtonDelete = statusButtonDelete;

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
