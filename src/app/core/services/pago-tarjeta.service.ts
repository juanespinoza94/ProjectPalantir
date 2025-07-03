import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PagoTarjetaService {
  private apiUrl = 'http://localhost:8090/api/pagoTarjeta';

  constructor(private http: HttpClient) {}

  crearPagoTarjeta(pagoTarjeta: any): Observable<any> {
    return this.http.post(this.apiUrl, pagoTarjeta);
  }
}
