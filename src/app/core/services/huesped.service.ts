import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// huesped.service.ts
@Injectable({ providedIn: 'root' })
export class HuespedService {
  private apiUrl = 'http://localhost:8090/api/huesped'; 
  constructor(private http: HttpClient) {}

  crearHuesped(huesped: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, huesped);
  }
}
