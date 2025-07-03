import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  tiposHabitacion = [
    { nombre: 'Simple', descripcion: 'Habitación individual con cama simple', imagen: 'assets/single-room.png' },
    { nombre: 'Simple con balcón', descripcion: 'Habitación individual con vista al centro de la ciudad', imagen: 'assets/single-room.png' },
    { nombre: 'Doble', descripcion: 'Habitación doble con dos camas', imagen: 'assets/single-room.png' },
    { nombre: 'Familiar', descripcion: 'Habitación familiar con una cama y un camarote', imagen: 'assets/single-room.png' },
    { nombre: 'Ejecutiva', descripcion: 'Habitación individual con cama premium y jacuzzi', imagen: 'assets/single-room.png' },
  ];

  constructor(private router: Router) {}

  reservar(tipo: any) {
  const usuarioLogueado = localStorage.getItem('token');
  if (usuarioLogueado) {
    this.router.navigate(['/reserva'], { queryParams: { tipo: tipo.id } });
  } else {
    this.router.navigate(['/registro'], { queryParams: { redirect: '/reserva', tipo: tipo.id } });
  }
}

}
