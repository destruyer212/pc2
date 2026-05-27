-- Bloque incluido al inicio de v1..v5 (Supabase no ejecuta v0 automáticamente)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS schema_migrations (
    version     VARCHAR(20)  PRIMARY KEY,
    description TEXT         NOT NULL,
    applied_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
