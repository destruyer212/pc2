package com.utp.pc2.config;

import com.utp.pc2.cafeteria.model.Producto;
import com.utp.pc2.cafeteria.repository.ProductoRepository;
import com.utp.pc2.cursos.model.Curso;
import com.utp.pc2.cursos.repository.CursoRepository;
import com.utp.pc2.incidencias.model.EstadoIncidencia;
import com.utp.pc2.incidencias.model.Incidencia;
import com.utp.pc2.incidencias.repository.IncidenciaRepository;
import com.utp.pc2.tareas.model.PrioridadTarea;
import com.utp.pc2.tareas.model.Tarea;
import com.utp.pc2.tareas.repository.TareaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
@Profile("h2")
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ProductoRepository productoRepository;
    private final IncidenciaRepository incidenciaRepository;
    private final CursoRepository cursoRepository;
    private final TareaRepository tareaRepository;

    @Override
    public void run(String... args) {
        if (productoRepository.count() == 0) {
            productoRepository.save(Producto.builder()
                    .nombre("Café Americano").categoria("Bebidas").precio(new BigDecimal("5.50")).stock(20).build());
            productoRepository.save(Producto.builder()
                    .nombre("Sandwich Mixto").categoria("Snacks").precio(new BigDecimal("8.00")).stock(15).build());
            productoRepository.save(Producto.builder()
                    .nombre("Jugo de Naranja").categoria("Bebidas").precio(new BigDecimal("4.00")).stock(0).build());
            productoRepository.save(Producto.builder()
                    .nombre("Galletas").categoria("Snacks").precio(new BigDecimal("2.50")).stock(30).build());
        }

        if (incidenciaRepository.count() == 0) {
            incidenciaRepository.save(Incidencia.builder()
                    .aula("Lab 301").equipo("PC-12").tipo("Hardware")
                    .descripcion("La PC no enciende").estado(EstadoIncidencia.PENDIENTE).build());
            incidenciaRepository.save(Incidencia.builder()
                    .aula("Lab 302").equipo("Proyector").tipo("Software")
                    .descripcion("No proyecta imagen").estado(EstadoIncidencia.EN_PROCESO).build());
        }

        if (cursoRepository.count() == 0) {
            cursoRepository.save(Curso.builder()
                    .codigo("ISW-321").nombre("Desarrollo Web").docente("Dr. Pérez").creditos(4).vacantes(30).build());
            cursoRepository.save(Curso.builder()
                    .codigo("ISW-322").nombre("Bases de Datos").docente("Mg. López").creditos(4).vacantes(25).build());
            cursoRepository.save(Curso.builder()
                    .codigo("ISW-323").nombre("Arquitectura de Software").docente("Dr. Ruiz").creditos(3).vacantes(20).build());
        }

        if (tareaRepository.count() == 0) {
            tareaRepository.save(Tarea.builder()
                    .titulo("Proyecto Angular").curso("Desarrollo Web")
                    .fechaEntrega(LocalDate.now().minusDays(2)).estado("Pendiente").prioridad(PrioridadTarea.URGENTE).build());
            tareaRepository.save(Tarea.builder()
                    .titulo("Modelo ER").curso("Bases de Datos")
                    .fechaEntrega(LocalDate.now().plusDays(5)).estado("En progreso").prioridad(PrioridadTarea.MEDIA).build());
            tareaRepository.save(Tarea.builder()
                    .titulo("Diagrama UML").curso("Arquitectura de Software")
                    .fechaEntrega(LocalDate.now().plusDays(10)).estado("Pendiente").prioridad(PrioridadTarea.BAJA).build());
        }
    }
}
