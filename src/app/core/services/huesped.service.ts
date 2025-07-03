import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

// huesped.service.ts
@Injectable({ providedIn: 'root' })
export class HuespedService {
  private apiUrl = 'http://localhost:8090/api/huespedes'; 
  constructor(private http: HttpClient, private authService: AuthService) {}

  crearHuesped(huesped: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, huesped);
  }

  obtenerIdHuespedPorUsuario(idUsuario: number) {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
  return this.http.get<number>(`${this.apiUrl}/usuario/${idUsuario}`, { headers });
}


  obtenerHuespedPorId(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8090/api/huespedes/${id}`);
  }

}
