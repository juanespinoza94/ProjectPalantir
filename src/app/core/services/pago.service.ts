import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PagoService {
  private apiUrl = 'http://localhost:8090/api/pago';

  constructor(private http: HttpClient) {}

  crearPago(pago: any): Observable<any> {
    return this.http.post(this.apiUrl, pago);
  }
}
