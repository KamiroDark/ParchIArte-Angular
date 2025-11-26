import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
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
    public authService: AuthService,
    private router: Router
  ) { }

  get usuarioNombre(): string {
    const usuario = this.authService.getUsuario();
    return usuario?.nombre || '';
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
