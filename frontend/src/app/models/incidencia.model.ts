export type EstadoIncidencia = 'PENDIENTE' | 'EN_PROCESO' | 'ATENDIDA';

export interface Incidencia {
  id: number;
  aula: string;
  equipo: string;
  tipo: string;
  descripcion: string;
  estado: EstadoIncidencia;
}

export interface IncidenciaRequest {
  aula: string;
  equipo: string;
  tipo: string;
  descripcion: string;
}
