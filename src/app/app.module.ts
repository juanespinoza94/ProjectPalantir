import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';


// Interceptor
import { TokenInterceptor } from './core/interceptors/token.interceptor';

// Componentes
import { AppComponent } from './app.component';
import { RegistroComponent } from './features/huesped/registro/registro.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './features/home/home/home.component';
import { FormularioReservaComponent } from './features/reserva/formulario-reserva-component/formulario-reserva.component';
import { FormularioPagoComponent } from './features/pago/formulario-pago-component/formulario-pago.component';
import { ItemConsumoComponent } from './features/item-consumo/principal-item-consumo/principal-item-consumo.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    FormularioReservaComponent,
    FormularioPagoComponent,
    ItemConsumoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
