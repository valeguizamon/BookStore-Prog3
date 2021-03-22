import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email : string = '';
  public password : string = '';

  constructor(private afAuth: AngularFireAuth, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLoginEmailUser(): void{
    this.authService.loginEmailUser(this.email, this.password)
    .then( (res) => {
      //console.log('resUser', res)
      this.authService.loginRedirect();
    }).catch ( err => console.log('error', err.message));
  }

  onLoginGoogle(): void{
    this.authService.loginGoogleUser()
    .then( (res) => {
      //console.log('resUser', res)
      this.authService.loginRedirect();
    }).catch ( err => console.log('error', err.message));
  }

  onLoginFacebook(): void{
    this.authService.loginFacebookUser()
    .then( (res) => {
      //console.log('resUser', res)
      this.authService.loginRedirect();
    }).catch ( err => console.log('error', err.message));
  }

}
