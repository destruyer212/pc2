package com.utp.pc2.cursos.service;

import com.utp.pc2.common.exception.ResourceNotFoundException;
import com.utp.pc2.cursos.model.Curso;
import com.utp.pc2.cursos.repository.CursoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CursoService {

    private final CursoRepository cursoRepository;

    public List<Curso> listarTodos() {
        return cursoRepository.findAll();
    }

    public Curso obtenerPorId(Long id) {
        return cursoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Curso no encontrado con id: " + id));
    }
}
