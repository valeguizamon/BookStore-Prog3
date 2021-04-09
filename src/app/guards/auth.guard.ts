import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { take, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private afAuth: AngularFireAuth, private router: Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.afAuth.authState
    .pipe(take(1))
    .pipe(map(authState => !!authState))
    .pipe(tap(auth => {
      if (!auth) {
        this.router.navigate(['/user/login']);
      }
    }));
    
  }
  
}
