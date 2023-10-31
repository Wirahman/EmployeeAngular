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
import { KlinikComponent } from '../klinik.component';
import { KlinikModule } from '../klinik/klinik.module';
import { KlinikService } from '../service/klinik.service';
import { PelangganService } from 'src/app/pelanggan/service/pelanggan.service';
import { ProvinsiService } from 'src/app/wilayah/service/provinsi/provinsi.service';
import { KecamatanService } from 'src/app/wilayah/service/kecamatan/kecamatan.service';
import { KabupatenkotaService } from 'src/app/wilayah/service/kabupatenkota/kabupatenkota.service';
import { DesakelurahanService } from 'src/app/wilayah/service/desakelurahan/desakelurahan.service';

@Component({
  selector: 'app-create-klinik',
  templateUrl: './create-klinik.component.html',
  styleUrls: ['./create-klinik.component.css']
})
export class CreateKlinikComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  
  judulModal: string = 'Klinik Baru';
  showModals = false;
  statusButtonCreate: boolean | undefined;

  klinik: KlinikModule = new KlinikModule();
  alertValidasi: string = '';
  
  pelanggan!: [];
  selectPelanggan!: any;
  provinsi!: [];
  selectProvinsi!: any;
  kabupatenKota!: [];
  selectKabupatenKota!: any;
  kecamatan!: [];
  selectKecamatan!: any;
  desaKelurahan!: [];
  selectDesaKelurahan!: any;

  title = 'Daftar Klinik';
  currentIndex = -1;
  pages: 1 = 1;
  page = 1;
  count = 0;
  pageSize = 5;

  formKlinik = new FormGroup({
    name: new FormControl('',Validators.required,),
    customer_id: new FormControl('',Validators.required,),
    npwp: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(16),Validators.maxLength(16)]),
    address: new FormControl('',Validators.required),
    provinsi_id: new FormControl('',Validators.required),
    kabupaten_kota_id: new FormControl('',Validators.required),
    kecamatan_id: new FormControl('',Validators.required),
    desa_kelurahan_id: new FormControl('',Validators.required),
    zipcode: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    phone_number: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    email: new FormControl('',[Validators.required, Validators.email]),
    pic_name: new FormControl('',Validators.required),
    pic_phone_number: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    status: new FormControl('',Validators.required)
  });

  buttonSave = true;

  get name() {
    return this.formKlinik.controls['name'];
  }
  
  get customer_id() {
    return this.formKlinik.controls['customer_id'];
  }
  
  get npwp() {
    return this.formKlinik.controls['npwp'];
  }
  
  get address() {
    return this.formKlinik.controls['address'];
  }
  
  get provinsi_id() {
    return this.formKlinik.controls['provinsi_id'];
  }
  
  get kabupaten_kota_id() {
    return this.formKlinik.controls['kabupaten_kota_id'];
  }
  
  get kecamatan_id() {
    return this.formKlinik.controls['kecamatan_id'];
  }
  
  get desa_kelurahan_id() {
    return this.formKlinik.controls['desa_kelurahan_id'];
  }
  
  get zipcode() {
    return this.formKlinik.controls['zipcode'];
  }
  
  get phone_number() {
    return this.formKlinik.controls['phone_number'];
  }
  
  get email() {
    return this.formKlinik.controls['email'];
  }
  
  get pic_name() {
    return this.formKlinik.controls['pic_name'];
  }
  
  get pic_phone_number() {
    return this.formKlinik.controls['pic_phone_number'];
  }
  
  get status() {
    return this.formKlinik.controls['status'];
  }
  
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    private headerComponent: HeaderComponent,
    private klinikComponent: KlinikComponent,
    private klinikService: KlinikService,
    private pelangganService: PelangganService,
    private provinsiService: ProvinsiService,
    private kecamatanService: KecamatanService,
    private kabupatenkotaService: KabupatenkotaService,
    private desakelurahanService: DesakelurahanService,
  ) { }

  ngOnInit(): void {
    this.ambilSemuaProvinsi();
    this.ambilSemuaPelanggan();
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`offset`] = page;
    }

    if (pageSize) {
      params[`limit`] = pageSize;
    }

    return params;
  }

  ambilSemuaPelanggan() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    console.log(params);
    this.pelangganService.getAllPelanggan(params).subscribe(
      (data: any) => {
        // console.log("Nilai Provinsi");
        // console.log(data.data);
        this.pelanggan = data.data;
      }
    );
  }

  ambilSemuaProvinsi() {
    this.provinsiService.getAllProvinsi().subscribe(
      (data: any) => {
        // console.log("Nilai Provinsi");
        // console.log(data.data);
        this.provinsi = data.data;
      }
    );
  }

  ambilKabupatenKotaPerProvinsi(){
    // console.log('Provinsi id = ' + this.provinsi_id.value.id);
    // console.log('Provinsi = ' + this.provinsi_id.value.name);
    // console.log(this.provinsi_id);

    this.kabupatenkotaService.getAllKabupatenKota(this.provinsi_id.value.id).subscribe(
      (data: any) => {
        // console.log("Nilai Kabupaten / Kota");
        // console.log(data.data);
        this.kabupatenKota = data.data;
      }
    );
  }

  ambilKecamatanPerKabupatenKota(){
    // console.log('Kabupaten Kota id = ' + this.kabupaten_kota_id.value.id);
    // console.log('Kabupaten Kota = ' + this.kabupaten_kota_id.value.name);
    // console.log(this.kabupaten_kota_id);
    this.kecamatanService.getAllKecamatan(this.kabupaten_kota_id.value.id).subscribe(
      (data: any) => {
        // console.log("Nilai Kecamatan");
        // console.log(data.data);
        this.kecamatan = data.data;
      }
    );
  }

  ambilDesaKelurahanPerKecamatan(){
    console.log('Kecamatan id = ' + this.kecamatan_id.value.id);
    console.log('Kecamatan = ' + this.kecamatan_id.value.name);
    console.log(this.kecamatan_id);
    this.desakelurahanService.getAllDesaKelurahan(this.kecamatan_id.value.id).subscribe(
      (data: any) => {
        console.log("Nilai Desa / Kelurahan");
        console.log(data.data);
        this.desaKelurahan = data.data;
      }
    );
  }

  onCreate() {
    this.klinik.customer_id = this.customer_id.value.id.toString();
    this.klinik.provinsi_id = this.provinsi_id.value.id.toString();
    this.klinik.kabupaten_kota_id = this.kabupaten_kota_id.value.id.toString();
    this.klinik.kecamatan_id = this.kecamatan_id.value.id.toString();
    this.klinik.desa_kelurahan_id = this.desa_kelurahan_id.value.id.toString();
    console.log(this.klinik);

    this.klinikService.createKlinik(this.klinik).subscribe(
      (data: any) => {
         console.log(data);
        if(data.success == true){
          // console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Klinik baru sudah dibuat');
          this.close();
          this.klinikComponent.ngOnInit();
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
    console.log('this.formKlinik = ' + this.formKlinik.invalid);
    if(this.formKlinik.invalid){
      this.buttonSave = true;
    }else{
      this.buttonSave = false;
    }
    console.log('this.buttonSave = ' + this.buttonSave);
  }

  cancel() {
    this.router.navigate(['/Klinik']);
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

