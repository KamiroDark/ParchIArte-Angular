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

  estaLogueado() {
    return this.authService.isLoggedIn();
  }

  getNombreUsuario() {
    const usuario = this.authService.getUsuario();
    return usuario ? usuario.nombre : '';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
