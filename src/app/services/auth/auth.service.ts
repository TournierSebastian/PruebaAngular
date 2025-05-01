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

  login(token: string, username: string): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('username', username);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    this.router.navigate(['']);
  }


  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}