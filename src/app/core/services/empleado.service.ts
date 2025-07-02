import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private url = 'http://localhost:8092/api/empleados';

  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  obtenerPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }
}
