import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Curso, MatriculaRequest } from '../models/curso.model';

@Injectable({ providedIn: 'root' })
export class CursoService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  listar(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.baseUrl}/cursos`);
  }

  obtener(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.baseUrl}/cursos/${id}`);
  }

  matricular(request: MatriculaRequest): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/matriculas`, request);
  }
}
