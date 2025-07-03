import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs'; // 👈

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8090';

  private loginStatusSubject = new BehaviorSubject<boolean>(this.isLoggedIn()); // 👈
  loginStatus$ = this.loginStatusSubject.asObservable(); // 👈

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }) {
  return this.http.post<{ token: string, rol: string, id: number, username: string, email: string }>(
    `${this.apiUrl}/login`,
    credentials
  ).pipe(
    tap(response => {
      const rolNormalizado = response.rol.replace('ROLE_', ''); 

      localStorage.setItem('token', response.token);
      localStorage.setItem('rol', rolNormalizado); 
      localStorage.setItem('id', response.id.toString());
      localStorage.setItem('username', response.username);
      localStorage.setItem('email', response.email);

      this.loginStatusSubject.next(true);
      this.redirigirPorRol(rolNormalizado);
    })
  );
}


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    this.loginStatusSubject.next(false); // 👈 Notifica logout
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('rol');
  }

  getIdUsuarioFromToken(): number | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = token.split('.')[1];
    const decoded = atob(payload);
    const parsed = JSON.parse(decoded);

    return parsed?.id ? +parsed.id : null;
  }

  redirigirPorRol(rol: string): void {
  switch (rol) {
    case 'ADMIN': this.router.navigate(['/admin']); break;
    case 'GERENTE': this.router.navigate(['/gerente']); break;
    case 'RECEPCIONISTA': this.router.navigate(['/recepcionista']); break;
    case 'PERSONAL_SERVICIOS': this.router.navigate(['/personal-servicios']); break;
    case 'ENCARGADO_ADQUISICIONES': this.router.navigate(['/encargado-adquisiciones']); break;
    case 'HUESPED': this.router.navigate(['/reserva']); break;
    default: this.router.navigate(['/']); break;
  }
}


}
