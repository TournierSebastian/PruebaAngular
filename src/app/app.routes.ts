import { Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login.component';
import { authGuard } from './auth.guard';
import { PetComponent } from './component/pet/pet.component';

export const routes: Routes = [

    {path: '', component: LoginComponent},
    {path: 'home', component: PetComponent, canActivate: [authGuard]},

];
