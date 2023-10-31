import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import '@cds/core/forms/register.js';
import '@cds/core/input/register.js';
import '@cds/core/password/register.js';
import '@cds/core/button/register.js';
import '@clr/icons';
import '@clr/icons/shapes/essential-shapes';
import '@clr/icons/shapes/technology-shapes';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Input() public judulModal: any;
  @Input() public bodyMessage: any;
  @Input() public statusButton: any;
  @Input() public gambarModal: any;
  @Input() public statusGambar: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
    if(this.statusButton != false){
      this.statusButton = true;
    }
    if(this.statusGambar != false){
      this.statusGambar = true;
    }
  }

  open(judulModal: any, bodyMessage: any, statusButton: any, gambarModal: any, statusGambar: any) {
    alert("Hallo Wirahman");
    
  }
  
  passBack() {
    this.passEntry.emit(this.judulModal);
    this.activeModal.close(this.judulModal);
    this.passEntry.emit(this.bodyMessage);
    this.activeModal.close(this.bodyMessage);
    this.passEntry.emit(this.statusButton);
    this.activeModal.close(this.statusButton);
    this.passEntry.emit(this.statusGambar);
    this.activeModal.close(this.statusGambar);
  }

  wirahman() {
    alert("Hallo Wirahman");
  }
  
  


}
