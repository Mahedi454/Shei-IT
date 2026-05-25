const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const srcRoot = path.join(projectRoot, "src");
const extensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mts", ".mjs"]);
const assetExtensions = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".svg",
  ".webp",
]);

const tsconfig = JSON.parse(
  fs.readFileSync(path.join(projectRoot, "tsconfig.json"), "utf8"),
);
const paths = tsconfig.compilerOptions?.paths ?? {};
const aliases = Object.entries(paths)
  .map(([key, values]) => {
    const prefix = key.replace(/\*$/, "");
    const target = values?.[0]?.replace(/\*$/, "");

    if (!prefix || !target) {
      return null;
    }

    return {
      prefix,
      target: path.resolve(projectRoot, target),
    };
  })
  .filter(Boolean);

function listFiles(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== ".next") {
        files.push(...listFiles(fullPath));
      }
      continue;
    }

    if (extensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function resolveImport(importPath, sourceFile) {
  if (importPath.startsWith(".") || importPath.startsWith("..")) {
    return path.resolve(path.dirname(sourceFile), importPath);
  }

  const alias = aliases.find((item) => importPath.startsWith(item.prefix));

  if (!alias) {
    return null;
  }

  return path.join(alias.target, importPath.slice(alias.prefix.length));
}

function findExactPathIssue(targetPath) {
  const absolutePath = path.resolve(targetPath);
  const parsed = path.parse(absolutePath);
  const parts = path.relative(parsed.root, absolutePath).split(path.sep);
  let current = parsed.root;

  for (const part of parts) {
    let entries;

    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      return `Missing directory: ${current}`;
    }

    const exact = entries.find((entry) => entry.name === part);

    if (!exact) {
      const caseInsensitive = entries.find(
        (entry) => entry.name.toLowerCase() === part.toLowerCase(),
      );

      if (caseInsensitive) {
        return `Case mismatch: expected "${caseInsensitive.name}", imported "${part}"`;
      }

      return `Missing path segment: ${part}`;
    }

    current = path.join(current, exact.name);
  }

  return null;
}

const importPattern =
  /import(?:[\s\S]*?\sfrom\s*)?["']([^"']+\.(?:avif|gif|jpe?g|png|svg|webp))["']/gi;
const issues = [];

for (const file of listFiles(srcRoot)) {
  const source = fs.readFileSync(file, "utf8");
  const matches = source.matchAll(importPattern);

  for (const match of matches) {
    const importPath = match[1];
    const targetPath = resolveImport(importPath, file);

    if (!targetPath || !assetExtensions.has(path.extname(importPath))) {
      continue;
    }

    const issue = findExactPathIssue(targetPath);

    if (issue) {
      issues.push({
        file: path.relative(projectRoot, file),
        importPath,
        issue,
      });
    }
  }
}

if (issues.length > 0) {
  console.error("Case-sensitive asset import check failed:");

  for (const issue of issues) {
    console.error(`- ${issue.file}`);
    console.error(`  import: ${issue.importPath}`);
    console.error(`  issue: ${issue.issue}`);
  }

  process.exit(1);
}

console.log("Case-sensitive asset import check passed.");
