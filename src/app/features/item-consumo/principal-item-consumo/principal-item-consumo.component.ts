import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ItemConsumoService } from '../../../core/services/item-consumo.service';

declare var bootstrap: any;

@Component({
  selector: 'app-item-consumo',
  templateUrl: './principal-item-consumo.component.html',
  styleUrls: ['./principal-item-consumo.component.css']
})
export class ItemConsumoComponent implements OnInit {
  listaItems: any[] = [];
  formItem: FormGroup;
  encabezado: string = '';
  id: number | null = null;
  modo: 'Producto' | 'Servicio' = 'Producto';

  constructor(private itemService: ItemConsumoService) {
    this.formItem = new FormGroup({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      precioVenta: new FormControl('', [Validators.required, Validators.min(0)]),
      tieneStock: new FormControl(true),
      estado: new FormControl('Disponible')
    });
this.formItem.get('estado')?.valueChanges.subscribe(estado => {
  if (estado === 'No Disponible') {
    this.formItem.get('tieneStock')?.setValue(false, { emitEvent: false });
  } else if (estado === 'Disponible' && this.modo === 'Producto') {
    this.formItem.get('tieneStock')?.setValue(true, { emitEvent: false });
  }
});
  }

  ngOnInit(): void {
    this.listarItems();
  }

  

  listarItems() {
    this.itemService.listarItems().subscribe(data => {
      this.listaItems = data;
    });
  }

 abrirModal(modo: 'Producto' | 'Servicio', id?: number) {
  this.modo = modo;
  this.encabezado = (id ? 'Editar' : 'Registrar') + ' ' + modo;
  this.id = id ?? null;

  this.formItem.reset({
    nombre: '',
    descripcion: '',
    precioVenta: '',
    tieneStock: modo === 'Producto' ? true : false // solo si es producto
  });

if (id) {
  this.itemService.obtenerItemPorId(id).subscribe(item => {
    this.formItem.patchValue({
      nombre: item.nombre,
      descripcion: item.descripcion,
      precioVenta: item.precioVenta,
      tieneStock: item.tieneStock,
      estado: item.estado
    });

    // Lógica manual al cargar
    if (item.estado === 'No Disponible') {
      this.formItem.get('tieneStock')?.setValue(false, { emitEvent: false });
    } else if (item.estado === 'Disponible' && this.modo === 'Producto') {
      this.formItem.get('tieneStock')?.setValue(true, { emitEvent: false });
    }
  });
}

  const modalElement = document.getElementById('modalItem');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}
  registrarItem() {
    if (this.formItem.invalid) return;

    if (this.modo === 'Producto') {
      const dtoProducto = {
        nombre: this.formItem.value.nombre,
        descripcion: this.formItem.value.descripcion,
        precioVenta: this.formItem.value.precioVenta,
        cantidad: 10,
        fechaVencimiento: '2025-12-31'
      };

      this.itemService.registrarProducto(dtoProducto).subscribe(() => {
        this.confirmacion('registrado');
        this.cerrarModal();
        this.listarItems();
      });
    } else {
      const dtoServicio = {
        nombre: this.formItem.value.nombre,
        descripcion: this.formItem.value.descripcion,
        precioVenta: this.formItem.value.precioVenta
      };

      this.itemService.registrarServicio(dtoServicio).subscribe(() => {
        this.confirmacion('registrado');
        this.cerrarModal();
        this.listarItems();
      });
    }
  }

  actualizarItem() {
    if (this.formItem.invalid || this.id === null) return;

    const item = {
      nombre: this.formItem.value.nombre,
      descripcion: this.formItem.value.descripcion,
      tipo: this.modo,
      precioVenta: this.formItem.value.precioVenta,
      tieneStock: this.formItem.value.tieneStock,
      estado: 'Disponible'
    };

    this.itemService.actualizarItem(this.id, item).subscribe(() => {
      this.confirmacion('actualizado');
      this.cerrarModal();
      this.listarItems();
    });
  }

  alertaActualizar() {
    Swal.fire({
      title: '¿Deseas actualizar el ítem?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar'
    }).then(res => {
      if (res.isConfirmed) this.actualizarItem();
    });
  }

eliminarItem(id: number) {
  Swal.fire({
    title: '¿Eliminar ítem?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar'
  }).then(res => {
    if (res.isConfirmed) {
      // 1. Obtener el ítem original
      this.itemService.obtenerItemPorId(id).subscribe(item => {
        // 2. Crear objeto actualizado
        const actualizado = {
          ...item,
          estado: 'No Disponible',
          tieneStock: false // <-- Forzar a false
        };

        // 3. Enviar actualización
        this.itemService.actualizarItem(id, actualizado).subscribe(() => {
          this.confirmacion('eliminado');
          this.listarItems();
        });
      });
    }
  });
}


  confirmacion(msg: string) {
    Swal.fire({
      icon: 'success',
      title: `Ítem ${msg} correctamente`,
      timer: 1500,
      showConfirmButton: false,
      position: 'top-end'
    });
  }

  cerrarModal() {
    const modalElement = document.getElementById('modalItem');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal?.hide();

    setTimeout(() => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';

      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();
    }, 300);
  }
}
