-- ============================================================
-- v5: Datos iniciales de prueba (seed)
-- Solo inserta si las tablas están vacías
-- Orden recomendado: v0 → v1 → v2 → v3 → v4 → v5
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS schema_migrations (
    version     VARCHAR(20)  PRIMARY KEY,
    description TEXT         NOT NULL,
    applied_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

INSERT INTO productos (nombre, categoria, precio, stock)
SELECT * FROM (VALUES
    ('Café Americano',  'Bebidas', 5.50::NUMERIC(10,2), 20),
    ('Sandwich Mixto',  'Snacks',  8.00::NUMERIC(10,2), 15),
    ('Jugo de Naranja', 'Bebidas', 4.00::NUMERIC(10,2),  0),
    ('Galletas',        'Snacks',  2.50::NUMERIC(10,2), 30)
) AS seed(nombre, categoria, precio, stock)
WHERE (SELECT COUNT(*) FROM productos) = 0;

INSERT INTO incidencias (aula, equipo, tipo, descripcion, estado)
SELECT * FROM (VALUES
    ('Lab 301', 'PC-12',     'Hardware', 'La PC no enciende',  'PENDIENTE'),
    ('Lab 302', 'Proyector', 'Software', 'No proyecta imagen', 'EN_PROCESO')
) AS seed(aula, equipo, tipo, descripcion, estado)
WHERE (SELECT COUNT(*) FROM incidencias) = 0;

INSERT INTO cursos (codigo, nombre, docente, creditos, vacantes)
SELECT * FROM (VALUES
    ('ISW-321', 'Desarrollo Web',           'Dr. Pérez', 4, 30),
    ('ISW-322', 'Bases de Datos',           'Mg. López', 4, 25),
    ('ISW-323', 'Arquitectura de Software', 'Dr. Ruiz',  3, 20)
) AS seed(codigo, nombre, docente, creditos, vacantes)
WHERE (SELECT COUNT(*) FROM cursos) = 0;

INSERT INTO tareas (titulo, curso, fecha_entrega, estado, prioridad)
SELECT * FROM (VALUES
    ('Proyecto Angular', 'Desarrollo Web',           (CURRENT_DATE - INTERVAL '2 days')::DATE,  'Pendiente',   'URGENTE'),
    ('Modelo ER',        'Bases de Datos',           (CURRENT_DATE + INTERVAL '5 days')::DATE,  'En progreso', 'MEDIA'),
    ('Diagrama UML',     'Arquitectura de Software', (CURRENT_DATE + INTERVAL '10 days')::DATE, 'Pendiente',   'BAJA')
) AS seed(titulo, curso, fecha_entrega, estado, prioridad)
WHERE (SELECT COUNT(*) FROM tareas) = 0;

INSERT INTO schema_migrations (version, description)
VALUES ('v5', 'Datos iniciales de prueba')
ON CONFLICT (version) DO NOTHING;
