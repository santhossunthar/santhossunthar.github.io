$ErrorActionPreference = "Stop"

$BaseDir = if ($env:CTF_LABS_HOME) { $env:CTF_LABS_HOME } else { Join-Path $HOME ".ctf-labs" }
$LabsDir = Join-Path $BaseDir "labs"
$CacheDir = Join-Path $BaseDir "cache"
$StateFile = Join-Path $BaseDir "state.json"
$IndexUrl = "https://raw.githubusercontent.com/santhossunthar/santhossunthar.github.io/main/labs.json"
$ZipUrl = "https://github.com/santhossunthar/santhossunthar.github.io/archive/refs/heads/main.zip"

New-Item -ItemType Directory -Force -Path $LabsDir, $CacheDir | Out-Null
if (-not (Test-Path $StateFile)) {
  '{ "installed": {} }' | Set-Content -Path $StateFile -Encoding UTF8
}

function Show-Usage {
  Write-Host @"
Usage:
  ctf-labs list
  ctf-labs pull <lab|all>
  ctf-labs up <lab>
  ctf-labs stop <lab>
  ctf-labs status <lab>
  ctf-labs destroy <lab>
  ctf-labs update
  ctf-labs version
"@
}

function Get-LabDir($Lab) {
  if (-not $Lab) {
    throw "Lab name is required."
  }

  $Dir = Join-Path $LabsDir $Lab
  if (-not (Test-Path $Dir)) {
    throw "Lab is not installed: $Lab. Run: ctf-labs pull $Lab"
  }

  return $Dir
}

function List-Labs {
  $Index = Invoke-RestMethod -Uri $IndexUrl
  foreach ($Lab in $Index.labs) {
    Write-Host "$($Lab.slug)`t$($Lab.name)`t$($Lab.provider)`t$($Lab.version)"
  }
}

function Pull-Lab($Target) {
  if (-not $Target) {
    throw "Lab name is required."
  }

  $ZipPath = Join-Path $CacheDir "source.zip"
  $ExtractDir = Join-Path $CacheDir "source"
  Remove-Item -Force $ZipPath -ErrorAction SilentlyContinue
  Remove-Item -Recurse -Force $ExtractDir -ErrorAction SilentlyContinue

  Invoke-WebRequest -Uri $ZipUrl -OutFile $ZipPath
  Expand-Archive -Path $ZipPath -DestinationPath $ExtractDir -Force

  $Root = Get-ChildItem -Path $ExtractDir -Directory | Select-Object -First 1
  $Index = Get-Content -Path (Join-Path $Root.FullName "labs.json") -Raw | ConvertFrom-Json
  $State = Get-Content -Path $StateFile -Raw | ConvertFrom-Json
  if (-not $State.installed) {
    $State | Add-Member -MemberType NoteProperty -Name installed -Value ([pscustomobject]@{})
  }

  $Selected = if ($Target -eq "all") { $Index.labs } else { $Index.labs | Where-Object { $_.slug -eq $Target } }
  if (-not $Selected) {
    throw "Lab not found: $Target"
  }

  foreach ($Lab in $Selected) {
    $Destination = Join-Path $LabsDir $Lab.slug
    $Current = $State.installed.PSObject.Properties[$Lab.slug]
    if ((Test-Path $Destination) -and $Current -and $Current.Value.version -eq $Lab.version) {
      Write-Host "[=] $($Lab.slug) already installed at version $($Lab.version)"
      continue
    }

    Remove-Item -Recurse -Force $Destination -ErrorAction SilentlyContinue
    Copy-Item -Recurse -Path (Join-Path $Root.FullName $Lab.path) -Destination $Destination
    Remove-Item -Recurse -Force (Join-Path $Destination ".vagrant") -ErrorAction SilentlyContinue
    Get-ChildItem -Path $Destination -Recurse -Include "__pycache__", "*.pyc" -Force -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

    $InstalledLab = [pscustomobject]@{
      version = $Lab.version
      provider = $Lab.provider
      path = $Destination
      entrypoint = $Lab.entrypoint
    }

    if ($State.installed.PSObject.Properties[$Lab.slug]) {
      $State.installed.PSObject.Properties.Remove($Lab.slug)
    }
    $State.installed | Add-Member -MemberType NoteProperty -Name $Lab.slug -Value $InstalledLab
    Write-Host "[+] Installed $($Lab.slug) $($Lab.version)"
  }

  $State | ConvertTo-Json -Depth 8 | Set-Content -Path $StateFile -Encoding UTF8
}

function Invoke-Vagrant($Action, $Lab) {
  $Dir = Get-LabDir $Lab
  Push-Location $Dir
  try {
    if ($Action -eq "destroy") {
      vagrant destroy -f
    } else {
      vagrant $Action
    }
  } finally {
    Pop-Location
  }
}

$Command = $args[0]
$Target = $args[1]

switch ($Command) {
  "list" { List-Labs }
  "pull" { Pull-Lab $Target }
  "up" { Invoke-Vagrant "up" $Target }
  "stop" { Invoke-Vagrant "halt" $Target }
  "status" { Invoke-Vagrant "status" $Target }
  "destroy" { Invoke-Vagrant "destroy" $Target }
  "update" {
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/santhossunthar/santhossunthar.github.io/main/scripts/ctf-labs.ps1" -OutFile (Join-Path $BaseDir "bin\ctf-labs.ps1")
    Write-Host "[+] Updated ctf-labs"
  }
  "version" { Write-Host "ctf-labs 1.0.0" }
  default {
    Show-Usage
    exit 1
  }
}
