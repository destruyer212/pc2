#Requires -Version 5.1
<#
.SYNOPSIS
    Ejecuta migraciones v0..v5 en PostgreSQL (Supabase) en orden.

.EXAMPLE
    .\run_migrations.ps1 -ConnectionString "postgresql://postgres:PASS@db.xxx.supabase.co:5432/postgres?sslmode=require"

.EXAMPLE
    .\run_migrations.ps1 -EnvFile "..\.env"
#>
param(
    [string]$ConnectionString,
    [string]$EnvFile = "$PSScriptRoot\.env",
    [switch]$SkipSeed
)

$ErrorActionPreference = "Stop"

function Get-PsqlPath {
    $candidates = @(
        "psql",
        "C:\Program Files\PostgreSQL\16\bin\psql.exe",
        "C:\Program Files\PostgreSQL\15\bin\psql.exe"
    )
    foreach ($path in $candidates) {
        if (Get-Command $path -ErrorAction SilentlyContinue) {
            return (Get-Command $path).Source
        }
    }
    throw "No se encontró psql. Instala PostgreSQL client o agrega psql al PATH."
}

function Read-EnvFile {
    param([string]$Path)
    if (-not (Test-Path $Path)) { return @{} }
    $vars = @{}
    Get-Content $Path | ForEach-Object {
        if ($_ -match '^\s*#' -or $_ -match '^\s*$') { return }
        $parts = $_ -split '=', 2
        if ($parts.Count -eq 2) {
            $vars[$parts[0].Trim()] = $parts[1].Trim()
        }
    }
    return $vars
}

$envVars = Read-EnvFile -Path $EnvFile

if (-not $ConnectionString) {
    if ($envVars.ContainsKey("DATABASE_URL")) {
        $ConnectionString = $envVars["DATABASE_URL"]
    } elseif ($envVars.ContainsKey("SUPABASE_DB_HOST")) {
        $host = $envVars["SUPABASE_DB_HOST"]
        $port = if ($envVars["SUPABASE_DB_PORT"]) { $envVars["SUPABASE_DB_PORT"] } else { "5432" }
        $db   = if ($envVars["SUPABASE_DB_NAME"]) { $envVars["SUPABASE_DB_NAME"] } else { "postgres" }
        $user = $envVars["SUPABASE_DB_USER"]
        $pass = $envVars["SUPABASE_DB_PASSWORD"]
        $ConnectionString = "postgresql://${user}:${pass}@${host}:${port}/${db}?sslmode=require"
    } else {
        throw "Indica -ConnectionString o crea database\.env desde .env.example"
    }
}

$psql = Get-PsqlPath
$migrationsDir = Join-Path $PSScriptRoot "migrations"

$scripts = @(
    "v0__control_migraciones.sql",
    "v1__cafeteria.sql",
    "v2__incidencias.sql",
    "v3__cursos.sql",
    "v4__tareas.sql"
)

if (-not $SkipSeed) {
    $scripts += "v5__datos_iniciales.sql"
}

Write-Host "=== PC2 UTP - Migraciones PostgreSQL/Supabase ===" -ForegroundColor Cyan
Write-Host "Usando: $psql"
Write-Host ""

foreach ($script in $scripts) {
    $file = Join-Path $migrationsDir $script
    if (-not (Test-Path $file)) {
        throw "No existe el script: $file"
    }
    Write-Host ">>> Ejecutando $script" -ForegroundColor Yellow
    & $psql $ConnectionString -v ON_ERROR_STOP=1 -f $file
    if ($LASTEXITCODE -ne 0) {
        throw "Error al ejecutar $script (codigo $LASTEXITCODE)"
    }
}

Write-Host ""
Write-Host ">>> Migraciones aplicadas:" -ForegroundColor Green
& $psql $ConnectionString -c "SELECT version, description, applied_at FROM schema_migrations ORDER BY version;"

Write-Host ""
Write-Host "Listo." -ForegroundColor Green
