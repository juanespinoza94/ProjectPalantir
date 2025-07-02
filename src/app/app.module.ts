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
import { ItemConsumoComponent } from './features/item-consumo/principal-item-consumo/principal-item-consumo.component'; 
import { EmpleadoComponent } from './features/empleado/principal-empleado/principal-empleado.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    ItemConsumoComponent,
    EmpleadoComponent
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
