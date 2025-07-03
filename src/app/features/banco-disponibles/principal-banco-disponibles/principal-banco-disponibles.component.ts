import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { BancoService } from '../../../core/services/banco-disponibles.service';

declare var bootstrap: any;

@Component({
  selector: 'app-banco-disponible',
  templateUrl: './principal-banco-disponibles.component.html',
  styleUrls: ['./principal-banco-disponibles.component.css']
})
export class BancoDisponibleComponent implements OnInit {
  listaBancos: any[] = [];
  formBanco: FormGroup;
  id: number | null = null;
  encabezado: string = '';

  constructor(private bancoService: BancoService) {
    this.formBanco = new FormGroup({
      nombre: new FormControl('', Validators.required),
      estado: new FormControl('Activo') // visible solo al editar
    });
  }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.bancoService.listar().subscribe(data => {
      this.listaBancos = data;
    });
  }

  abrirModal(id?: number) {
  console.log('Abriendo modal para id:', id); // <-- AÑADE ESTO

  this.formBanco.reset({ nombre: '', estado: 'Activo' });

  if (id) {
    this.id = id;
    this.encabezado = 'Editar Banco';

    this.bancoService.obtenerPorId(id).subscribe(data => {
      console.log('Datos del banco:', data); // <-- AÑADE ESTO
      this.formBanco.patchValue({
        nombre: data.nombre,
        estado: data.estado
      });

      const modal = new bootstrap.Modal(document.getElementById('modalBanco'));
      setTimeout(() => modal.show(), 0);
    });
  } else {
    this.id = null;
    this.encabezado = 'Registrar Banco';

    const modal = new bootstrap.Modal(document.getElementById('modalBanco'));
    modal.show();
  }
}


  registrar() {
    if (this.formBanco.invalid) return;

    const request = {
      nombre: this.formBanco.value.nombre,
      estado: 'Activo' // por defecto
    };

    this.bancoService.registrar(request).subscribe({
      next: () => {
        this.confirmacion('registrado');
        this.cerrarModal();
        this.listar();
      },
      error: err => {
        console.error('Error al registrar:', err);
        Swal.fire('Error', 'No se pudo registrar el banco', 'error');
      }
    });
  }
  
actualizar() {
  if (this.formBanco.invalid || this.id === null) return;

  const request = {
    nombre: this.formBanco.value.nombre,
    estado: this.formBanco.value.estado
  };

  console.log('Actualizando banco:', request); // 👈 Agregado para debug

  this.bancoService.actualizar(this.id, request).subscribe({
    next: () => {
      this.confirmacion('actualizado');
      this.cerrarModal();
      this.listar();
      this.id = null; // 👈 Limpia el id después de actualizar
    },
    error: err => {
      console.error('Error al actualizar:', err);
      Swal.fire('Error', 'No se pudo actualizar el banco', 'error');
    }
  });
}

alertaActualizar() {
  Swal.fire({
    title: '¿Actualizar banco?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, actualizar'
  }).then(res => {
    if (res.isConfirmed) {
      this.actualizar();
    }
  });
}



eliminar(id: number) {
  Swal.fire({
    title: '¿Eliminar banco?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar'
  }).then(res => {
    if (res.isConfirmed) {
      this.bancoService.obtenerPorId(id).subscribe(banco => {
        const bancoActualizado = {
          ...banco,
          estado: 'Inactivo' // aquí corregido
        };

        this.bancoService.actualizar(id, bancoActualizado).subscribe({
          next: () => {
            this.confirmacion('eliminado');
            this.listar();
          },
          error: err => {
            console.error('Error al eliminar:', err);
            Swal.fire('Error', 'No se pudo eliminar el banco', 'error');
          }
        });
      });
    }
  });
}

  confirmacion(msg: string) {
    Swal.fire({
      icon: 'success',
      title: `Banco ${msg} correctamente`,
      showConfirmButton: false,
      timer: 1500,
      position: 'top-end'
    });
  }

cerrarModal() {
  const modalElement = document.getElementById('modalBanco');
  const modal = bootstrap.Modal.getInstance(modalElement);
  modal?.hide();

  setTimeout(() => {
    document.body.classList.remove('modal-open');
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) backdrop.remove();
  }, 300);
}
}
