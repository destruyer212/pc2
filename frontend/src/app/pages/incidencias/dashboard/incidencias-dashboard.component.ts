import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IncidenciaService } from '../../../services/incidencia.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { SubnavComponent } from '../../../shared/components/subnav/subnav.component';

@Component({
  selector: 'app-incidencias-dashboard',
  imports: [RouterLink, PageHeaderComponent, SubnavComponent],
  templateUrl: './incidencias-dashboard.component.html',
  styleUrl: './incidencias-dashboard.component.css'
})
export class IncidenciasDashboardComponent implements OnInit {
  total = 0;
  loading = true;
  error = '';

  readonly subnav = [
    { label: 'Dashboard', path: '/incidencias/dashboard' },
    { label: 'Lista', path: '/incidencias/lista' },
    { label: 'Nueva', path: '/incidencias/nueva' }
  ];

  constructor(private incidenciaService: IncidenciaService) {}

  ngOnInit(): void {
    this.incidenciaService.total().subscribe({
      next: (data) => {
        this.total = data.total;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error de conexión con la API de incidencias.';
        this.loading = false;
      }
    });
  }
}
