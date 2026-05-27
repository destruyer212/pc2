import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PedidoRequest, Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/productos`);
  }

  obtener(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}/productos/${id}`);
  }

  registrarPedido(pedido: PedidoRequest): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/pedidos`, pedido);
  }
}
