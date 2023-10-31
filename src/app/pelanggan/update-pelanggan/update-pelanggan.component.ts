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
import { PelangganComponent } from '../pelanggan.component';
import { PelangganModule } from '../model/pelanggan.module';
import { PelangganService } from '../service/pelanggan.service';
import { ProvinsiService } from 'src/app/wilayah/service/provinsi/provinsi.service';
import { KecamatanService } from 'src/app/wilayah/service/kecamatan/kecamatan.service';
import { KabupatenkotaService } from 'src/app/wilayah/service/kabupatenkota/kabupatenkota.service';
import { DesakelurahanService } from 'src/app/wilayah/service/desakelurahan/desakelurahan.service';

@Component({
  selector: 'app-update-pelanggan',
  templateUrl: './update-pelanggan.component.html',
  styleUrls: ['./update-pelanggan.component.css']
})
export class UpdatePelangganComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter<any>();
  
  judulModal: string = 'Ubah Pelanggan';
  showModals = false;
  statusButton: boolean | undefined;

  id: any;
  private sub: any;
  pelanggan: PelangganModule = new PelangganModule();
  alertValidasi: string = '';
  
  provinsi!: [];
  selectProvinsi!: any;
  kabupatenKota!: [];
  selectKabupatenKota!: any;
  kecamatan!: [];
  selectKecamatan!: any;
  desaKelurahan!: [];
  selectDesaKelurahan!: any;

  formPelanggan = new FormGroup({
    id: new FormControl('',Validators.required,),
    code: new FormControl({ value: '', disabled: true },[Validators.required, Validators.pattern("^[0-9]*$")]),
    company_name: new FormControl('',Validators.required,),
    owner_name: new FormControl('',Validators.required),
    ktp_id: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(16),Validators.maxLength(16)]),
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
    return this.formPelanggan.controls['code'];
  }
  
  get company_name() {
    return this.formPelanggan.controls['company_name'];
  }
  
  get owner_name() {
    return this.formPelanggan.controls['owner_name'];
  }
  
  get ktp_id() {
    return this.formPelanggan.controls['ktp_id'];
  }
  
  get npwp() {
    return this.formPelanggan.controls['npwp'];
  }
  
  get address() {
    return this.formPelanggan.controls['address'];
  }
  
  get provinsi_id() {
    return this.formPelanggan.controls['provinsi_id'];
  }
  
  get kabupaten_kota_id() {
    return this.formPelanggan.controls['kabupaten_kota_id'];
  }
  
  get kecamatan_id() {
    return this.formPelanggan.controls['kecamatan_id'];
  }
  
  get desa_kelurahan_id() {
    return this.formPelanggan.controls['desa_kelurahan_id'];
  }
  
  get zipcode() {
    return this.formPelanggan.controls['zipcode'];
  }
  
  get phone_number() {
    return this.formPelanggan.controls['phone_number'];
  }
  
  get email() {
    return this.formPelanggan.controls['email'];
  }
  
  get pic_name() {
    return this.formPelanggan.controls['pic_name'];
  }
  
  get pic_phone_number() {
    return this.formPelanggan.controls['pic_phone_number'];
  }
  
  get status() {
    return this.formPelanggan.controls['status'];
  }
  
  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private headerComponent: HeaderComponent,
    private pelangganComponent: PelangganComponent,
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
    this.getPelangganByID(this.id);
    this.ambilSemuaProvinsi();
    this.ambilKabupatenKotaPerProvinsi();
    this.ambilKecamatanPerKabupatenKota();
    this.ambilDesaKelurahanPerKecamatan();
  }
  
  getPelangganByID(id: any){
    console.log("ID yang akan diupdate = " + id);
    this.pelangganService.getPelangganByID(id).subscribe(
      (data: any) => {
        console.log("Get Pelanggan By ID");
        console.log("data");
        console.log(data);
        // console.log("json");
        // console.log(JSON.stringify(data));
        this.pelanggan = data.data[0];
        if(this.pelanggan.status == 'active'){
          this.pelanggan.status = JSON.parse("true");
        } else {
          this.pelanggan.status = JSON.parse("false");
        }
        console.log("pelanggan");
        console.log(this.pelanggan);
        
        this.ambilProvinsiByID(this.pelanggan.provinsi_id);
        this.ambilKabupatenKotaByID(this.pelanggan.kabupaten_kota_id);
        this.ambilKecamatanByID(this.pelanggan.kecamatan_id);
        this.ambilDesaKelurahanByID(this.pelanggan.desa_kelurahan_id);

      },(error: any) => console.log(error)
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
    this.pelanggan.provinsi_id = this.selectProvinsi.id;
    this.pelanggan.kabupaten_kota_id = this.selectKabupatenKota.id;
    this.pelanggan.kecamatan_id = this.selectKecamatan.id;
    this.pelanggan.desa_kelurahan_id = this.selectDesaKelurahan.id;
    console.log("Update Data Pelanggan");
    console.log(this.pelanggan);
    this.pelangganService.updatePelanggan(this.pelanggan).subscribe(
      (data: any) => {
         console.log(data);
        if(data.success == true){
          // console.log("Data Ada");
          this.headerComponent.tampilToastr('info', '', 'Pelanggan sudah diubah');
          this.close();
          this.pelangganComponent.ngOnInit();
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
    // console.log(this.formPelanggan);
    // console.log("Periksa alert");
    // console.log('this.formPelanggan = ' + this.formPelanggan.invalid);
    if(this.formPelanggan.invalid){
      this.buttonUpdate = true;
    }else{
      this.buttonUpdate = false;
    }
    // console.log('this.buttonUpdate = ' + this.buttonUpdate);
  }

  cancel() {
    this.router.navigate(['/Pelanggan']);
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
