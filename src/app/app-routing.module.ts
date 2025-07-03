import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './features/huesped/registro/registro.component';
import { HomeComponent } from './features/huesped/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { FormularioReservaComponent } from './features/reserva/formulario-reserva-component/formulario-reserva-component.component';
import { FormularioPagoComponent } from './features/pago/formulario-pago-component/formulario-pago-component.component';


const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'reserva', component: FormularioReservaComponent },
  { path: 'pago', component: FormularioPagoComponent },

];



/*
const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'reserva', component: FormularioReservaComponent },
  { path: 'pago', component: FormularioPagoComponent },

];
*/
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
