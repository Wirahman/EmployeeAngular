import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee';
  username: string | undefined | null;

  constructor(
    private router: Router
  ) { }

  ngOnInit(){
    this.checkSessionLogin();
    this.username = this.readLocalStorageValue('username');
  }

  checkSessionLogin() {
    if(localStorage.getItem('username') != undefined){
      this.router.navigate(['/Dashboard']);
    }else{
      localStorage.setItem('menu', '');
      this.router.navigate(['/Login']);
    }
  }

  readLocalStorageValue(key: string): string | undefined | null {
      return localStorage.getItem(key);
  }

  // menuRegister(){
  //   localStorage.setItem('menu', 'Register');
  //   this.router.navigate(['/Register']);
  // }

  // menuLogin(){
  //   localStorage.setItem('menu', 'Login');
  //   this.router.navigate(['/Login']);
  // }

  // // Menu Pelanggan
  // menuPelanggan(){
  //   localStorage.setItem('menu', 'Pelanggan');
  //   this.router.navigate(['/Pelanggan']);
  // }

  // // Menu Role
  // menuRole(){
  //   localStorage.setItem('menu', 'Role');
  //   this.router.navigate(['/Role']);
  // }
  
  // // Menu Role
  // menuPermission(){
  //   localStorage.setItem('menu', 'Permission');
  //   this.router.navigate(['/Permission']);
  // }
  
  checkSession(){
    const pengguna = localStorage.getItem('pengguna');
    console.log(pengguna);
    console.log('Username 1 = ' + this.username);
    console.log('UserID = ' + localStorage.getItem('userID'));
    console.log('Username 2 = ' + localStorage.getItem('username'));
    console.log('Menu = ' + localStorage.getItem('menu'));
    console.log('Header ID = ' + localStorage.getItem('userID'));
    console.log('Token User = ' + localStorage.getItem('token'));
  }

  logout(){
    localStorage.clear();
    localStorage.setItem('menu', 'Login');
    this.ngOnInit();
  }


}
