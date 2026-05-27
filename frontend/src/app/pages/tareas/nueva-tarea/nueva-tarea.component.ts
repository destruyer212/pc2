import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TareaService } from '../../../services/tarea.service';
import { PrioridadTarea } from '../../../models/tarea.model';

@Component({
  selector: 'app-nueva-tarea',
  imports: [FormsModule],
  templateUrl: './nueva-tarea.component.html',
  styleUrl: './nueva-tarea.component.css'
})
export class NuevaTareaComponent {
  titulo = '';
  curso = '';
  fechaEntrega = '';
  estado = 'Pendiente';
  prioridad: PrioridadTarea = 'MEDIA';
  mensaje = '';
  error = '';

  constructor(private tareaService: TareaService) {}

  enviar(): void {
    this.mensaje = '';
    this.error = '';

    this.tareaService.crear({
      titulo: this.titulo,
      curso: this.curso,
      fechaEntrega: this.fechaEntrega,
      estado: this.estado,
      prioridad: this.prioridad
    }).subscribe({
      next: () => {
        this.mensaje = 'Tarea registrada correctamente.';
        this.titulo = '';
        this.curso = '';
        this.fechaEntrega = '';
        this.estado = 'Pendiente';
        this.prioridad = 'MEDIA';
      },
      error: () => (this.error = 'Error al registrar la tarea.')
    });
  }
}
