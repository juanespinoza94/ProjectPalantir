import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service'; // Ajusta ruta si es necesario

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMensaje: string = '';
  redirectUrl: string = '/'; // valor por defecto

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Si llegó desde /registro, redirigimos después del login
    this.route.queryParams.subscribe(params => {
      if (params['redirect']) {
        this.redirectUrl = params['redirect'];
      }
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

   this.authService.login(this.loginForm.value).subscribe({
  next: (response) => {
    const rol = response.rol.replace('ROLE_', ''); // Asegúrate que sea sin 'ROLE_'
    
    // Redirigir según el rol
    switch (rol) {
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;
      case 'GERENTE':
        this.router.navigate(['/gerente']);
        break;
      case 'RECEPCIONISTA':
        this.router.navigate(['/recepcionista']);
        break;
      case 'PERSONAL_SERVICIOS':
        this.router.navigate(['/personal-servicios']);
        break;
      case 'ENCARGADO_ADQUISICIONES':
        this.router.navigate(['/encargado-adquisiciones']);
        break;
      case 'HUESPED':
        this.router.navigate(['/reserva']);
        break;
      default:
        this.router.navigate(['/']);
    }
  },
  error: (err) => {
    alert('Credenciales incorrectas');
  }
});


    }
  }
}
