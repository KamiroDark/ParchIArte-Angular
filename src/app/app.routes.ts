import { Routes } from '@angular/router';

import { LoginComponent } from './component/login/login';
import { EventosComponent } from './component/eventos/eventos';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'login', component: LoginComponent },

    {
        path: 'eventos',
        component: EventosComponent,
        canActivate: [AuthGuard]
    },

    { path: '**', redirectTo: 'login' }
];
