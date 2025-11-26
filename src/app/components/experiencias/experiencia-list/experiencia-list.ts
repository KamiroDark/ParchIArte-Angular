import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExperienciaService } from '../../../services/experiencia';
import { Experiencia } from '../../../models/experiencia';

@Component({
  selector: 'app-experiencia-list',
  standalone: true,
  imports: [CommonModule], // Agrega esto
  templateUrl: './experiencia-list.html',
  styleUrls: ['./experiencia-list.css']
})
export class ExperienciaListComponent implements OnInit {

  experiencias: Experiencia[] = [];
  loading: boolean = true;

  constructor(
    private experienciaService: ExperienciaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarExperiencias();
  }

  cargarExperiencias(): void {
    this.experienciaService.getExperiencias().subscribe({
      next: (data: Experiencia[]) => {
        this.experiencias = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar experiencias:', error);
        this.loading = false;
      }
    });
  }


  editarExperiencia(id: string | undefined): void {
    if (id) {
      this.router.navigate(['/experiencias/editar', id]);
    }
  }

  nuevaExperiencia(): void {
    this.router.navigate(['/experiencias/nueva']);
  }

  eliminarExperiencia(id: string | undefined, nombre: string): void {
  if (!id) return;
  
  if (confirm(`¿Estás seguro de eliminar "${nombre}"?\n\nEsta acción no se puede deshacer.`)) {
    this.experienciaService.deleteExperiencia(id).subscribe({
      next: () => {
        this.cargarExperiencias();
        // Cambia alert por un mensaje más elegante si tienes tiempo
        alert('✓ Experiencia eliminada correctamente');
      },
      error: (error) => {
        console.error('Error al eliminar:', error);
        alert('✗ Error al eliminar la experiencia. Intenta de nuevo.');
      }
    });
  }
}
}