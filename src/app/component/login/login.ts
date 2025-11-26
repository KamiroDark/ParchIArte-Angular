import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.html'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Si ya está logueado, redirigir
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/eventos']);
    }

    // Inicializar formulario
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  // Getters para facilitar acceso a los campos
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          // Login exitoso
          const usuario = this.authService.getUsuario();
          
          // Redirigir según el rol del usuario si existe, o a eventos por defecto
          if (usuario?.rol === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/eventos']);
          }
        },
        error: (error) => {
          this.isLoading = false;
          
          // Manejar diferentes tipos de errores
          if (error.status === 401 || error.status === 404) {
            this.errorMessage = 'Credenciales incorrectas. Por favor, verifica tus datos.';
          } else if (error.status === 0) {
            this.errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión.';
          } else {
            this.errorMessage = error.error?.mensaje || 'Error al iniciar sesión. Por favor, intenta nuevamente.';
          }
          
          console.error('Error en login:', error);
        }
      });
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }
}