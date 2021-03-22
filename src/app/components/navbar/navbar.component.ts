import { AuthService } from '../../services/auth.service';

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public app_name: string = 'BookStore ';
  public isLogged: boolean = false;

  constructor(private authService: AuthService, private afsAuth: AngularFireAuth) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  onLogout(){
    this.authService.logoutUser()
    this.authService.logoutRedirect();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe( auth=> {
      if(auth){
        console.log('user logged');
        this.isLogged = true;
      } else {
        console.log('user NOT logged');
        this.isLogged = false;
      }
    })
  }

}
