package com.utp.pc2.tareas.repository;

import com.utp.pc2.tareas.model.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TareaRepository extends JpaRepository<Tarea, Long> {
}
