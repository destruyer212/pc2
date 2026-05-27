import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TareaService } from '../../../services/tarea.service';
import { PrioridadTarea, Tarea, TareaRequest } from '../../../models/tarea.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { SubnavComponent } from '../../../shared/components/subnav/subnav.component';

@Component({
  selector: 'app-tareas-lista',
  imports: [DatePipe, FormsModule, RouterLink, PageHeaderComponent, SubnavComponent],
  templateUrl: './tareas-lista.component.html',
  styleUrl: './tareas-lista.component.css'
})
export class TareasListaComponent implements OnInit {
  tareas: Tarea[] = [];
  loading = true;
  error = '';
  mensaje = '';
  editando: Tarea | null = null;
  formEdicion: TareaRequest = this.formularioVacio();
  guardando = false;

  readonly subnav = [
    { label: 'Mis tareas', path: '/tareas' },
    { label: 'Nueva tarea', path: '/tareas/nueva' }
  ];

  constructor(private tareaService: TareaService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.tareaService.listar().subscribe({
      next: (data) => {
        this.tareas = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar tareas.';
        this.loading = false;
      }
    });
  }

  esVencida(fecha: string): boolean {
    return new Date(fecha) < new Date(new Date().toDateString());
  }

  esUrgente(prioridad: PrioridadTarea): boolean {
    return prioridad === 'URGENTE';
  }

  badgePrioridad(prioridad: PrioridadTarea): string {
    const map: Record<PrioridadTarea, string> = {
      BAJA: 'badge badge-prioridad-baja',
      MEDIA: 'badge badge-prioridad-media',
      ALTA: 'badge badge-prioridad-alta',
      URGENTE: 'badge badge-prioridad-urgente'
    };
    return map[prioridad] ?? 'badge badge-neutral';
  }

  iniciarEdicion(tarea: Tarea): void {
    this.editando = tarea;
    this.formEdicion = {
      titulo: tarea.titulo,
      curso: tarea.curso,
      fechaEntrega: tarea.fechaEntrega,
      estado: tarea.estado,
      prioridad: tarea.prioridad
    };
  }

  cancelarEdicion(): void {
    this.editando = null;
  }

  guardarEdicion(): void {
    if (!this.editando) return;

    this.guardando = true;
    this.tareaService.actualizar(this.editando.id, this.formEdicion).subscribe({
      next: () => {
        this.mensaje = 'Tarea actualizada correctamente.';
        this.editando = null;
        this.guardando = false;
        this.cargar();
      },
      error: () => {
        this.error = 'No se pudo actualizar la tarea.';
        this.guardando = false;
      }
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar esta tarea?')) return;

    this.tareaService.eliminar(id).subscribe({
      next: () => {
        this.mensaje = 'Tarea eliminada correctamente.';
        this.cargar();
      },
      error: () => (this.error = 'No se pudo eliminar la tarea.')
    });
  }

  private formularioVacio(): TareaRequest {
    return {
      titulo: '',
      curso: '',
      fechaEntrega: '',
      estado: 'Pendiente',
      prioridad: 'MEDIA'
    };
  }
}
