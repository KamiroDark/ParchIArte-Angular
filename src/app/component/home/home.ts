import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  ngOnInit(): void {
    console.log('HomeComponent inicializado');
  }

  ngAfterViewInit(): void {
    // Inicializar animaciones después de que la vista cargue
    this.initCounters();
  }

  ngOnDestroy(): void {
    // Limpieza si es necesaria
  }

  private initCounters(): void {
    const counters = document.querySelectorAll('.counter');
    counters.forEach((counter) => {
      const target = parseInt(counter.textContent || '0');
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target.toString();
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current).toString();
        }
      }, 16);
    });
  }
}