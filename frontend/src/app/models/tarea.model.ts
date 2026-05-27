export type PrioridadTarea = 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';

export interface Tarea {
  id: number;
  titulo: string;
  curso: string;
  fechaEntrega: string;
  estado: string;
  prioridad: PrioridadTarea;
}

export interface TareaRequest {
  titulo: string;
  curso: string;
  fechaEntrega: string;
  estado: string;
  prioridad: PrioridadTarea;
}
