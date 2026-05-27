package com.utp.pc2.tareas.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "tareas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tarea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String curso;

    @Column(nullable = false)
    private LocalDate fechaEntrega;

    @Column(nullable = false)
    private String estado;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PrioridadTarea prioridad;
}
