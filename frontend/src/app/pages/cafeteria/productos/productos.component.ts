import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-productos',
  imports: [CurrencyPipe],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  error = '';

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.listar().subscribe({
      next: (data) => (this.productos = data),
      error: () => (this.error = 'No se pudo conectar con la API de productos.')
    });
  }
}
