import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IncidenciaService } from '../../../services/incidencia.service';
import { EstadoIncidencia, Incidencia } from '../../../models/incidencia.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { SubnavComponent } from '../../../shared/components/subnav/subnav.component';

@Component({
  selector: 'app-incidencias-lista',
  imports: [RouterLink, PageHeaderComponent, SubnavComponent],
  templateUrl: './incidencias-lista.component.html',
  styleUrl: './incidencias-lista.component.css'
})
export class IncidenciasListaComponent implements OnInit {
  incidencias: Incidencia[] = [];
  loading = true;
  error = '';
  mensaje = '';
  actualizandoId: number | null = null;

  readonly subnav = [
    { label: 'Dashboard', path: '/incidencias/dashboard' },
    { label: 'Lista', path: '/incidencias/lista' },
    { label: 'Nueva', path: '/incidencias/nueva' }
  ];

  constructor(private incidenciaService: IncidenciaService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.incidenciaService.listar().subscribe({
      next: (data) => {
        this.incidencias = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la lista de incidencias.';
        this.loading = false;
      }
    });
  }

  cambiarEstado(id: number, estado: EstadoIncidencia): void {
    this.actualizandoId = id;
    this.mensaje = '';
    this.error = '';

    this.incidenciaService.actualizarEstado(id, estado).subscribe({
      next: () => {
        this.mensaje = 'Estado actualizado correctamente.';
        this.actualizandoId = null;
        this.cargar();
      },
      error: () => {
        this.error = 'No se pudo actualizar el estado.';
        this.actualizandoId = null;
      }
    });
  }

  badgeEstado(estado: EstadoIncidencia): string {
    switch (estado) {
      case 'PENDIENTE': return 'badge badge-pendiente';
      case 'EN_PROCESO': return 'badge badge-proceso';
      case 'ATENDIDA': return 'badge badge-atendida';
      default: return 'badge badge-neutral';
    }
  }

  etiquetaEstado(estado: EstadoIncidencia): string {
    switch (estado) {
      case 'PENDIENTE': return 'Pendiente';
      case 'EN_PROCESO': return 'En proceso';
      case 'ATENDIDA': return 'Atendida';
      default: return estado;
    }
  }
}
