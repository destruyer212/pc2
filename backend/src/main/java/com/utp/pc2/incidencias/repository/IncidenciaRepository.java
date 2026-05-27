package com.utp.pc2.incidencias.repository;

import com.utp.pc2.incidencias.model.Incidencia;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncidenciaRepository extends JpaRepository<Incidencia, Long> {
}
