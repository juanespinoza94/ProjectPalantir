import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  monto: number = 0;
  idReserva?: number;
}
