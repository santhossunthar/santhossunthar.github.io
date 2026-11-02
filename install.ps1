$ErrorActionPreference = "Stop"

$BaseDir = Join-Path $HOME ".ctf-labs"
$BinDir = Join-Path $BaseDir "bin"
$ScriptUrl = "https://raw.githubusercontent.com/santhossunthar/santhossunthar.github.io/main/scripts/ctf-labs.ps1"
$ScriptPath = Join-Path $BinDir "ctf-labs.ps1"

New-Item -ItemType Directory -Force -Path $BinDir, (Join-Path $BaseDir "labs"), (Join-Path $BaseDir "cache") | Out-Null
Invoke-WebRequest -Uri $ScriptUrl -OutFile $ScriptPath

$StatePath = Join-Path $BaseDir "state.json"
if (-not (Test-Path $StatePath)) {
  '{ "installed": {} }' | Set-Content -Path $StatePath -Encoding UTF8
}

if (-not (Test-Path $PROFILE)) {
  New-Item -ItemType File -Force -Path $PROFILE | Out-Null
}

$FunctionBlock = @'

function ctf-labs {
  & "$HOME\.ctf-labs\bin\ctf-labs.ps1" @args
}
'@

$ProfileContent = Get-Content -Path $PROFILE -Raw
if ($ProfileContent -notmatch "function ctf-labs") {
  Add-Content -Path $PROFILE -Value $FunctionBlock
}

Write-Host "[+] CTF Labs manager installed at $ScriptPath"
Write-Host "[+] Restart PowerShell or run: . `$PROFILE"
Write-Host "[+] Then run: ctf-labs list"
