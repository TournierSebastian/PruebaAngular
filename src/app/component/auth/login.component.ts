import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, LucideEye, LucideEyeOff } from 'lucide-angular';
import { LoginService } from '../../services/auth/login.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login',
  imports: [LucideAngularModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loading: boolean = false;
  error: string | null = null
  eyeIcon = LucideEye;
  eyeOffIcon = LucideEyeOff;
  showPassword = false;
  password: string = "";
  username: string = "";
  token: string = '';
  errorinput: boolean = false;


  constructor(private loginService: LoginService, private toastService: ToastrService) { }

  // ==============================================
  // LOGIN SERVICE METHODS
  // ==============================================
  
  logger() {
    this.loading = true;
    this.error = null;

    this.loginService.Login(this.username, this.password).subscribe({
      next: (response: string) => {
        this.token = response;
        this.loading = false;
        this.toastService.success('Logeado Correctamnete');

      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
        this.toastService.error('Error al Logarse');

      }
    });
  }

  // ==============================================
  // HANDLERS
  // ==============================================

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  HandleLogin(event: Event) {
    event.preventDefault();
    this.errorinput = false
    if (!this.username.trim() || !this.password.trim()) {
      this.errorinput = true
      return;
    }
    this.logger()
  }




















}
