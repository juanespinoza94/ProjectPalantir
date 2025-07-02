import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../../core/services/empleado.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './principal-empleado.component.html',
  styleUrls: ['./principal-empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  listaEmpleados: any[] = [];

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.empleadoService.listar().subscribe(data => {
      this.listaEmpleados = data;
    });
  }
}
