import { Routes } from '@angular/router';
import { ExperienciaListComponent } from './components/experiencias/experiencia-list/experiencia-list';
import { ExperienciaFormComponent } from './components/experiencias/experiencia-form/experiencia-form';
import { LoginComponent } from './component/login/login';
import { RegisterComponent } from './component/register/register';
import { EventosComponent } from './component/eventos/eventos';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // Rutas protegidas con AuthGuard
    {
        path: 'eventos',
        component: EventosComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'experiencias',
        component: ExperienciaListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'experiencias/nueva',
        component: ExperienciaFormComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'experiencias/editar/:id',
        component: ExperienciaFormComponent,
        canActivate: [AuthGuard]
    },

    { path: '**', redirectTo: 'login' }
];