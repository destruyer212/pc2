import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso.model';

@Component({
  selector: 'app-matricula',
  imports: [FormsModule],
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

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.cursoService.listar().subscribe({
      next: (data) => (this.cursos = data.filter(c => c.vacantes > 0)),
      error: () => (this.error = 'Error al cargar cursos.')
    });
  }

  enviar(): void {
    this.mensaje = '';
    this.error = '';

    if (!this.nombreEstudiante || !this.codigoEstudiante || !this.cursoId) {
      this.error = 'Complete todos los campos.';
      return;
    }

    this.cursoService.matricular({
      nombreEstudiante: this.nombreEstudiante,
      codigoEstudiante: this.codigoEstudiante,
      cursoId: this.cursoId
    }).subscribe({
      next: () => {
        this.mensaje = 'Matrícula registrada correctamente.';
        this.nombreEstudiante = '';
        this.codigoEstudiante = '';
        this.cursoId = null;
        this.ngOnInit();
      },
      error: (err) => {
        this.error = err.error?.error ?? 'No se pudo registrar la matrícula.';
      }
    });
  }
}
