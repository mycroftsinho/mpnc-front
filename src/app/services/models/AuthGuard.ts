import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {
    }
    canActivate() {
        const token = localStorage.getItem('jwt');

        if (token) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
