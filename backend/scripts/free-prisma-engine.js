/**
 * prebuild guard — frees the Prisma query engine before `prisma generate`.
 *
 * Why: on Windows, `prisma generate` writes a new engine to a `.tmp` file and
 * atomically renames it over `query_engine-windows.dll.node`. If a running
 * dev server (ts-node-dev) has `@prisma/client` loaded, the OS locks that DLL
 * and the rename fails with `EPERM`. This script releases the lock first.
 *
 * It is deliberately narrow and cross-platform:
 *   1. Stops ONLY ts-node-dev processes whose command line points at THIS
 *      project directory — never unrelated Node processes (frontend, editor…).
 *      A re-sweeping loop defeats `--respawn`, which otherwise resurrects the
 *      worker that re-locks the DLL.
 *   2. Deletes orphaned `query_engine-*.tmp*` files left by failed generates.
 *
 * Safe to run anytime; a no-op when nothing is running (e.g. CI / Linux deploy).
 */
const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const projectDir = path.resolve(__dirname, "..");

// 1) Stop this project's ts-node-dev so it releases the engine DLL.
try {
  if (process.platform === "win32") {
    // Build the PowerShell as a here-script and pass it via -EncodedCommand so
    // there is zero shell-quoting to get wrong. Matching Name in Where-Object
    // (not -Filter) keeps the whole script single-quote only.
    const dirLiteral = projectDir.replace(/'/g, "''");
    const psScript = `
$ErrorActionPreference = 'SilentlyContinue'
$ProgressPreference = 'SilentlyContinue'
$dir = '${dirLiteral}'
$killed = $false
for ($i = 0; $i -lt 4; $i++) {
  $procs = Get-CimInstance Win32_Process | Where-Object {
    $_.Name -eq 'node.exe' -and
    $_.CommandLine -match 'ts-node-dev' -and
    $_.CommandLine -match [regex]::Escape($dir)
  }
  if (-not $procs) { break }
  $killed = $true
  $procs | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
  Start-Sleep -Milliseconds 400
}
if ($killed) { Write-Output 'stopped' }
`;
    const encoded = Buffer.from(psScript, "utf16le").toString("base64");
    const out = execSync(
      `powershell -NoProfile -NonInteractive -EncodedCommand ${encoded}`,
      { encoding: "utf8" },
    );
    if (out.includes("stopped")) {
      console.log(
        "[free-prisma-engine] stopped this project's ts-node-dev to free the Prisma engine.",
      );
    }
  } else {
    // Linux/macOS: unlink-while-open is allowed, so a lock is unlikely, but keep
    // the behaviour symmetrical. `pkill` exits non-zero when nothing matches.
    try {
      execSync(`pkill -f "ts-node-dev.*${projectDir}"`, { stdio: "ignore" });
      console.log(
        "[free-prisma-engine] stopped this project's ts-node-dev to free the Prisma engine.",
      );
    } catch {
      /* nothing matched — normal */
    }
  }
} catch {
  /* never fail the build because of the guard */
}

// 2) Clean orphaned engine temp files from previously failed generates.
try {
  const engineDir = path.join(projectDir, "node_modules", ".prisma", "client");
  const orphans = fs
    .readdirSync(engineDir)
    .filter((file) => /^query_engine-.*\.tmp/i.test(file));

  for (const file of orphans) {
    try {
      fs.rmSync(path.join(engineDir, file), { force: true });
    } catch {
      /* ignore individual failures */
    }
  }

  if (orphans.length > 0) {
    console.log(
      `[free-prisma-engine] removed ${orphans.length} orphaned engine temp file(s).`,
    );
  }
} catch {
  /* .prisma/client may not exist yet on a fresh install — that's fine */
}
