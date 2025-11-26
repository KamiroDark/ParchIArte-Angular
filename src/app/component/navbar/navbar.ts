import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isScrolled = false;
  isMobileMenuOpen = false;
  private routerSubscription?: Subscription;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Cerrar menú móvil cuando cambia la ruta
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeMobileMenu();
      });
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    // Asegurarse de que el body no quede con la clase activa
    document.body.classList.remove('mobile-nav-active');
    document.body.style.overflow = '';
  }

  get usuarioNombre(): string {
    const usuario = this.authService.getUsuario();
    return usuario?.nombre || 'Usuario';
  }

  onLogout(): void {
    this.closeMobileMenu();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('window:resize', [])
  onWindowResize(): void {
    // Cerrar menú móvil si se redimensiona a desktop
    if (window.innerWidth >= 1200 && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const navbar = document.getElementById('navmenu');
    const toggle = document.querySelector('.mobile-nav-toggle');

    // Cerrar menú si se hace clic fuera del navbar y del toggle
    if (this.isMobileMenuOpen && 
        navbar && 
        !navbar.contains(target) && 
        toggle && 
        !toggle.contains(target)) {
      this.closeMobileMenu();
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    if (this.isMobileMenuOpen) {
      document.body.classList.add('mobile-nav-active');
      // Prevenir scroll del body cuando el menú está abierto
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('mobile-nav-active');
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.classList.remove('mobile-nav-active');
    document.body.style.overflow = '';
  }

  onNavLinkClick(): void {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }
}