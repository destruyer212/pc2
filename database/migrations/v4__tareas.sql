-- ============================================================
-- v4: Pregunta 4 - Gestor de tareas académicas
-- Tabla: tareas
-- Orden recomendado: v0 → v1 → v2 → v3 → v4 → v5
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS schema_migrations (
    version     VARCHAR(20)  PRIMARY KEY,
    description TEXT         NOT NULL,
    applied_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tareas (
    id             BIGSERIAL PRIMARY KEY,
    titulo         VARCHAR(255) NOT NULL,
    curso          VARCHAR(255) NOT NULL,
    fecha_entrega  DATE         NOT NULL,
    estado         VARCHAR(50)  NOT NULL DEFAULT 'Pendiente',
    prioridad      VARCHAR(20)  NOT NULL DEFAULT 'MEDIA',
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_tareas_prioridad CHECK (
        prioridad IN ('BAJA', 'MEDIA', 'ALTA', 'URGENTE')
    )
);

CREATE INDEX IF NOT EXISTS idx_tareas_fecha_entrega ON tareas (fecha_entrega);
CREATE INDEX IF NOT EXISTS idx_tareas_prioridad     ON tareas (prioridad);
CREATE INDEX IF NOT EXISTS idx_tareas_estado        ON tareas (estado);

CREATE OR REPLACE FUNCTION set_tareas_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_tareas_updated_at ON tareas;
CREATE TRIGGER trg_tareas_updated_at
    BEFORE UPDATE ON tareas
    FOR EACH ROW
    EXECUTE FUNCTION set_tareas_updated_at();

COMMENT ON TABLE tareas IS 'Tareas académicas pendientes con fecha y prioridad';

INSERT INTO schema_migrations (version, description)
VALUES ('v4', 'Tabla tareas academicas')
ON CONFLICT (version) DO NOTHING;
