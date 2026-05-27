package com.utp.pc2.incidencias.controller;

import com.utp.pc2.incidencias.dto.EstadoIncidenciaRequest;
import com.utp.pc2.incidencias.dto.IncidenciaRequest;
import com.utp.pc2.incidencias.model.Incidencia;
import com.utp.pc2.incidencias.service.IncidenciaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/incidencias")
@RequiredArgsConstructor
public class IncidenciaController {

    private final IncidenciaService incidenciaService;

    @GetMapping
    public List<Incidencia> listar() {
        return incidenciaService.listarTodas();
    }

    @GetMapping("/total")
    public Map<String, Long> total() {
        return Map.of("total", incidenciaService.contarTotal());
    }

    @PostMapping
    public ResponseEntity<Incidencia> registrar(@Valid @RequestBody IncidenciaRequest request) {
        Incidencia incidencia = incidenciaService.registrar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(incidencia);
    }

    @PutMapping("/{id}/estado")
    public Incidencia actualizarEstado(@PathVariable Long id,
                                       @Valid @RequestBody EstadoIncidenciaRequest request) {
        return incidenciaService.actualizarEstado(id, request);
    }
}
