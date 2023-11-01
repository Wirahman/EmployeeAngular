import { Component, OnInit, Output, EventEmitter, Renderer2, RendererFactory2, ElementRef, } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// Component
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();

  show = false;
  id: any;
  judulModal: any;
  bodyMessage: any;
  statusButtonDelete: boolean | undefined;
  statusButtonResetPassword: boolean | undefined;
  gambarModal: any;
  statusGambar: boolean | undefined;
  jenisFunction: any;

  constructor(
    private snackBar: MatSnackBar,
    private renderer:Renderer2,
    private el:ElementRef,
    // private pelangganComponent: PelangganComponent,
    private employeeComponent: EmployeeComponent
    
  ) { }

  ngOnInit(): void {
    
  }

  open(id:any, judulModal: any, bodyMessage: any, gambarModal: any, statusButtonDelete: boolean, statusButtonResetPassword: boolean, statusGambar: boolean, jenisFunction: any) {
    this.id = id;
    this.judulModal = judulModal;
    this.bodyMessage = bodyMessage;
    this.gambarModal = gambarModal;
    this.statusButtonDelete = statusButtonDelete;
    this.statusButtonResetPassword = statusButtonResetPassword;
    this.statusGambar = statusGambar;
    this.jenisFunction = jenisFunction;

    this.show = true;
  }

  functionHapus(jenisFunction: any, id:any){
    if(jenisFunction == 'employee'){
      this.employeeComponent.hapusEmployee(id);
      this.close();
    }else{

    }
  }

  close() {
    this.show = false;
  }
  
  pesanSnackBar(pesan: any){
    this.snackBar.open(pesan, '', {
      duration: 3000
    });
  }





}
