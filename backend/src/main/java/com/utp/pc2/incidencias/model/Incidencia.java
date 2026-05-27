package com.utp.pc2.incidencias.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "incidencias")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Incidencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String aula;

    @Column(nullable = false)
    private String equipo;

    @Column(nullable = false)
    private String tipo;

    @Column(nullable = false, length = 500)
    private String descripcion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoIncidencia estado;
}
