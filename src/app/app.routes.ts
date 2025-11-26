import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login';
import { EventosComponent } from './component/eventos/eventos';
import { HomeComponent } from './component/home/home';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', component: HomeComponent }, 
    { path: 'home', component: HomeComponent }, 
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'login', component: LoginComponent },

    {
        path: 'eventos',
        component: EventosComponent,
        canActivate: [AuthGuard]
    },

    { path: '**', redirectTo: 'home' }
];
