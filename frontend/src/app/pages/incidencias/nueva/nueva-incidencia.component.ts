import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IncidenciaService } from '../../../services/incidencia.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { SubnavComponent } from '../../../shared/components/subnav/subnav.component';

@Component({
  selector: 'app-nueva-incidencia',
  imports: [FormsModule, RouterLink, PageHeaderComponent, SubnavComponent],
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
  enviando = false;

  readonly subnav = [
    { label: 'Dashboard', path: '/incidencias/dashboard' },
    { label: 'Lista', path: '/incidencias/lista' },
    { label: 'Nueva', path: '/incidencias/nueva' }
  ];

  constructor(private incidenciaService: IncidenciaService) {}

  enviar(): void {
    this.mensaje = '';
    this.error = '';
    this.enviando = true;

    this.incidenciaService.registrar({
      aula: this.aula.trim(),
      equipo: this.equipo.trim(),
      tipo: this.tipo.trim(),
      descripcion: this.descripcion.trim()
    }).subscribe({
      next: () => {
        this.mensaje = 'Incidencia registrada correctamente.';
        this.aula = '';
        this.equipo = '';
        this.tipo = '';
        this.descripcion = '';
        this.enviando = false;
      },
      error: () => {
        this.error = 'Error al registrar la incidencia. Verifica la conexión con el backend.';
        this.enviando = false;
      }
    });
  }
}
