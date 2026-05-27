import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { SubnavComponent } from '../../../shared/components/subnav/subnav.component';

@Component({
  selector: 'app-productos',
  imports: [CurrencyPipe, RouterLink, PageHeaderComponent, SubnavComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  loading = true;
  error = '';

  readonly subnav = [
    { label: 'Productos', path: '/cafeteria/productos' },
    { label: 'Registrar pedido', path: '/cafeteria/pedido' }
  ];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.listar().subscribe({
      next: (data) => {
        this.productos = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo conectar con la API. Verifica que el backend esté en ejecución.';
        this.loading = false;
      }
    });
  }
}
