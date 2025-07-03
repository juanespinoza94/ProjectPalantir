import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
  private apiUrl = 'http://localhost:8090/api/empleados';

  constructor(private http: HttpClient) {}

  obtenerIdEmpleadoPorUsuario(idUsuario: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/usuario/${idUsuario}`);
  }

  obtenerEmpleadoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
