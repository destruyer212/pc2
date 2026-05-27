-- ============================================================
-- v0: Control de migraciones y extensiones base
-- Ejecutar primero en Supabase (PostgreSQL)
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS schema_migrations (
    version     VARCHAR(20)  PRIMARY KEY,
    description TEXT         NOT NULL,
    applied_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE schema_migrations IS 'Registro de scripts SQL aplicados (v0, v1, v2...)';

INSERT INTO schema_migrations (version, description)
VALUES ('v0', 'Control de migraciones y extensiones')
ON CONFLICT (version) DO NOTHING;
