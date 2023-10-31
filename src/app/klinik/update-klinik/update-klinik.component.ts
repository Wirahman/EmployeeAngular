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
import { KlinikComponent } from '../klinik.component';
import { KlinikModule } from '../klinik/klinik.module';
import { KlinikService } from '../service/klinik.service';
import { PelangganService } from 'src/app/pelanggan/service/pelanggan.service';
import { ProvinsiService } from 'src/app/wilayah/service/provinsi/provinsi.service';
import { KecamatanService } from 'src/app/wilayah/service/kecamatan/kecamatan.service';
import { KabupatenkotaService } from 'src/app/wilayah/service/kabupatenkota/kabupatenkota.service';
import { DesakelurahanService } from 'src/app/wilayah/service/desakelurahan/desakelurahan.service';

@Component({
  selector: 'app-update-klinik',
  templateUrl: './update-klinik.component.html',
  styleUrls: ['./update-klinik.component.css']
})
export class UpdateKlinikComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  
  judulModal: string = 'Ubah Klinik';
  showModals = false;
  statusButton: boolean | undefined;

  id: any;
  private sub: any;
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
    id: new FormControl('',Validators.required,),
    code: new FormControl({ value: '', disabled: true },[Validators.required, Validators.pattern("^[0-9]*$")]),
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
    // email: new FormControl('',[Validators.required, Validators.email]),
    // hp: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
    // avatar: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(50)])
  });

  buttonUpdate = false;

  get code() {
    return this.formKlinik.controls['code'];
  }
  
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
    private route: ActivatedRoute,
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
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
    console.log("ID = " + this.id);
    console.log("Sub = " + this.sub);
    this.ambilSemuaPelanggan();
    this.getKlinikByID(this.id);
    this.ambilSemuaProvinsi();
    this.ambilKabupatenKotaPerProvinsi();
    this.ambilKecamatanPerKabupatenKota();
    this.ambilDesaKelurahanPerKecamatan();
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

  getKlinikByID(id: any){
    console.log("ID yang akan diupdate = " + id);
    this.klinikService.getKlinikByID(id).subscribe(
      (data: any) => {
        console.log("Get Klinik By ID");
        console.log("data");
        console.log(data);
        // console.log("json");
        // console.log(JSON.stringify(data));
        this.klinik = data.data[0];
        if(this.klinik.status == 'active'){
          this.klinik.status = JSON.parse("true");
        } else {
          this.klinik.status = JSON.parse("false");
        }
        console.log("klinik");
        console.log(this.klinik);
        this.ambilPelangganByID(this.klinik.customer_id);
        this.ambilProvinsiByID(this.klinik.provinsi_id);
        this.ambilKabupatenKotaByID(this.klinik.kabupaten_kota_id);
        this.ambilKecamatanByID(this.klinik.kecamatan_id);
        this.ambilDesaKelurahanByID(this.klinik.desa_kelurahan_id);

      },(error: any) => console.log(error)
    );
  }

  ambilPelangganByID(customer_id: any) {
    this.pelangganService.getPelangganByID(customer_id).subscribe(
      (data: any) => {
        // console.log("Nilai Pelanggan");
        // console.log(data.data);
        this.selectPelanggan = data.data[0];
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

  ambilProvinsiByID(provinsi_id: any) {
    this.provinsiService.getProvinsiByID(provinsi_id).subscribe(
      (data: any) => {
        // console.log("Nilai Provinsi");
        // console.log(data.data);
        this.selectProvinsi = data.data[0];
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

  ambilKabupatenKotaByID(kabupaten_kota_id: any){
    this.kabupatenkotaService.getKabupatenKotaByID(kabupaten_kota_id).subscribe(
      (data: any) => {
        // console.log("Nilai Kabupaten / Kota");
        // console.log(data.data);
        this.selectKabupatenKota = data.data[0];
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
  
  ambilKecamatanByID(kecamatan: any){
    this.kecamatanService.getKecamatanByID(kecamatan).subscribe(
      (data: any) => {
        // console.log("Nilai Kecamatan");
        // console.log(data.data);
        this.selectKecamatan = data.data[0];
      }
    );
  }

  ambilDesaKelurahanPerKecamatan(){
    // console.log('Kecamatan id = ' + this.kecamatan_id.value.id);
    // console.log('Kecamatan = ' + this.kecamatan_id.value.name);
    // console.log(this.kecamatan_id);
    this.desakelurahanService.getAllDesaKelurahan(this.kecamatan_id.value.id).subscribe(
      (data: any) => {
        console.log("Nilai Desa / Kelurahan");
        console.log(data.data);
        this.desaKelurahan = data.data;
      }
    );
  }

  ambilDesaKelurahanByID(desaKelurahan: any){
    // console.log("ID Desa / Kelurahan = " + desaKelurahan);
    this.desakelurahanService.getDesaKelurahanByID(desaKelurahan).subscribe(
      (data: any) => {
        console.log("Nilai Desa / Kelurahan");
        console.log(data.data);
        this.selectDesaKelurahan = data.data[0];
      }
    );
  }

  onUpdate() {
    this.klinik.customer_id = this.selectPelanggan.id;
    this.klinik.provinsi_id = this.selectProvinsi.id;
    this.klinik.kabupaten_kota_id = this.selectKabupatenKota.id;
    this.klinik.kecamatan_id = this.selectKecamatan.id;
    this.klinik.desa_kelurahan_id = this.selectDesaKelurahan.id;
    console.log("Update Data Klinik");
    console.log(this.klinik);
    this.klinikService.updateKlinik(this.klinik).subscribe(
      (data: any) => {
         console.log(data);
        if(data.success == true){
          // console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Klinik sudah diubah');
          this.close();
          this.klinikComponent.ngOnInit();
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
    // console.log(this.formKlinik);
    // console.log("Periksa alert");
    // console.log('this.formKlinik = ' + this.formKlinik.invalid);
    if(this.formKlinik.invalid){
      this.buttonUpdate = true;
    }else{
      this.buttonUpdate = false;
    }
    // console.log('this.buttonUpdate = ' + this.buttonUpdate);
  }

  cancel() {
    this.router.navigate(['/Klinik']);
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
