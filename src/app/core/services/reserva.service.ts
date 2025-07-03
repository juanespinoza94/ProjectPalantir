import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private apiUrl = 'http://localhost:8090/api/reserva';

  private resumenReserva: any;

  setResumenReserva(resumen: any) {
    this.resumenReserva = resumen;
  }

  getResumenReserva(): any {
    return this.resumenReserva;
  }

  constructor(private http: HttpClient) {}

  crearReservaDesdeWeb(reserva: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/web`, reserva, { headers });
  }
}
