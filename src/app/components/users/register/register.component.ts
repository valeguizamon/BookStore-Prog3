import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public email : string = '';
  public password : string = '';
  

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onRegister(){
    this.authService.registerUser(this.email,this.password)
    .then((res) => {
      this.authService.loginRedirect();
    }).catch( err => console.log('err',err.message));
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

  onUpload(){}
}
