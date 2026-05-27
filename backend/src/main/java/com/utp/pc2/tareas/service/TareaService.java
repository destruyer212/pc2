package com.utp.pc2.tareas.service;

import com.utp.pc2.common.exception.ResourceNotFoundException;
import com.utp.pc2.tareas.dto.TareaRequest;
import com.utp.pc2.tareas.model.Tarea;
import com.utp.pc2.tareas.repository.TareaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TareaService {

    private final TareaRepository tareaRepository;

    public List<Tarea> listarTodas() {
        return tareaRepository.findAll();
    }

    public Tarea crear(TareaRequest request) {
        Tarea tarea = Tarea.builder()
                .titulo(request.getTitulo())
                .curso(request.getCurso())
                .fechaEntrega(request.getFechaEntrega())
                .estado(request.getEstado())
                .prioridad(request.getPrioridad())
                .build();

        return tareaRepository.save(tarea);
    }

    public Tarea actualizar(Long id, TareaRequest request) {
        Tarea tarea = tareaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada con id: " + id));

        tarea.setTitulo(request.getTitulo());
        tarea.setCurso(request.getCurso());
        tarea.setFechaEntrega(request.getFechaEntrega());
        tarea.setEstado(request.getEstado());
        tarea.setPrioridad(request.getPrioridad());

        return tareaRepository.save(tarea);
    }

    public void eliminar(Long id) {
        if (!tareaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Tarea no encontrada con id: " + id);
        }
        tareaRepository.deleteById(id);
    }
}
