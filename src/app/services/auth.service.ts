import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase/app';

import { map } from 'rxjs/operators';

import { UserInterface } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) { }

  user : UserInterface;

  isAuth(){
    return this.afsAuth.authState.pipe(map(auth => auth));
  }
  
  registerUser(email: string, password: string){
    return new Promise((resolve,reject)=>{
      this.afsAuth.createUserWithEmailAndPassword(email,password)
      .then(userData => {
        resolve(userData),
        this.updateUserData(userData.user)
      }).catch(err => console.log(reject(err)))
    });
  }

  loginEmailUser(email: string, password: string){
    return new Promise((resolve, reject)=> {
      this.afsAuth.signInWithEmailAndPassword(email, password)
      .then ( userData => resolve (userData),
      err => reject(err));
    });
  }

  loginFacebookUser(){
    return this.afsAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(credential => this.updateUserData(credential.user)); 
  }

  loginGoogleUser(){
    return this.afsAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(credential => this.updateUserData(credential.user));
  }

  loginRedirect(){
    return this.router.navigate(['admin/list-books']);
  }

  logoutRedirect(){
    return this.router.navigate(['user/login']);
  }

  logoutUser(){
    return this.afsAuth.signOut();
  }

  private updateUserData(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,
      email: user.email,
      roles: {
        editor: true
      }
    }
    return userRef.set(data, {merge: true})
  }

  isUserAdmin(userUid){
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }

}
