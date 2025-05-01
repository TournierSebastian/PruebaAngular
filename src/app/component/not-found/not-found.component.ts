import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  constructor(private router: Router, private authService: AuthService ) {}


  goToHome() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/inicio']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
