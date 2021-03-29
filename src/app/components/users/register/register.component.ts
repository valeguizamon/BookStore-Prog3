import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  public email: string = '';
  public password: string = '';
  
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private afStorage: AngularFireStorage,
  ){}

  ngOnInit(): void {}

  onRegister() {
    this.authService.registerUser(this.email, this.password)
      .then((res) => {
        this.authService.loginRedirect();
      }).catch(err => console.log('err', err.message));
  }

  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
      .then((res) => {
        this.authService.loginRedirect();
      }).catch(err => console.log('error', err.message));
  }

  onLoginFacebook(): void {
    this.authService.loginFacebookUser()
      .then((res) => {
        this.authService.loginRedirect();
      }).catch(err => console.log('error', err.message));
  }

  onUpload(event) {
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(()=> this.urlImage = ref.getDownloadURL())).subscribe();
  }
}
