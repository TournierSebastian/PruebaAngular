import { Component } from '@angular/core';
import { NavbarComponent } from "../../component/navbar/navbar.component";
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private authService: AuthService){

  }

  Logout() {
    this.authService.logout();
  }
}
