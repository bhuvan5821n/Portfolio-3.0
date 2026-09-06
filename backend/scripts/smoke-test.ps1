param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
$backendDir = "D:\Portfolio 3.0\backend"
$port = 3002
$serverPid = $null

function Write-Result {
  param([string]$Name, [string]$Status, [string]$Detail = "")
  $icon = if ($Status -eq "PASS") { "[PASS]" } elseif ($Status -eq "FAIL") { "[FAIL]" } else { "[SKIP]" }
  $msg = "$icon $Name"
  if ($Detail) { $msg += " - $Detail" }
  Write-Output $msg
}

function Test-EndpointJson {
  param([string]$Method, [string]$Path, [int]$ExpectedStatus, [string]$Name, [scriptblock]$Validate)
  try {
    $url = "http://localhost:$port$Path"
    $response = Invoke-WebRequest -Uri $url -Method $Method -TimeoutSec 5 -UseBasicParsing
    if ($response.StatusCode -eq $ExpectedStatus) {
      $body = $response.Content | ConvertFrom-Json
      $valid = & $Validate $body
      if ($valid) {
        Write-Result $Name "PASS" "Status $($response.StatusCode)"
        return $true
      } else {
        Write-Result $Name "FAIL" "Validation failed"
        return $false
      }
    } else {
      Write-Result $Name "FAIL" "Expected $ExpectedStatus, got $($response.StatusCode)"
      return $false
    }
  } catch {
    $code = 0
    try { $code = [int]$_.Exception.Response.StatusCode } catch {}
    if ($code -eq $ExpectedStatus) {
      Write-Result $Name "PASS" "Status $code"
      return $true
    } else {
      Write-Result $Name "FAIL" "Expected $ExpectedStatus, got $code"
      return $false
    }
  }
}

Write-Output "=== PORTFOLIO 3.0 BACKEND SMOKE TEST ==="
Write-Output ""

try {
  # Build
  if (-not $SkipBuild) {
    Write-Output "Building..."
    Push-Location $backendDir
    npx tsc 2>&1 | Out-Null
    Pop-Location
    if ($LASTEXITCODE -ne 0) {
      Write-Result "Build" "FAIL" "TypeScript compilation failed"
      exit 1
    }
    Write-Result "Build" "PASS"
  }

  # Start server
  Write-Output "Starting server on port $port..."
  Push-Location $backendDir
  $env:PORT = $port
  $env:NODE_ENV = "development"
  $env:FRONTEND_ORIGINS = "http://localhost:3000"

  $proc = Start-Process -FilePath "node" -ArgumentList "dist\index.js" -PassThru -NoNewWindow -RedirectStandardOutput "$env:TEMP\portfolio-stdout.log" -RedirectStandardError "$env:TEMP\portfolio-stderr.log"
  $serverPid = $proc.Id
  Pop-Location

  # Wait for server
  $ready = $false
  for ($i = 0; $i -lt 30; $i++) {
    Start-Sleep -Milliseconds 500
    try {
      $healthCheck = Invoke-WebRequest -Uri "http://localhost:$port/api/v1/health" -TimeoutSec 2 -UseBasicParsing
      if ($healthCheck.StatusCode -eq 200) {
        $ready = $true
        break
      }
    } catch {}
  }

  if (-not $ready) {
    Write-Result "Server Start" "FAIL" "Server did not become ready within 15 seconds"
    $stderr = Get-Content "$env:TEMP\portfolio-stderr.log" -ErrorAction SilentlyContinue
    if ($stderr) { Write-Output "STDERR: $stderr" }
    exit 1
  }
  Write-Result "Server Start" "PASS" "Port $port"

  Write-Output ""
  Write-Output "Testing endpoints..."
  Write-Output ""

  $allPassed = $true

  # Health
  $allPassed = (Test-EndpointJson "GET" "/api/v1/health" 200 "Health" { param($b) $b.success -eq $true -and $b.data.status -eq "healthy" }) -and $allPassed

  # System
  $allPassed = (Test-EndpointJson "GET" "/api/v1/system/public" 200 "System Public" { param($b) $b.success -eq $true -and $b.data.name -eq "CHRONO//ROOTS" }) -and $allPassed

  # Profile
  $allPassed = (Test-EndpointJson "GET" "/api/v1/profile" 200 "Profile" { param($b) $b.success -eq $true -and $b.data.name -eq "Bhuvan Gowda P" }) -and $allPassed

  # Projects
  $allPassed = (Test-EndpointJson "GET" "/api/v1/projects" 200 "Projects" { param($b) $b.success -eq $true -and $b.data.Count -gt 0 }) -and $allPassed

  # Projects featured
  $allPassed = (Test-EndpointJson "GET" "/api/v1/projects?featured=true" 200 "Projects Featured" { param($b) $b.success -eq $true }) -and $allPassed

  # Project detail
  $allPassed = (Test-EndpointJson "GET" "/api/v1/projects/friday" 200 "Project Detail" { param($b) $b.success -eq $true -and $b.data.slug -eq "friday" }) -and $allPassed

  # Capabilities
  $allPassed = (Test-EndpointJson "GET" "/api/v1/capabilities" 200 "Capabilities" { param($b) $b.success -eq $true -and $b.data.Count -gt 0 }) -and $allPassed

  # Achievements
  $allPassed = (Test-EndpointJson "GET" "/api/v1/achievements" 200 "Achievements" { param($b) $b.success -eq $true -and $b.data.Count -gt 0 }) -and $allPassed

  # Creative
  $allPassed = (Test-EndpointJson "GET" "/api/v1/creative" 200 "Creative" { param($b) $b.success -eq $true -and $b.data.Count -gt 0 }) -and $allPassed

  # Creative detail
  $allPassed = (Test-EndpointJson "GET" "/api/v1/creative/error-404-hero-not-found" 200 "Creative Detail" { param($b) $b.success -eq $true -and $b.data.slug -eq "error-404-hero-not-found" }) -and $allPassed

  # Signals
  $allPassed = (Test-EndpointJson "GET" "/api/v1/signals" 200 "Signals" { param($b) $b.success -eq $true -and $b.data.Count -gt 0 }) -and $allPassed

  # Invalid project slug
  $allPassed = (Test-EndpointJson "GET" "/api/v1/projects/nonexistent" 404 "Invalid Slug" { param($b) $b.success -eq $false -and $b.error.code -eq "PROJECT_NOT_FOUND" }) -and $allPassed

  # Invalid contact
  $allPassed = (Test-EndpointJson "POST" "/api/v1/contact" 400 "Invalid Contact" { param($b) $b.success -eq $false }) -and $allPassed

  # Swagger docs
  $allPassed = (Test-EndpointJson "GET" "/docs" 200 "Swagger Docs" { param($b) $true }) -and $allPassed

  # OpenAPI JSON
  $allPassed = (Test-EndpointJson "GET" "/docs/json" 200 "OpenAPI JSON" { param($b) $b.openapi -eq "3.0.3" }) -and $allPassed

  Write-Output ""
  Write-Output "=== RESULTS ==="

  if ($allPassed) {
    Write-Output "ALL TESTS PASSED"
  } else {
    Write-Output "SOME TESTS FAILED"
  }

} finally {
  if ($serverPid) {
    Write-Output ""
    Write-Output "Stopping server (PID: $serverPid)..."
    try { Stop-Process -Id $serverPid -Force -ErrorAction SilentlyContinue } catch {}
  }
}
