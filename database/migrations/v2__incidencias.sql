-- ============================================================
-- v2: Pregunta 2 - Gestor de incidencias de laboratorio
-- Tabla: incidencias
-- Orden recomendado: v0 → v1 → v2 → v3 → v4 → v5
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS schema_migrations (
    version     VARCHAR(20)  PRIMARY KEY,
    description TEXT         NOT NULL,
    applied_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS incidencias (
    id          BIGSERIAL PRIMARY KEY,
    aula        VARCHAR(50)  NOT NULL,
    equipo      VARCHAR(100) NOT NULL,
    tipo        VARCHAR(100) NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    estado      VARCHAR(20)  NOT NULL DEFAULT 'PENDIENTE',
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_incidencias_estado CHECK (
        estado IN ('PENDIENTE', 'EN_PROCESO', 'ATENDIDA')
    )
);

CREATE INDEX IF NOT EXISTS idx_incidencias_estado     ON incidencias (estado);
CREATE INDEX IF NOT EXISTS idx_incidencias_aula       ON incidencias (aula);
CREATE INDEX IF NOT EXISTS idx_incidencias_created_at ON incidencias (created_at DESC);

CREATE OR REPLACE FUNCTION set_incidencias_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_incidencias_updated_at ON incidencias;
CREATE TRIGGER trg_incidencias_updated_at
    BEFORE UPDATE ON incidencias
    FOR EACH ROW
    EXECUTE FUNCTION set_incidencias_updated_at();

COMMENT ON TABLE incidencias IS 'Incidencias reportadas en laboratorio de cómputo';

INSERT INTO schema_migrations (version, description)
VALUES ('v2', 'Tabla incidencias de laboratorio')
ON CONFLICT (version) DO NOTHING;
