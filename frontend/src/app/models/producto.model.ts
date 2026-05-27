export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
}

export interface PedidoRequest {
  nombreEstudiante: string;
  productoId: number;
  cantidad: number;
  observacion?: string;
}
