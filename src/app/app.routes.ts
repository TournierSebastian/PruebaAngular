import { Routes } from '@angular/router';
import { LoginComponent } from './page/auth/login.component';
import { authGuard } from './auth.guard';
import { PetComponent } from './page/pet/pet.component';
import { ProfileComponent } from './page/profile/profile.component';
import { NotFoundComponent } from './component/not-found/not-found.component';

export const routes: Routes = [

    {path: '', component: LoginComponent},
    {path: 'inicio', component: PetComponent, canActivate: [authGuard]},
    {path: 'perfil', component: ProfileComponent, canActivate: [authGuard]},
    {path: '**', component: NotFoundComponent}

];
