import { Routes } from '@angular/router';
import { LoginComponent } from './page/auth/login.component';
import { authGuard } from './auth.guard';
import { PetComponent } from './page/pet/pet.component';
import { ProfileComponent } from './page/profile/profile.component';

export const routes: Routes = [

    {path: '', component: LoginComponent},
    {path: 'inicio', component: PetComponent, canActivate: [authGuard]},
    {path: 'perfil', component: ProfileComponent, canActivate: [authGuard]},


];
