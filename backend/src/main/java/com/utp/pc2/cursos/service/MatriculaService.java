package com.utp.pc2.cursos.service;

import com.utp.pc2.common.exception.ResourceNotFoundException;
import com.utp.pc2.cursos.dto.MatriculaRequest;
import com.utp.pc2.cursos.model.Curso;
import com.utp.pc2.cursos.model.Matricula;
import com.utp.pc2.cursos.repository.CursoRepository;
import com.utp.pc2.cursos.repository.MatriculaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MatriculaService {

    private final MatriculaRepository matriculaRepository;
    private final CursoRepository cursoRepository;

    @Transactional
    public Matricula registrar(MatriculaRequest request) {
        Curso curso = cursoRepository.findById(request.getCursoId())
                .orElseThrow(() -> new ResourceNotFoundException("Curso no encontrado con id: " + request.getCursoId()));

        if (curso.getVacantes() <= 0) {
            throw new IllegalArgumentException("No hay vacantes disponibles para el curso: " + curso.getNombre());
        }

        curso.setVacantes(curso.getVacantes() - 1);
        cursoRepository.save(curso);

        Matricula matricula = Matricula.builder()
                .nombreEstudiante(request.getNombreEstudiante())
                .codigoEstudiante(request.getCodigoEstudiante())
                .curso(curso)
                .estado("Registrada")
                .build();

        return matriculaRepository.save(matricula);
    }
}
