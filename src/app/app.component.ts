import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Si ya está logueado y está en la raíz, lo redirigimos según su rol
    if (this.auth.isLoggedIn() && this.router.url === '/') {
      const rol = this.auth.getRole();
      this.redirigirPorRol(rol);
    }
  }

  private redirigirPorRol(rol: string | null): void {
    switch (rol) {
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;
      case 'GERENTE':
        this.router.navigate(['/gerente']);
        break;
      case 'RECEPCIONISTA':
        this.router.navigate(['/recepcionista']);
        break;
      case 'PERSONAL_SERVICIOS':
        this.router.navigate(['/personal-servicios']);
        break;
      case 'ENCARGADO_ADQUISICIONES':
        this.router.navigate(['/encargado-adquisiciones']);
        break;
      case 'HUESPED':
        this.router.navigate(['/reserva']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }
}
