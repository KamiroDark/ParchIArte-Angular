import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExperienciaService } from '../../../services/experiencia';
import { Experiencia } from '../../../models/experiencia';

@Component({
  selector: 'app-experiencia-form',
  standalone: true,
  imports: [CommonModule, FormsModule], // Agrega esto
  templateUrl: './experiencia-form.html',
  styleUrls: ['./experiencia-form.css']
})
export class ExperienciaFormComponent implements OnInit {
  experiencia: Experiencia = {
    nombre: '',
    descripcion: '',
    categoria: '',
    precio: 0,
    disponibilidad: true,
    ubicacion: ''
  };

  isEditMode: boolean = false;
  experienciaId: string | null = null;

  constructor(
    private experienciaService: ExperienciaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.experienciaId = this.route.snapshot.paramMap.get('id');

    if (this.experienciaId) {
      this.isEditMode = true;
      this.cargarExperiencia(this.experienciaId);
    }
  }

  cargarExperiencia(id: string): void {
    this.experienciaService.getExperiencia(id).subscribe({
      next: (data) => {
        this.experiencia = data;
      },
      error: (error) => {
        console.error('Error al cargar experiencia:', error);
        alert('Error al cargar la experiencia');
        this.router.navigate(['/experiencias']);
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode && this.experienciaId) {
      // Actualizar
      this.experienciaService.updateExperiencia(this.experienciaId, this.experiencia).subscribe({
        next: () => {
          alert('Experiencia actualizada correctamente');
          this.router.navigate(['/experiencias']);
        },
        error: (error) => {
          console.error('Error al actualizar:', error);
          alert('Error al actualizar la experiencia');
        }
      });
    } else {
      // Crear
      this.experienciaService.createExperiencia(this.experiencia).subscribe({
        next: () => {
          alert('Experiencia creada correctamente');
          this.router.navigate(['/experiencias']);
        },
        error: (error) => {
          console.error('Error al crear:', error);
          alert('Error al crear la experiencia');
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/experiencias']);
  }
}