-- ============================================================
-- PC2 UTP - Ejecutar TODAS las migraciones en orden
-- Uso con psql:
--   psql "postgresql://..." -f database/run_all.sql
-- O copiar/pegar en el SQL Editor de Supabase
-- ============================================================

\echo '>>> Ejecutando v0: control de migraciones'
\ir migrations/v0__control_migraciones.sql

\echo '>>> Ejecutando v1: cafetería'
\ir migrations/v1__cafeteria.sql

\echo '>>> Ejecutando v2: incidencias'
\ir migrations/v2__incidencias.sql

\echo '>>> Ejecutando v3: cursos'
\ir migrations/v3__cursos.sql

\echo '>>> Ejecutando v4: tareas'
\ir migrations/v4__tareas.sql

\echo '>>> Ejecutando v5: datos iniciales'
\ir migrations/v5__datos_iniciales.sql

\echo '>>> Migraciones completadas'
SELECT version, description, applied_at
FROM schema_migrations
ORDER BY version;
