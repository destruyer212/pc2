import { Component, OnInit } from '@angular/core';
import { IncidenciaService } from '../../../services/incidencia.service';
import { EstadoIncidencia, Incidencia } from '../../../models/incidencia.model';

@Component({
  selector: 'app-incidencias-lista',
  templateUrl: './incidencias-lista.component.html',
  styleUrl: './incidencias-lista.component.css'
})
export class IncidenciasListaComponent implements OnInit {
  incidencias: Incidencia[] = [];
  error = '';
  mensaje = '';

  constructor(private incidenciaService: IncidenciaService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.incidenciaService.listar().subscribe({
      next: (data) => (this.incidencias = data),
      error: () => (this.error = 'No se pudo cargar la lista de incidencias.')
    });
  }

  cambiarEstado(id: number, estado: EstadoIncidencia): void {
    this.incidenciaService.actualizarEstado(id, estado).subscribe({
      next: () => {
        this.mensaje = 'Estado actualizado correctamente.';
        this.cargar();
      },
      error: () => (this.error = 'No se pudo actualizar el estado.')
    });
  }

  claseEstado(estado: EstadoIncidencia): string {
    switch (estado) {
      case 'PENDIENTE': return 'estado-pendiente';
      case 'EN_PROCESO': return 'estado-proceso';
      case 'ATENDIDA': return 'estado-atendida';
      default: return '';
    }
  }
}
