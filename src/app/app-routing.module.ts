import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './features/huesped/registro/registro.component';
import { HomeComponent } from './features/home/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { FormularioReservaComponent } from './features/reserva/formulario-reserva-component/formulario-reserva.component';
import { FormularioPagoComponent } from './features/pago/formulario-pago-component/formulario-pago.component';
import { ItemConsumoComponent } from './features/item-consumo/principal-item-consumo/principal-item-consumo.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'reserva', component: FormularioReservaComponent },
  { path: 'pago', component: FormularioPagoComponent },
  { path: 'item', component: ItemConsumoComponent },

  // Lazy loading por módulo según tipo de empleado
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'recepcionista',
    loadChildren: () =>
      import('./features/recepcionista/recepcionista.module').then((m) => m.RecepcionistaModule),
  },
  {
    path: 'personal-servicios',
    loadChildren: () =>
      import('./features/personal-servicios/personal-servicios.module').then((m) => m.PersonalServiciosModule),
  },
  {
    path: 'encargado-adquisiciones',
    loadChildren: () =>
      import('./features/encargado-adquisiciones/encargado-adquisiciones.module').then((m) => m.EncargadoAdquisicionesModule),
  },
  {
    path: 'gerente',
    loadChildren: () =>
      import('./features/gerente/gerente.module').then((m) => m.GerenteModule),
  },

  // Ruta comodín para errores 404
  { path: '**', redirectTo: '' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
