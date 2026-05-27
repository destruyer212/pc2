package com.utp.pc2.tareas.dto;

import com.utp.pc2.tareas.model.PrioridadTarea;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class TareaRequest {

    @NotBlank(message = "El título es obligatorio")
    private String titulo;

    @NotBlank(message = "El curso es obligatorio")
    private String curso;

    @NotNull(message = "La fecha de entrega es obligatoria")
    private LocalDate fechaEntrega;

    @NotBlank(message = "El estado es obligatorio")
    private String estado;

    @NotNull(message = "La prioridad es obligatoria")
    private PrioridadTarea prioridad;
}
