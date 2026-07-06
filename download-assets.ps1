# Bare Roots — Asset Downloader (Windows PowerShell)
# Right-click this file > "Run with PowerShell"  (or run:  powershell -ExecutionPolicy Bypass -File .\download-assets.ps1 )
# Downloads every image in assets\assets-manifest.json into the assets\ folder.

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$assets = Join-Path $root "assets"
$manifestPath = Join-Path $assets "assets-manifest.json"

if (-not (Test-Path $assets)) { New-Item -ItemType Directory -Path $assets | Out-Null }

Write-Host "Bare Roots asset downloader" -ForegroundColor Yellow
$manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json

$ok = 0; $fail = 0
foreach ($p in $manifest.PSObject.Properties) {
  if ($p.Name -eq "_comment") { continue }
  $out = Join-Path $assets $p.Name
  try {
    Invoke-WebRequest -Uri $p.Value -OutFile $out -UseBasicParsing
    Write-Host ("  OK   " + $p.Name) -ForegroundColor Green
    $ok++
  } catch {
    Write-Host ("  FAIL " + $p.Name + "  ->  " + $p.Value) -ForegroundColor Red
    $fail++
  }
}
Write-Host ""
Write-Host ("Done. $ok downloaded, $fail failed.") -ForegroundColor Yellow
Write-Host "Open index.html in your browser to view the site." -ForegroundColor Yellow
