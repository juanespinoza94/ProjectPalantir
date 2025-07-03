import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../../core/services/reserva.service';
import { PagoService } from '../../../core/services/pago.service';
import { PagoTarjetaService } from '../../../core/services/pago-tarjeta.service';
import { PaymentService } from '../../../core/services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-pago',
  templateUrl: './formulario-pago.component.html',
})
export class FormularioPagoComponent implements OnInit {
  resumen: any; // Contiene datos de la reserva: idReserva, monto, etc.
  metodoPago: string = 'Efectivo';
  tarjeta = {
    titularTarjeta: '',
    numeroTarjetaMascara: '',
  };

  constructor(
    private reservaService: ReservaService,
    private pagoService: PagoService,
    private pagoTarjetaService: PagoTarjetaService,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.resumen = this.reservaService.getResumenReserva();
    if (!this.resumen) {
      alert('No hay información de reserva disponible');
      this.router.navigate(['/home']);
    }
  }

  confirmarPago(): void {
    if (!this.resumen?.idReserva || !this.resumen?.precioTotal) {
      alert('Información de reserva incompleta');
      return;
    }

    if (this.metodoPago === 'Tarjeta') {
    const numero = this.tarjeta.numeroTarjetaMascara.trim();
    if (numero.length < 13 || numero.length > 16 || !/^\d+$/.test(numero)) {
      alert('El número de tarjeta debe tener entre 13 y 16 dígitos numéricos.');
      return;
    }

    if (!this.tarjeta.titularTarjeta.trim()) {
      alert('El titular de la tarjeta es obligatorio.');
      return;
    }
  }

    const nuevoPago = {
      metodoPago: this.metodoPago,
      monto: this.resumen.precioTotal, 
      idReserva: this.resumen.idReserva,
    };

    this.pagoService.crearPago(nuevoPago).subscribe({
      next: (pagoCreado) => {
        if (this.metodoPago === 'Tarjeta') {
          this.registrarPagoTarjeta(pagoCreado);
        } else {
          alert('Pago registrado con éxito.');
          this.router.navigate(['']);
        }
      },
      error: (err) => {
        alert('Error al registrar el pago: ' + (err.error?.message || err.statusText));
      }
    });
  }

  private registrarPagoTarjeta(pago: any): void {
    const nuevoPagoTarjeta = {
      pago: { id: pago.id }, // Solo se necesita el id del pago
      titularTarjeta: this.tarjeta.titularTarjeta,
      numeroTarjetaMascara: this.tarjeta.numeroTarjetaMascara
    };

    this.pagoTarjetaService.crearPagoTarjeta(nuevoPagoTarjeta).subscribe({
      next: () => {
        alert('Pago con tarjeta registrado con éxito.');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert('Error al registrar el pago con tarjeta: ' + (err.error?.message || err.statusText));
      }
    });
  }
}
