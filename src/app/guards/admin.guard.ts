import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('token')) {
      return this.userService.getUserByToken().pipe(
        map(user => {
          if (user && user.role === 'admin') {
            return true;
          } else {
            this.router.navigate(['/error']);
            return false;
          }
        })
      );
    } else {
        this.router.navigate(['/login']);
        return false;
    }
  }
}
