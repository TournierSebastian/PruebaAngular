import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root', 
})
export class AuthService {
  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token; 
  }

  login(token: string): void {
    localStorage.setItem('authToken', token);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['']);
  }


  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}