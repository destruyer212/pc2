import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TareaService } from '../../../services/tarea.service';
import { PrioridadTarea } from '../../../models/tarea.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { SubnavComponent } from '../../../shared/components/subnav/subnav.component';

@Component({
  selector: 'app-nueva-tarea',
  imports: [FormsModule, RouterLink, PageHeaderComponent, SubnavComponent],
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
  enviando = false;

  readonly subnav = [
    { label: 'Mis tareas', path: '/tareas' },
    { label: 'Nueva tarea', path: '/tareas/nueva' }
  ];

  constructor(private tareaService: TareaService) {}

  enviar(): void {
    this.mensaje = '';
    this.error = '';
    this.enviando = true;

    this.tareaService.crear({
      titulo: this.titulo.trim(),
      curso: this.curso.trim(),
      fechaEntrega: this.fechaEntrega,
      estado: this.estado.trim(),
      prioridad: this.prioridad
    }).subscribe({
      next: () => {
        this.mensaje = 'Tarea registrada correctamente.';
        this.titulo = '';
        this.curso = '';
        this.fechaEntrega = '';
        this.estado = 'Pendiente';
        this.prioridad = 'MEDIA';
        this.enviando = false;
      },
      error: () => {
        this.error = 'Error al registrar la tarea.';
        this.enviando = false;
      }
    });
  }
}
