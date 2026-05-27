import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tarea, TareaRequest } from '../models/tarea.model';

@Injectable({ providedIn: 'root' })
export class TareaService {
  private readonly baseUrl = `${environment.apiUrl}/tareas`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.baseUrl);
  }

  crear(tarea: TareaRequest): Observable<Tarea> {
    return this.http.post<Tarea>(this.baseUrl, tarea);
  }

  actualizar(id: number, tarea: TareaRequest): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.baseUrl}/${id}`, tarea);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
