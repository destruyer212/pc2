import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EstadoIncidencia, Incidencia, IncidenciaRequest } from '../models/incidencia.model';

@Injectable({ providedIn: 'root' })
export class IncidenciaService {
  private readonly baseUrl = `${environment.apiUrl}/incidencias`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Incidencia[]> {
    return this.http.get<Incidencia[]>(this.baseUrl);
  }

  total(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.baseUrl}/total`);
  }

  registrar(incidencia: IncidenciaRequest): Observable<Incidencia> {
    return this.http.post<Incidencia>(this.baseUrl, incidencia);
  }

  actualizarEstado(id: number, estado: EstadoIncidencia): Observable<Incidencia> {
    return this.http.put<Incidencia>(`${this.baseUrl}/${id}/estado`, { estado });
  }
}
