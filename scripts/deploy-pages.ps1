param([switch]$SkipBuild)
$ErrorActionPreference='Stop'
$repoRoot=(Resolve-Path (Join-Path $PSScriptRoot '..')).Path
Set-Location -LiteralPath $repoRoot
function Run-Git { param([string[]]$GitArguments)
  & git @GitArguments
  if($LASTEXITCODE -ne 0){throw "Git command failed: $($GitArguments[0])"}
}
if(-not $SkipBuild){
  & npm run build
  if($LASTEXITCODE -ne 0){throw 'Build failed'}
}
$distRoot=Join-Path $repoRoot 'dist'
if(-not (Test-Path -LiteralPath (Join-Path $distRoot 'index.html'))){throw 'dist/index.html is missing'}
$publishParent=Join-Path $repoRoot '.pages-publish'
$publishRoot=Join-Path $publishParent ([guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $publishRoot -Force | Out-Null
Get-ChildItem -LiteralPath $distRoot -Force | Copy-Item -Destination $publishRoot -Recurse -Force
Set-Content -LiteralPath (Join-Path $publishRoot '.nojekyll') -Value '' -Encoding utf8
Set-Location -LiteralPath $publishRoot
Run-Git -GitArguments @('init','-b','gh-pages')
Run-Git -GitArguments @('remote','add','origin','https://github.com/qibrohim711-lang/metro-runner.git')
$existing=(& git ls-remote --heads origin gh-pages)
if($LASTEXITCODE -ne 0){throw 'Cannot read remote branch'}
if($existing){Run-Git -GitArguments @('fetch','--depth=1','origin','gh-pages')}
Run-Git -GitArguments @('add','--all')
$tree=(& git write-tree).Trim()
if($LASTEXITCODE -ne 0){throw 'Cannot write deployment tree'}
$commitArguments=@('commit-tree',$tree,'-m','Deploy Metro Runner static site')
if($existing){$parent=(& git rev-parse FETCH_HEAD).Trim();$commitArguments+=@('-p',$parent)}
$commit=(& git @commitArguments).Trim()
if($LASTEXITCODE -ne 0){throw 'Cannot commit deployment'}
Run-Git -GitArguments @('update-ref','refs/heads/gh-pages',$commit)
Run-Git -GitArguments @('push','origin','gh-pages')

# Read the already-connected GitHub credential into process memory only.
$credentialLines="protocol=https`nhost=github.com`nusername=qibrohim711-lang`n`n" | git credential fill
$fields=@{}
foreach($line in $credentialLines){if($line -match '^([^=]+)=(.*)$'){$fields[$matches[1]]=$matches[2]}}
if(-not $fields['password']){throw 'Connected GitHub credential unavailable'}
$headers=@{Authorization='Bearer '+$fields['password'];Accept='application/vnd.github+json';'X-GitHub-Api-Version'='2022-11-28'}
$api='https://api.github.com/repos/qibrohim711-lang/metro-runner/pages'
$repository=Invoke-RestMethod -Uri 'https://api.github.com/repos/qibrohim711-lang/metro-runner' -Headers $headers
$body=@{source=@{branch='gh-pages';path='/'};build_type='legacy'} | ConvertTo-Json
if($repository.has_pages){$site=Invoke-RestMethod -Method Put -Uri $api -Headers $headers -ContentType 'application/json' -Body $body}
else{$site=Invoke-RestMethod -Method Post -Uri $api -Headers $headers -ContentType 'application/json' -Body $body}
if(-not $site){$site=Invoke-RestMethod -Uri $api -Headers $headers}
Set-Location -LiteralPath $repoRoot
[pscustomobject]@{url=$site.html_url;status=$site.status;branch='gh-pages';deployment_commit=$commit}|ConvertTo-Json
