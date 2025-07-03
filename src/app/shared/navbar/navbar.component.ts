import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { HuespedService } from '../../core/services/huesped.service';
import { EmpleadoService } from '../../core/services/empleado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  nombreUsuario: string | null = null;
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    private huespedService: HuespedService,
    private empleadoService: EmpleadoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.loginStatus$.subscribe((status) => {
      this.isLoggedIn = status;
      if (status) {
        this.cargarNombreUsuario();
      } else {
        this.nombreUsuario = null;
      }
      this.cd.detectChanges(); 
    });

    if (this.authService.isLoggedIn()) {
      this.cargarNombreUsuario();
    }
  }

  cargarNombreUsuario(): void {
    const rol = this.authService.getRole();
    const idUsuario = this.authService.getIdUsuarioFromToken();

    if (rol && idUsuario) {
      if (rol === 'ROLE_HUESPED') {
        this.huespedService.obtenerIdHuespedPorUsuario(idUsuario).subscribe({
          next: (idHuesped) => {
            this.huespedService.obtenerHuespedPorId(idHuesped).subscribe(huesped => {
              this.nombreUsuario = huesped.nombre;
              this.cd.detectChanges();
            });
          }
        });
      } else if (rol.startsWith('ROLE_')) {
        this.empleadoService.obtenerIdEmpleadoPorUsuario(idUsuario).subscribe({
          next: (idEmpleado) => {
            this.empleadoService.obtenerEmpleadoPorId(idEmpleado).subscribe(empleado => {
              this.nombreUsuario = empleado.nombre;
              this.cd.detectChanges();
            });
          }
        });
      }
    }
  }

  logout(): void {
    this.authService.logout();
  }
}