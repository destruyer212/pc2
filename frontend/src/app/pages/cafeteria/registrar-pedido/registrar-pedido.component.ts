import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { SubnavComponent } from '../../../shared/components/subnav/subnav.component';

@Component({
  selector: 'app-registrar-pedido',
  imports: [FormsModule, RouterLink, PageHeaderComponent, SubnavComponent],
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
  loading = true;
  enviando = false;

  readonly subnav = [
    { label: 'Productos', path: '/cafeteria/productos' },
    { label: 'Registrar pedido', path: '/cafeteria/pedido' }
  ];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.loading = true;
    this.productoService.listar().subscribe({
      next: (data) => {
        this.productos = data.filter(p => p.stock > 0);
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar productos desde la API.';
        this.loading = false;
      }
    });
  }

  enviar(): void {
    this.mensaje = '';
    this.error = '';

    if (!this.nombreEstudiante.trim() || !this.productoId || this.cantidad < 1) {
      this.error = 'Complete todos los campos obligatorios correctamente.';
      return;
    }

    this.enviando = true;
    this.productoService.registrarPedido({
      nombreEstudiante: this.nombreEstudiante.trim(),
      productoId: this.productoId,
      cantidad: this.cantidad,
      observacion: this.observacion.trim() || undefined
    }).subscribe({
      next: () => {
        this.mensaje = '¡Pedido registrado correctamente en Supabase!';
        this.nombreEstudiante = '';
        this.productoId = null;
        this.cantidad = 1;
        this.observacion = '';
        this.enviando = false;
        this.cargarProductos();
      },
      error: (err) => {
        this.error = err.error?.error ?? 'No se pudo registrar el pedido.';
        this.enviando = false;
      }
    });
  }
}
