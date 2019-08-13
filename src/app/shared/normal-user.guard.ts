import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class NormalUserGuard implements CanActivate {
  constructor(private auth:UserService, private router : Router, private afAuth : AngularFireAuth){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.auth.typeOfUser == true) {
      window.alert('Access Denied, login as a normal user')
      this.router.navigate(['/device-list'])
    }
    return true;
  }
  
}