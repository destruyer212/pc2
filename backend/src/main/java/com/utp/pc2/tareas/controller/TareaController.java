package com.utp.pc2.tareas.controller;

import com.utp.pc2.tareas.dto.TareaRequest;
import com.utp.pc2.tareas.model.Tarea;
import com.utp.pc2.tareas.service.TareaService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tareas")
@RequiredArgsConstructor
@Tag(name = "Pregunta 4 - Tareas", description = "Gestor de tareas académicas")
public class TareaController {

    private final TareaService tareaService;

    @GetMapping
    public List<Tarea> listar() {
        return tareaService.listarTodas();
    }

    @PostMapping
    public ResponseEntity<Tarea> crear(@Valid @RequestBody TareaRequest request) {
        Tarea tarea = tareaService.crear(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(tarea);
    }

    @PutMapping("/{id}")
    public Tarea actualizar(@PathVariable Long id, @Valid @RequestBody TareaRequest request) {
        return tareaService.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        tareaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
