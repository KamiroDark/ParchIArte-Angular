import { Routes } from '@angular/router';
import { ExperienciaListComponent } from './components/experiencias/experiencia-list/experiencia-list';
import { ExperienciaFormComponent } from './components/experiencias/experiencia-form/experiencia-form';
import { LoginComponent } from './component/login/login';
import { RegisterComponent } from './component/register/register';
import { EventosComponent } from './component/eventos/eventos';
import { MisExperienciasComponent } from './components/mis-experiencias/mis-experiencias';
import { AuthGuard } from './guards/auth-guard';
import { AdminGuard } from './guards/admin-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    
    // Rutas para USUARIOS normales
    {
        path: 'mis-experiencias',
        component: MisExperienciasComponent,
        canActivate: [AuthGuard]
    },
    
    // Rutas para ADMIN
    {
        path: 'experiencias',
        component: ExperienciaListComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'experiencias/nueva',
        component: ExperienciaFormComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'experiencias/editar/:id',
        component: ExperienciaFormComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    
    {
        path: 'eventos',
        component: EventosComponent,
        canActivate: [AuthGuard]
    },
    
    { path: '**', redirectTo: 'login' }
];