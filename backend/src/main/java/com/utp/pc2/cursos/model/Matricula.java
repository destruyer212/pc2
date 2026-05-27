package com.utp.pc2.cursos.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "matriculas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Matricula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombreEstudiante;

    @Column(nullable = false)
    private String codigoEstudiante;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "curso_id", nullable = false)
    private Curso curso;

    @Column(nullable = false)
    private String estado;
}
