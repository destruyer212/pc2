package com.utp.pc2.cursos.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MatriculaRequest {

    @NotBlank(message = "El nombre del estudiante es obligatorio")
    private String nombreEstudiante;

    @NotBlank(message = "El código del estudiante es obligatorio")
    private String codigoEstudiante;

    @NotNull(message = "El curso es obligatorio")
    private Long cursoId;
}
