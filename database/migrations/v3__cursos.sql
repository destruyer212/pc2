-- ============================================================
-- v3: Pregunta 3 - Cursos y matrículas
-- Tablas: cursos, matriculas
-- Orden recomendado: v0 → v1 → v2 → v3 → v4 → v5
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS schema_migrations (
    version     VARCHAR(20)  PRIMARY KEY,
    description TEXT         NOT NULL,
    applied_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

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

CREATE INDEX IF NOT EXISTS idx_cursos_codigo ON cursos (codigo);

CREATE TABLE IF NOT EXISTS matriculas (
    id                 BIGSERIAL PRIMARY KEY,
    nombre_estudiante  VARCHAR(255) NOT NULL,
    codigo_estudiante  VARCHAR(50)  NOT NULL,
    curso_id           BIGINT       NOT NULL REFERENCES cursos (id) ON DELETE RESTRICT,
    estado             VARCHAR(50)  NOT NULL DEFAULT 'Registrada',
    created_at         TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_matriculas_curso_id          ON matriculas (curso_id);
CREATE INDEX IF NOT EXISTS idx_matriculas_codigo_estudiante ON matriculas (codigo_estudiante);

COMMENT ON TABLE cursos     IS 'Cursos disponibles para matrícula';
COMMENT ON TABLE matriculas IS 'Solicitudes de matrícula de estudiantes';

INSERT INTO schema_migrations (version, description)
VALUES ('v3', 'Tablas cursos y matriculas')
ON CONFLICT (version) DO NOTHING;
