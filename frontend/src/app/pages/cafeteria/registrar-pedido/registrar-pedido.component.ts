import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-registrar-pedido',
  imports: [FormsModule],
  templateUrl: './registrar-pedido.component.html',
  styleUrl: './registrar-pedido.component.css'
})
export class RegistrarPedidoComponent implements OnInit {
  productos: Producto[] = [];
  nombreEstudiante = '';
  productoId: number | null = null;
  cantidad = 1;
  observacion = '';
  mensaje = '';
  error = '';

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.listar().subscribe({
      next: (data) => (this.productos = data.filter(p => p.stock > 0)),
      error: () => (this.error = 'Error al cargar productos.')
    });
  }

  enviar(): void {
    this.mensaje = '';
    this.error = '';

    if (!this.nombreEstudiante || !this.productoId || this.cantidad < 1) {
      this.error = 'Complete todos los campos obligatorios.';
      return;
    }

    this.productoService.registrarPedido({
      nombreEstudiante: this.nombreEstudiante,
      productoId: this.productoId,
      cantidad: this.cantidad,
      observacion: this.observacion
    }).subscribe({
      next: () => {
        this.mensaje = 'Pedido registrado correctamente.';
        this.nombreEstudiante = '';
        this.productoId = null;
        this.cantidad = 1;
        this.observacion = '';
        this.ngOnInit();
      },
      error: (err) => {
        this.error = err.error?.error ?? 'No se pudo registrar el pedido.';
      }
    });
  }
}
