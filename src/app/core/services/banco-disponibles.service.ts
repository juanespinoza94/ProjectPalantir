import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BancoService {
  private url = 'http://localhost:8093/api/bancoDisponibles';

  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  obtenerPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  registrar(request: any): Observable<any> {
    return this.http.post<any>(this.url, request);
  }

  actualizar(id: number, request: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, request);
  }
}
