import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/cafeteria/productos/productos.component';
import { RegistrarPedidoComponent } from './pages/cafeteria/registrar-pedido/registrar-pedido.component';
import { IncidenciasDashboardComponent } from './pages/incidencias/dashboard/incidencias-dashboard.component';
import { IncidenciasListaComponent } from './pages/incidencias/lista/incidencias-lista.component';
import { NuevaIncidenciaComponent } from './pages/incidencias/nueva/nueva-incidencia.component';
import { CursosListaComponent } from './pages/cursos/cursos-lista/cursos-lista.component';
import { MatriculaComponent } from './pages/cursos/matricula/matricula.component';
import { TareasListaComponent } from './pages/tareas/tareas-lista/tareas-lista.component';
import { NuevaTareaComponent } from './pages/tareas/nueva-tarea/nueva-tarea.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cafeteria/productos', component: ProductosComponent },
  { path: 'cafeteria/pedido', component: RegistrarPedidoComponent },
  { path: 'incidencias/dashboard', component: IncidenciasDashboardComponent },
  { path: 'incidencias/lista', component: IncidenciasListaComponent },
  { path: 'incidencias/nueva', component: NuevaIncidenciaComponent },
  { path: 'cursos', component: CursosListaComponent },
  { path: 'cursos/matricula', component: MatriculaComponent },
  { path: 'tareas', component: TareasListaComponent },
  { path: 'tareas/nueva', component: NuevaTareaComponent },
  { path: '**', redirectTo: '' }
];
