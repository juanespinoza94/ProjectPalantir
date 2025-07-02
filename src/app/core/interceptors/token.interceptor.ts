// src/app/core/interceptors/token.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  // token.interceptor.ts
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const token = this.authService.getToken();

  const publicPaths = [
    '/login',
    '/api/huespedes',
    '/api/huespedes/',
    '/api/precioHabitacion',
    '/api/precioHabitacion/',
    '/api/planes',
    '/api/planes/',
    '/api/tipoHabitacion',
    '/api/tipoHabitacion/',
    // Rutas para testear
    '/api/itemConsumo',
    '/api/empleados'
  ];

  const isPublic = publicPaths.some(path => req.url.includes(path));

  if (token && !isPublic) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next.handle(cloned);
  }

  return next.handle(req);
}


}
