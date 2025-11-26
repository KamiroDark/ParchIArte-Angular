import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  estaLogueado(): boolean {
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    const usuario = this.authService.getUsuario();
    return usuario?.rol === 'admin';
  }

  getNombreUsuario(): string {
    const usuario = this.authService.getUsuario();
    return usuario ? usuario.nombre : '';
  }

  getRolUsuario(): string {
    const usuario = this.authService.getUsuario();
    return usuario?.rol === 'admin' ? '👑 Admin' : '👤 Usuario';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}