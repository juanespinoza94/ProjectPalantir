import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HabitacionService {
  private apiUrl = 'http://localhost:8090/api/habitacion';

  constructor(private http: HttpClient) {}

  // ✅ Ya tienes este
  listarDisponibles(idTipoHabitacion: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/disponibles`, {
      params: {
        idTipoHabitacion: idTipoHabitacion.toString(),
        estado: 'Disponible'
      }
    });
  }

  // ✅ Agregar este método para obtener tipos de habitación
  obtenerTiposHabitacion(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8090/api/tipoHabitacion`);
  }
}
