export interface Curso {
  id: number;
  codigo: string;
  nombre: string;
  docente: string;
  creditos: number;
  vacantes: number;
}

export interface MatriculaRequest {
  nombreEstudiante: string;
  codigoEstudiante: string;
  cursoId: number;
}
