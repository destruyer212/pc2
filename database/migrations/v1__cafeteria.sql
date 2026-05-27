-- ============================================================
-- v1: Pregunta 1 - Sistema de pedidos cafetería UTP
-- Tablas: productos, pedidos
-- Orden recomendado: v0 → v1 → v2 → v3 → v4 → v5
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS schema_migrations (
    version     VARCHAR(20)  PRIMARY KEY,
    description TEXT         NOT NULL,
    applied_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

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

CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos (categoria);
CREATE INDEX IF NOT EXISTS idx_productos_stock      ON productos (stock);

CREATE TABLE IF NOT EXISTS pedidos (
    id                BIGSERIAL PRIMARY KEY,
    nombre_estudiante VARCHAR(255) NOT NULL,
    producto_id       BIGINT       NOT NULL REFERENCES productos (id) ON DELETE RESTRICT,
    cantidad          INTEGER      NOT NULL,
    observacion       TEXT,
    created_at        TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_pedidos_cantidad CHECK (cantidad > 0)
);

CREATE INDEX IF NOT EXISTS idx_pedidos_producto_id ON pedidos (producto_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_created_at    ON pedidos (created_at DESC);

COMMENT ON TABLE productos IS 'Productos disponibles en la cafetería UTP';
COMMENT ON TABLE pedidos  IS 'Pedidos registrados por estudiantes';

INSERT INTO schema_migrations (version, description)
VALUES ('v1', 'Tablas cafetería: productos y pedidos')
ON CONFLICT (version) DO NOTHING;
