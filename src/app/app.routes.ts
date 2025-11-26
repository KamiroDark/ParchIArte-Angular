import { Routes } from '@angular/router';
import { ExperienciaListComponent } from './components/experiencias/experiencia-list/experiencia-list';
import { ExperienciaFormComponent } from './components/experiencias/experiencia-form/experiencia-form';

export const routes: Routes = [
    { path: '', redirectTo: '/experiencias', pathMatch: 'full' },
    { path: 'experiencias', component: ExperienciaListComponent },
    { path: 'experiencias/nueva', component: ExperienciaFormComponent },
    { path: 'experiencias/editar/:id', component: ExperienciaFormComponent }
];