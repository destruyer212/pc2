package com.utp.pc2.incidencias.service;

import com.utp.pc2.common.exception.ResourceNotFoundException;
import com.utp.pc2.incidencias.dto.EstadoIncidenciaRequest;
import com.utp.pc2.incidencias.dto.IncidenciaRequest;
import com.utp.pc2.incidencias.model.EstadoIncidencia;
import com.utp.pc2.incidencias.model.Incidencia;
import com.utp.pc2.incidencias.repository.IncidenciaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IncidenciaService {

    private final IncidenciaRepository incidenciaRepository;

    public List<Incidencia> listarTodas() {
        return incidenciaRepository.findAll();
    }

    public long contarTotal() {
        return incidenciaRepository.count();
    }

    public Incidencia registrar(IncidenciaRequest request) {
        Incidencia incidencia = Incidencia.builder()
                .aula(request.getAula())
                .equipo(request.getEquipo())
                .tipo(request.getTipo())
                .descripcion(request.getDescripcion())
                .estado(EstadoIncidencia.PENDIENTE)
                .build();

        return incidenciaRepository.save(incidencia);
    }

    public Incidencia actualizarEstado(Long id, EstadoIncidenciaRequest request) {
        Incidencia incidencia = incidenciaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Incidencia no encontrada con id: " + id));

        incidencia.setEstado(request.getEstado());
        return incidenciaRepository.save(incidencia);
    }
}
