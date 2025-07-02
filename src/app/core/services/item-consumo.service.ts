import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemConsumoService {
  private url = 'http://localhost:8094/api/itemConsumo';

  constructor(private http: HttpClient) {}

  listarItems(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  obtenerItemPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  registrarProducto(productoDTO: any): Observable<any> {
    return this.http.post<any>(`${this.url}/producto`, productoDTO);
  }

  registrarServicio(servicioDTO: any): Observable<any> {
    return this.http.post<any>(`${this.url}/servicio`, servicioDTO);
  }

  actualizarItem(id: number, request: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, request);
  }

  eliminarItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
