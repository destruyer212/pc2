import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso.model';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrl: './cursos-lista.component.css'
})
export class CursosListaComponent implements OnInit {
  cursos: Curso[] = [];
  error = '';

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.cursoService.listar().subscribe({
      next: (data) => (this.cursos = data),
      error: () => (this.error = 'Error al cargar los cursos.')
    });
  }
}
