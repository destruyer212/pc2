import { Component, OnInit } from '@angular/core';
import { IncidenciaService } from '../../../services/incidencia.service';

@Component({
  selector: 'app-incidencias-dashboard',
  templateUrl: './incidencias-dashboard.component.html',
  styleUrl: './incidencias-dashboard.component.css'
})
export class IncidenciasDashboardComponent implements OnInit {
  total = 0;
  error = '';

  constructor(private incidenciaService: IncidenciaService) {}

  ngOnInit(): void {
    this.incidenciaService.total().subscribe({
      next: (data) => (this.total = data.total),
      error: () => (this.error = 'Error de conexión con la API.')
    });
  }
}
