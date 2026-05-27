package com.utp.pc2.incidencias.dto;

import com.utp.pc2.incidencias.model.EstadoIncidencia;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EstadoIncidenciaRequest {

    @NotNull(message = "El estado es obligatorio")
    private EstadoIncidencia estado;
}
