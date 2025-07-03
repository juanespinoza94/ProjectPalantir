import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { HuespedService } from '../../../core/services/huesped.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private huespedService: HuespedService,
    private authService: AuthService,
    private router: Router
  ) {}

  mayorDeEdadValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const fecha = new Date(control.value);
  const hoy = new Date();
  const edad = hoy.getFullYear() - fecha.getFullYear();
  const cumpleEsteAño = new Date(hoy.getFullYear(), fecha.getMonth(), fecha.getDate());

  if (fecha > hoy || edad < 18 || (edad === 18 && hoy < cumpleEsteAño)) {
    return { menorDeEdad: true };
  }

  return null;
}

  ngOnInit() {
    this.registroForm = this.fb.group({
  nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],
  apellido: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')]],
  email: ['', [Validators.required, Validators.email]],
  direccion: ['', Validators.required],
  fechaNacimiento: ['', [Validators.required, this.mayorDeEdadValidator]],
  numeroDocumento: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(8)]],
  telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(9)]],
  username: ['', Validators.required],
  password: ['', Validators.required],
});

  }



  registrarse() {
    const form = this.registroForm.value;

    const nuevoHuesped = {
      nombre: form.nombre,
      apellido: form.apellido,
      direccion: form.direccion,
      fechaNacimiento: form.fechaNacimiento,
      numeroDocumento: form.numeroDocumento,
      telefono: form.telefono,
      usuario: {
        username: form.username,
        email: form.email,
        password: form.password
      }
    };

    this.huespedService.crearHuesped(nuevoHuesped).subscribe({
      next: () => {
        this.authService.login({
          email: form.email,
          password: form.password
        }).subscribe(() => {
          this.router.navigate(['/reserva']); // Redirige tras autologin
        });
      },
      error: (err) => {
        if (err.status === 409) {
          alert('Ya existe un huésped con el mismo correo, usuario o documento.');
        } else {
          alert('Error al registrar huésped: ' + (err.error?.message || err.statusText));
        }
      }
    });
  }
}
