import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  nombre = '';
  email = '';
  telefono = '';
  password = '';
  confirmPassword = '';

  mensajeError = '';
  mensajeExito = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onRegister() {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (this.password !== this.confirmPassword) {
      this.mensajeError = 'Las contraseñas no coinciden.';
      return;
    }

    const data = {
      nombre: this.nombre,
      email: this.email,
      telefono: this.telefono,
      password: this.password
    };

    this.authService.register(data).subscribe({
      next: () => {
        this.mensajeExito = 'Usuario creado correctamente. Redirigiendo...';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        if (err.error?.error?.code === 11000) {
          this.mensajeError = 'El email ya está registrado.';
        } else {
          this.mensajeError = 'No se pudo crear la cuenta.';
        }
      }
    });
  }

}
