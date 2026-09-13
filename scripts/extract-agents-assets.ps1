$ErrorActionPreference = 'Stop'

# Extracts the "Agents in the mesh" artwork from the full-page Figma SVG export.
# Text (headings, pill, card titles/descriptions) is deliberately left out — it is
# rendered as real HTML in OmnisenseAgents.tsx so it stays selectable and editable.

$SourcePath = 'C:\Users\Dell\Downloads\OmniSense.svg'
$OutDir     = Join-Path $PSScriptRoot '..\public\images\omnisense'

[xml]$source = Get-Content $SourcePath -Raw

$defs = @{}
$source.DocumentElement.SelectSingleNode('*[local-name()="defs"]').ChildNodes |
  ForEach-Object { $defs[$_.GetAttribute('id')] = $_.OuterXml }

# Walk url(#id) / href="#id" references so every gradient, filter, mask and clipPath
# the extracted markup depends on travels with it.
function Get-UsedDefs([string[]] $markup) {
  $used  = [ordered]@{}
  $queue = [Collections.Generic.Queue[string]]::new()
  $markup | ForEach-Object { $queue.Enqueue($_) }
  while ($queue.Count) {
    foreach ($match in [regex]::Matches($queue.Dequeue(), '(?:url\(#|(?:xlink:)?href="#)([^)"\s]+)')) {
      $id = $match.Groups[1].Value
      if ($defs.ContainsKey($id) -and -not $used.Contains($id)) {
        $used[$id] = $defs[$id]
        $queue.Enqueue($defs[$id])
      }
    }
  }
  return $used
}

function Write-Svg($name, $viewBox, [string[]] $body) {
  $used = Get-UsedDefs $body
  # Explicit width/height: without them the intrinsic size falls back to 150px tall,
  # which is what these get rasterised at in a canvas.
  $vb = $viewBox -split '\s+'
  $svg  = '<svg width="' + $vb[2] + '" height="' + $vb[3] + '" viewBox="' + $viewBox +
          '" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
          ($body -join '') + '<defs>' + (($used.Values) -join '') + '</defs></svg>'
  [xml]$validated = $svg   # parse-check before writing
  $path = Join-Path $OutDir "$name.svg"
  [IO.File]::WriteAllText($path, $svg, [Text.UTF8Encoding]::new($false))
  Write-Output ("{0,-22} {1,9:N0} bytes  defs={2}" -f "$name.svg", $svg.Length, $used.Count)
}

# ── 1. Mesh: concentric rings, logo core, dotted connectors and their end dots ──
# Section group sits at translate(321 7309); dropping that transform makes every
# child coordinate section-relative, so the viewBox is the 1278x1273 content box.
$section = $source.SelectSingleNode('//*[@id="Group_1707487052"]')

# The eight card frames, in document order — also the split point for the front layer.
$cardFrames = @(
  'Frame_2147224846', 'Frame_2147224847', 'Frame_2147224848', 'Frame_2147224849',
  'Frame_2147224850', 'Frame_2147224851', 'Frame_2147224852', 'Frame_2147224853'
)
# Everything that is text or a card chrome frame — rebuilt as HTML/CSS instead.
# Frame_2147224824 is the "Agents" pill.
$skip = @('Agents_in_the_mesh', 'Frame_2147224824') + $cardFrames

# Figma paints the outer connectors and their end dots AFTER the cards, so they sit on
# top of the card edges they touch. Split at the first card frame to preserve that.
$mesh  = @()
$front = @()
$glow  = $null
$seenCard = $false
foreach ($child in $section.ChildNodes) {
  if ($child.NodeType -ne 'Element') { continue }
  if ($child.LocalName -eq 'foreignObject') { continue }   # Figma backdrop-blur shims
  $id = $child.GetAttribute('id')
  if ($skip -contains $id) { if ($cardFrames -contains $id) { $seenCard = $true }; continue }
  if ($id -like 'OmniSense_s_autonomous_SOC_agents*') { continue }  # paragraph
  if ($id -eq 'Ellipse_1993') { $glow = $child; continue }          # own file, see below
  if ($seenCard) { $front += $child.OuterXml } else { $mesh += $child.OuterXml }
}
Write-Svg 'agents-mesh'       '0 0 1278 1273' $mesh
Write-Svg 'agents-mesh-front' '0 0 1278 1273' $front

# ── 2. Glow: a 336.5r circle under a 218 stdDeviation blur. Its filter region runs
# far outside the content box, so it gets its own file rather than being clipped. ──
$g = $glow.CloneNode($true)
$g.SetAttribute('transform', 'translate(436 436)')  # re-origin to the filter region
Write-Svg 'agents-glow' '0 0 1545 1545' @($g.OuterXml)

# ── 3. Core on its own, for the stacked narrow-screen layout where the connectors
# would otherwise run off to card positions that no longer exist. ──
$core = @('Group_1707487017', 'Group_1707487018') |
  ForEach-Object { $source.SelectSingleNode('//*[@id="' + $_ + '"]').OuterXml }
Write-Svg 'agents-core' '353 544 572 572' $core

# ── 4. Pattern: the full-bleed line texture behind the section. Mirrored in the
# original via matrix(-1 0 0 1 1920 7309); keep the mirror, drop the page offset. ──
$pattern = $source.SelectSingleNode('//*[@id="Pattern"]').CloneNode($true)
$pattern.SetAttribute('transform', 'matrix(-1 0 0 1 1920 0)')
Write-Svg 'agents-pattern' '0 0 1920 1023' @($pattern.OuterXml)
