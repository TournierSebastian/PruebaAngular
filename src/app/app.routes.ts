import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { AnimalesComponent } from './component/animales/animales.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [

    {path: '', component: LoginComponent},
    {path: 'home', component: AnimalesComponent, canActivate: [authGuard]},

];
