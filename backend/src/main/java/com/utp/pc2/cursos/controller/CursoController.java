package com.utp.pc2.cursos.controller;

import com.utp.pc2.cursos.dto.MatriculaRequest;
import com.utp.pc2.cursos.model.Curso;
import com.utp.pc2.cursos.model.Matricula;
import com.utp.pc2.cursos.service.CursoService;
import com.utp.pc2.cursos.service.MatriculaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CursoController {

    private final CursoService cursoService;
    private final MatriculaService matriculaService;

    @GetMapping("/cursos")
    public List<Curso> listarCursos() {
        return cursoService.listarTodos();
    }

    @GetMapping("/cursos/{id}")
    public Curso obtenerCurso(@PathVariable Long id) {
        return cursoService.obtenerPorId(id);
    }

    @PostMapping("/matriculas")
    public ResponseEntity<Matricula> registrarMatricula(@Valid @RequestBody MatriculaRequest request) {
        Matricula matricula = matriculaService.registrar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(matricula);
    }
}
