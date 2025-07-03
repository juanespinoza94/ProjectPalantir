
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HabitacionService } from '../../../core/services/habitacion.service';
import { ReservaService } from '../../../core/services/reserva.service';
import { PrecioHabitacionPlanService } from '../../../core/services/precio-habitacion-plan.service';
import { PaymentService } from '../../../core/services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-reserva',
  templateUrl: './formulario-reserva.component.html'
})
export class FormularioReservaComponent implements OnInit {
  reservaForm!: FormGroup;
  tiposHabitacion: any[] = [];
  habitacionesDisponibles: any[] = [];
  precioPlanes: PrecioHabitacionPlan[] = [];
  precioSeleccionado?: PrecioHabitacionPlan;

  constructor(
    private fb: FormBuilder,
    private habitacionService: HabitacionService,
    private precioService: PrecioHabitacionPlanService,
    private reservaService: ReservaService,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reservaForm = this.fb.group({
      tipoHabitacionId: [null, Validators.required],
      habitacionId: [null, Validators.required],
      cantidadHuespedes: [1, [Validators.required, Validators.min(1), Validators.max(4)]],
      fechaInicio: [null, Validators.required],
      fechaFin: [null, Validators.required],
      planSeleccionado: [null, Validators.required]
    });

    this.habitacionService.obtenerTiposHabitacion().subscribe({
      next: tipos => this.tiposHabitacion = tipos,
      error: err => alert('Error al cargar tipos de habitación')
    });
  }

  cargarPrecios(): void {
    const idTipo = this.reservaForm.get('tipoHabitacionId')?.value;
    if (!idTipo) return;

    this.precioService.listarPorTipo(idTipo).subscribe(data => {
      this.precioPlanes = data;
      this.precioSeleccionado = undefined;
    });
  }

  onSeleccionarPlan(event: Event): void {
    const selectedId = +(event.target as HTMLSelectElement).value;
    this.precioSeleccionado = this.precioPlanes.find(p => p.id === selectedId);
  }

  cargarHabitacionesDisponibles(): void {
    const tipoId = this.reservaForm.value.tipoHabitacionId;
    if (tipoId) {
      this.habitacionService.listarDisponibles(tipoId).subscribe({
        next: data => this.habitacionesDisponibles = data,
        error: err => alert('Error al cargar habitaciones disponibles')
      });
    }
  }

  confirmarReserva(): void {
    if (!this.precioSeleccionado) {
      alert('Debes seleccionar un plan de alojamiento.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Debe iniciar sesión para hacer la reserva');
      return;
    }

    const reservaData = {
      cantidadHuespedes: this.reservaForm.value.cantidadHuespedes,
      fechaInicio: this.reservaForm.value.fechaInicio,
      fechaFin: this.reservaForm.value.fechaFin,
      habitacion: +this.reservaForm.value.habitacionId
    };

    this.reservaService.crearReservaDesdeWeb(reservaData, token).subscribe({
      next: (res: any) => {
        // Establece datos para el resumen del pago
        this.reservaService.setResumenReserva({
          idReserva: res.id,
          tipoHabitacion: this.tiposHabitacion.find(t => t.id == this.reservaForm.value.tipoHabitacionId)?.nombre || 'Desconocido',
          numeroHabitacion: this.habitacionesDisponibles.find(h => h.id == this.reservaForm.value.habitacionId)?.numero || 'Desconocido',
          fechaInicio: this.reservaForm.value.fechaInicio,
          fechaFin: this.reservaForm.value.fechaFin,
          cantidadHuespedes: this.reservaForm.value.cantidadHuespedes,
          precioTotal: this.precioSeleccionado!.precio
        });

        this.paymentService.monto = this.precioSeleccionado!.precio;
        this.paymentService.idReserva = res.id;

        this.router.navigate(['/pago']);
      },
      error: (err) => {
        alert('Error al crear reserva: ' + (err.error?.message || err.statusText));
      }
    });
  }
}

export interface PlanAlojamiento {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface PrecioHabitacionPlan {
  id: number;
  precio: number;
  tipoHabitacionId: number;
  planAlojamiento: PlanAlojamiento;
}

