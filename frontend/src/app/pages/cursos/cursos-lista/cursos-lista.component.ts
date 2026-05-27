import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { SubnavComponent } from '../../../shared/components/subnav/subnav.component';

@Component({
  selector: 'app-cursos-lista',
  imports: [RouterLink, PageHeaderComponent, SubnavComponent],
  templateUrl: './cursos-lista.component.html',
  styleUrl: './cursos-lista.component.css'
})
export class CursosListaComponent implements OnInit {
  cursos: Curso[] = [];
  loading = true;
  error = '';

  readonly subnav = [
    { label: 'Cursos', path: '/cursos' },
    { label: 'Matrícula', path: '/cursos/matricula' }
  ];

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.cursoService.listar().subscribe({
      next: (data) => {
        this.cursos = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar los cursos desde la API.';
        this.loading = false;
      }
    });
  }
}
