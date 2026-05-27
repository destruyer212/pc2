package com.utp.pc2.incidencias.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IncidenciaRequest {

    @NotBlank(message = "El aula es obligatoria")
    private String aula;

    @NotBlank(message = "El equipo es obligatorio")
    private String equipo;

    @NotBlank(message = "El tipo es obligatorio")
    private String tipo;

    @NotBlank(message = "La descripción es obligatoria")
    private String descripcion;
}
