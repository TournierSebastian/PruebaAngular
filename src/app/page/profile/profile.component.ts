import { Component } from '@angular/core';
import { NavbarComponent } from "../../component/navbar/navbar.component";
import { AuthService } from '../../services/auth/auth.service';
import { ProfileService } from '../../services/profile/profile.service';
import { Profile } from '../../interfaces/profile';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  loading: boolean = false;
  error: string | null = null
  username: string = localStorage.getItem('username') || '';
  profile: Profile = {} as Profile
  isEditing = false;
  editProfile = { ...this.profile };

  constructor(private authService: AuthService, private profileService: ProfileService, private toastService: ToastrService){}

  ngOnInit() {
    this.loadProfile()
  }

  startEditing() {
    this.isEditing = true;
    this.editProfile = { ...this.profile };
  }

  cancelEdit() {
    this.isEditing = false;
  }

  saveProfile() {
    this.isEditing = false;
    this.EditProfile(this.editProfile, this.username)
  }

  // ==============================================
  // PROFILE SERVICE METHODS
  // ==============================================


  loadProfile(){
    this.loading = true;
    this.error = null
    
    this.profileService.getProfile(this.username).subscribe(
      {
        next: (res) =>{
          this.profile = res.data
          console.log(res.data)
          this.loading = false
        },
        error: (error) =>{
          this.error = error.message
        }
      }
    )
  }

  EditProfile(profile: Profile, username: string){
    this.profileService.updateProfile(profile, username).subscribe({
      next: () => {
        this.loadProfile();
        this.toastService.success('Perfil Actualizado')
      },
      error: (err) => {
        console.error('Error al actualizar mascota:', err);
        this.toastService.error('Error al actualizar perfil');
      }
    });
  }


  Logout() {
    this.authService.logout();
  }
}
