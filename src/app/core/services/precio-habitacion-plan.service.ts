import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class PrecioHabitacionPlanService {
  private apiUrl = 'http://localhost:8090/api/precioHabitacion';

 constructor(private http: HttpClient, private authService: AuthService) {}

  listarPorTipo(idTipo: number) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}/tipo/${idTipo}`, { headers });
  }
}