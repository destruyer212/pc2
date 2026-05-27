-- ============================================================
-- PC2 UTP - Script único para Supabase SQL Editor
-- (sin comandos psql \ir — pegar y ejecutar completo)
-- ============================================================

-- v0
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS schema_migrations (
    version     VARCHAR(20)  PRIMARY KEY,
    description TEXT         NOT NULL,
    applied_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

INSERT INTO schema_migrations (version, description)
VALUES ('v0', 'Control de migraciones y extensiones')
ON CONFLICT (version) DO NOTHING;

-- v1 Cafetería
CREATE TABLE IF NOT EXISTS productos (
    id         BIGSERIAL PRIMARY KEY,
    nombre     VARCHAR(255)   NOT NULL,
    categoria  VARCHAR(100)   NOT NULL,
    precio     NUMERIC(10, 2) NOT NULL,
    stock      INTEGER        NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_productos_stock  CHECK (stock >= 0),
    CONSTRAINT chk_productos_precio CHECK (precio >= 0)
);

CREATE TABLE IF NOT EXISTS pedidos (
    id                BIGSERIAL PRIMARY KEY,
    nombre_estudiante VARCHAR(255) NOT NULL,
    producto_id       BIGINT       NOT NULL REFERENCES productos (id) ON DELETE RESTRICT,
    cantidad          INTEGER      NOT NULL,
    observacion       TEXT,
    created_at        TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_pedidos_cantidad CHECK (cantidad > 0)
);

INSERT INTO schema_migrations (version, description)
VALUES ('v1', 'Tablas cafetería: productos y pedidos')
ON CONFLICT (version) DO NOTHING;

-- v2 Incidencias
CREATE TABLE IF NOT EXISTS incidencias (
    id          BIGSERIAL PRIMARY KEY,
    aula        VARCHAR(50)  NOT NULL,
    equipo      VARCHAR(100) NOT NULL,
    tipo        VARCHAR(100) NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    estado      VARCHAR(20)  NOT NULL DEFAULT 'PENDIENTE',
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_incidencias_estado CHECK (estado IN ('PENDIENTE', 'EN_PROCESO', 'ATENDIDA'))
);

INSERT INTO schema_migrations (version, description)
VALUES ('v2', 'Tabla incidencias de laboratorio')
ON CONFLICT (version) DO NOTHING;

-- v3 Cursos
CREATE TABLE IF NOT EXISTS cursos (
    id         BIGSERIAL PRIMARY KEY,
    codigo     VARCHAR(20)  NOT NULL UNIQUE,
    nombre     VARCHAR(255) NOT NULL,
    docente    VARCHAR(255) NOT NULL,
    creditos   INTEGER      NOT NULL,
    vacantes   INTEGER      NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_cursos_creditos CHECK (creditos > 0),
    CONSTRAINT chk_cursos_vacantes CHECK (vacantes >= 0)
);

CREATE TABLE IF NOT EXISTS matriculas (
    id                 BIGSERIAL PRIMARY KEY,
    nombre_estudiante  VARCHAR(255) NOT NULL,
    codigo_estudiante  VARCHAR(50)  NOT NULL,
    curso_id           BIGINT       NOT NULL REFERENCES cursos (id) ON DELETE RESTRICT,
    estado             VARCHAR(50)  NOT NULL DEFAULT 'Registrada',
    created_at         TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

INSERT INTO schema_migrations (version, description)
VALUES ('v3', 'Tablas cursos y matriculas')
ON CONFLICT (version) DO NOTHING;

-- v4 Tareas
CREATE TABLE IF NOT EXISTS tareas (
    id             BIGSERIAL PRIMARY KEY,
    titulo         VARCHAR(255) NOT NULL,
    curso          VARCHAR(255) NOT NULL,
    fecha_entrega  DATE         NOT NULL,
    estado         VARCHAR(50)  NOT NULL DEFAULT 'Pendiente',
    prioridad      VARCHAR(20)  NOT NULL DEFAULT 'MEDIA',
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_tareas_prioridad CHECK (prioridad IN ('BAJA', 'MEDIA', 'ALTA', 'URGENTE'))
);

INSERT INTO schema_migrations (version, description)
VALUES ('v4', 'Tabla tareas academicas')
ON CONFLICT (version) DO NOTHING;

-- v5 Seed
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

SELECT version, description, applied_at FROM schema_migrations ORDER BY version;
