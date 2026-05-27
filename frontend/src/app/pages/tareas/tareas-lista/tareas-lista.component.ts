import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TareaService } from '../../../services/tarea.service';
import { PrioridadTarea, Tarea, TareaRequest } from '../../../models/tarea.model';

@Component({
  selector: 'app-tareas-lista',
  imports: [DatePipe, FormsModule],
  templateUrl: './tareas-lista.component.html',
  styleUrl: './tareas-lista.component.css'
})
export class TareasListaComponent implements OnInit {
  tareas: Tarea[] = [];
  error = '';
  mensaje = '';
  editando: Tarea | null = null;
  formEdicion: TareaRequest = this.formularioVacio();

  constructor(private tareaService: TareaService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.tareaService.listar().subscribe({
      next: (data) => (this.tareas = data),
      error: () => (this.error = 'Error al cargar tareas.')
    });
  }

  esVencida(fecha: string): boolean {
    return new Date(fecha) < new Date(new Date().toDateString());
  }

  esUrgente(prioridad: PrioridadTarea): boolean {
    return prioridad === 'URGENTE';
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

  guardarEdicion(): void {
    if (!this.editando) return;

    this.tareaService.actualizar(this.editando.id, this.formEdicion).subscribe({
      next: () => {
        this.mensaje = 'Tarea actualizada correctamente.';
        this.editando = null;
        this.cargar();
      },
      error: () => (this.error = 'No se pudo actualizar la tarea.')
    });
  }

  eliminar(id: number): void {
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
