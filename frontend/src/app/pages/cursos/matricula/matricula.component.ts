import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { SubnavComponent } from '../../../shared/components/subnav/subnav.component';

@Component({
  selector: 'app-matricula',
  imports: [FormsModule, RouterLink, PageHeaderComponent, SubnavComponent],
  templateUrl: './matricula.component.html',
  styleUrl: './matricula.component.css'
})
export class MatriculaComponent implements OnInit {
  cursos: Curso[] = [];
  nombreEstudiante = '';
  codigoEstudiante = '';
  cursoId: number | null = null;
  mensaje = '';
  error = '';
  loading = true;
  enviando = false;

  readonly subnav = [
    { label: 'Cursos', path: '/cursos' },
    { label: 'Matrícula', path: '/cursos/matricula' }
  ];

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(): void {
    this.loading = true;
    this.cursoService.listar().subscribe({
      next: (data) => {
        this.cursos = data.filter(c => c.vacantes > 0);
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar cursos.';
        this.loading = false;
      }
    });
  }

  enviar(): void {
    this.mensaje = '';
    this.error = '';

    if (!this.nombreEstudiante.trim() || !this.codigoEstudiante.trim() || !this.cursoId) {
      this.error = 'Complete todos los campos obligatorios.';
      return;
    }

    this.enviando = true;
    this.cursoService.matricular({
      nombreEstudiante: this.nombreEstudiante.trim(),
      codigoEstudiante: this.codigoEstudiante.trim(),
      cursoId: this.cursoId
    }).subscribe({
      next: () => {
        this.mensaje = '¡Matrícula registrada correctamente!';
        this.nombreEstudiante = '';
        this.codigoEstudiante = '';
        this.cursoId = null;
        this.enviando = false;
        this.cargarCursos();
      },
      error: (err) => {
        this.error = err.error?.error ?? 'No se pudo registrar la matrícula.';
        this.enviando = false;
      }
    });
  }
}
