import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { HuespedService } from '../../../core/services/huesped.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private huespedService: HuespedService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      numeroDocumento: ['', [Validators.required, Validators.maxLength(8)]],
      telefono: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  registrarse() {
    const form = this.registroForm.value;

    const nuevoHuesped = {
      nombre: form.nombre,
      apellido: form.apellido,
      correo: form.correo,
      direccion: form.direccion,
      fechaNacimiento: form.fechaNacimiento,
      numeroDocumento: form.numeroDocumento,
      telefono: form.telefono,
      usuario: {
        username: form.username,
        password: form.password
      }
    };

    this.huespedService.crearHuesped(nuevoHuesped).subscribe({
      next: () => {
        this.authService.login({
          username: form.username,
          password: form.password
        }).subscribe(() => {
          this.router.navigate(['/reserva']); // Redirige tras autologin
        });
      },
      error: (err) => {
        alert('Error al registrar huésped: ' + (err.error?.message || err.statusText));
      }
    });
  }
}
