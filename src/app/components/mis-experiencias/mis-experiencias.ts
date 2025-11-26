import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienciaService } from '../../services/experiencia';
import { Experiencia } from '../../models/experiencia';

@Component({
  selector: 'app-mis-experiencias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-experiencias.html',
  styleUrls: ['./mis-experiencias.css']
})
export class MisExperienciasComponent implements OnInit {
  experiencias: Experiencia[] = [];
  misExperiencias: string[] = []; // IDs de experiencias que el usuario ha guardado
  loading: boolean = true;

  constructor(private experienciaService: ExperienciaService) { }

  ngOnInit(): void {
    this.cargarExperiencias();
    this.cargarMisExperiencias();
  }

  cargarExperiencias(): void {
    this.experienciaService.getExperiencias().subscribe({
      next: (data) => {
        this.experiencias = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar experiencias:', error);
        this.loading = false;
      }
    });
  }

  cargarMisExperiencias(): void {
    // Cargar del localStorage (simple) o de la API si tienes endpoint
    const guardadas = localStorage.getItem('misExperiencias');
    this.misExperiencias = guardadas ? JSON.parse(guardadas) : [];
  }

  estaEnMiLista(id: string | undefined): boolean {
    return id ? this.misExperiencias.includes(id) : false;
  }

  agregarAMiLista(id: string | undefined): void {
    if (!id) return;

    if (!this.misExperiencias.includes(id)) {
      this.misExperiencias.push(id);
      localStorage.setItem('misExperiencias', JSON.stringify(this.misExperiencias));
      alert('✓ Experiencia agregada a tu lista');
    }
  }

  quitarDeMiLista(id: string | undefined): void {
    if (!id) return;

    this.misExperiencias = this.misExperiencias.filter(expId => expId !== id);
    localStorage.setItem('misExperiencias', JSON.stringify(this.misExperiencias));
    alert('✓ Experiencia removida de tu lista');
  }

  getMisExperienciasFiltradas(): Experiencia[] {
    return this.experiencias.filter(exp => this.estaEnMiLista(exp._id));
  }
}