import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IncidenciaService } from '../../../services/incidencia.service';

@Component({
  selector: 'app-nueva-incidencia',
  imports: [FormsModule],
  templateUrl: './nueva-incidencia.component.html',
  styleUrl: './nueva-incidencia.component.css'
})
export class NuevaIncidenciaComponent {
  aula = '';
  equipo = '';
  tipo = '';
  descripcion = '';
  mensaje = '';
  error = '';

  constructor(private incidenciaService: IncidenciaService) {}

  enviar(): void {
    this.mensaje = '';
    this.error = '';

    this.incidenciaService.registrar({
      aula: this.aula,
      equipo: this.equipo,
      tipo: this.tipo,
      descripcion: this.descripcion
    }).subscribe({
      next: () => {
        this.mensaje = 'Incidencia registrada correctamente.';
        this.aula = '';
        this.equipo = '';
        this.tipo = '';
        this.descripcion = '';
      },
      error: () => (this.error = 'Error al registrar la incidencia.')
    });
  }
}
