#Requires -Version 5.1
<#
  Carga variables desde backend\.env y arranca Spring Boot con Supabase pooler.
  Uso:
    1. copy .env.example .env
    2. Edita .env con tu host pooler, usuario postgres.REF y password
    3. .\run-with-supabase-pooler.ps1
#>
$ErrorActionPreference = "Stop"
$envFile = Join-Path $PSScriptRoot ".env"

if (-not (Test-Path $envFile)) {
    Write-Host "Crea backend\.env desde .env.example" -ForegroundColor Red
    exit 1
}

Get-Content $envFile | ForEach-Object {
    if ($_ -match '^\s*#' -or $_ -match '^\s*$') { return }
    $parts = $_ -split '=', 2
    if ($parts.Count -eq 2) {
        [Environment]::SetEnvironmentVariable($parts[0].Trim(), $parts[1].Trim(), 'Process')
    }
}

if (-not $env:SPRING_DATASOURCE_URL) {
    Write-Host "Falta SPRING_DATASOURCE_URL en .env" -ForegroundColor Red
    exit 1
}

$env:SPRING_PROFILES_ACTIVE = "supabase"

Write-Host "Conectando via pooler..." -ForegroundColor Cyan
Write-Host "URL: $($env:SPRING_DATASOURCE_URL)"
Write-Host "User: $($env:SPRING_DATASOURCE_USERNAME)"
Write-Host ""

Set-Location $PSScriptRoot
mvn spring-boot:run
