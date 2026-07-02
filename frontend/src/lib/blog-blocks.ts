// Shared content-block model for blog articles. Used by the public renderer
// ([components/blog/article-content.tsx]) and the admin block editor
// ([components/admin/blog-blocks-editor.tsx]).

export type BlockType =
  | "paragraph"
  | "heading"
  | "list"
  | "quote"
  | "table"
  | "code"
  | "callout"
  | "imageGrid"
  | "image"
  | "stat";

export type ListItem = {
  label?: string;
  text: string;
};

export type GridImage = {
  url: string;
  caption?: string;
};

export type ColumnTone = "default" | "pro" | "con";

export type ParagraphBlock = { type: "paragraph"; text: string };
export type HeadingBlock = { type: "heading"; level: 2 | 3; text: string };
export type ListBlock = {
  type: "list";
  style: "bullet" | "labeled";
  items: ListItem[];
};
export type QuoteBlock = { type: "quote"; text: string; attribution?: string };
export type TableBlock = {
  type: "table";
  columns: string[];
  rows: string[][];
  tone?: ColumnTone[];
};
export type CodeBlock = {
  type: "code";
  language?: string;
  filename?: string;
  code: string;
};
export type CalloutBlock = {
  type: "callout";
  variant: "warning" | "info";
  title: string;
  text: string;
};
export type ImageGridBlock = { type: "imageGrid"; images: GridImage[] };
export type ImageBlock = { type: "image"; url: string; caption?: string };
export type StatBlock = { type: "stat"; value: string; label: string };

export type BlogBlock =
  | ParagraphBlock
  | HeadingBlock
  | ListBlock
  | QuoteBlock
  | TableBlock
  | CodeBlock
  | CalloutBlock
  | ImageGridBlock
  | ImageBlock
  | StatBlock;

export type TocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

/**
 * Turn heading text into a stable, URL-safe anchor id. When several headings
 * share the same text the index keeps the ids unique.
 */
export function slugifyHeading(text: string, index: number): string {
  const base = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return base ? `${base}-${index}` : `section-${index}`;
}

/**
 * Coerce loosely-typed data coming from the API (Prisma `Json`) into a typed
 * block array. Returns an empty array when the value is absent or malformed so
 * the caller can safely fall back to the legacy plain-text `content` field.
 */
export function normalizeBlocks(value: unknown): BlogBlock[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is BlogBlock =>
      Boolean(item) &&
      typeof item === "object" &&
      typeof (item as { type?: unknown }).type === "string",
  );
}

/** Collect heading blocks into an ordered table-of-contents list. */
export function extractTocHeadings(blocks: BlogBlock[]): TocHeading[] {
  return blocks
    .map((block, index) =>
      block.type === "heading"
        ? {
            id: slugifyHeading(block.text, index),
            text: block.text,
            level: block.level,
          }
        : null,
    )
    .filter((heading): heading is TocHeading => heading !== null && Boolean(heading.text));
}

/**
 * Drop empty blocks and trim text before persisting. Mirrors the cleaning that
 * the project editor does for its JSON arrays (cleanArchitectureSteps, etc.).
 */
export function cleanBlocks(blocks: BlogBlock[]): BlogBlock[] {
  const cleaned: BlogBlock[] = [];

  for (const block of blocks) {
    switch (block.type) {
      case "paragraph":
        if (block.text.trim()) {
          cleaned.push({ type: "paragraph", text: block.text.trim() });
        }
        break;
      case "heading":
        if (block.text.trim()) {
          cleaned.push({ ...block, text: block.text.trim() });
        }
        break;
      case "list": {
        const items = block.items
          .map((item) => ({
            label: item.label?.trim() || undefined,
            text: item.text.trim(),
          }))
          .filter((item) => item.text);
        if (items.length) {
          cleaned.push({ type: "list", style: block.style, items });
        }
        break;
      }
      case "quote":
        if (block.text.trim()) {
          cleaned.push({
            type: "quote",
            text: block.text.trim(),
            attribution: block.attribution?.trim() || undefined,
          });
        }
        break;
      case "table": {
        const columns = block.columns.map((column) => column.trim());
        const rows = block.rows
          .map((row) => row.map((cell) => cell.trim()))
          .filter((row) => row.some(Boolean));
        if (columns.some(Boolean) && rows.length) {
          cleaned.push({ type: "table", columns, rows, tone: block.tone });
        }
        break;
      }
      case "code":
        if (block.code.trim()) {
          cleaned.push({
            type: "code",
            code: block.code,
            language: block.language?.trim() || undefined,
            filename: block.filename?.trim() || undefined,
          });
        }
        break;
      case "callout":
        if (block.title.trim() || block.text.trim()) {
          cleaned.push({
            type: "callout",
            variant: block.variant,
            title: block.title.trim(),
            text: block.text.trim(),
          });
        }
        break;
      case "imageGrid": {
        const images = block.images
          .map((image) => ({
            url: image.url.trim(),
            caption: image.caption?.trim() || undefined,
          }))
          .filter((image) => image.url);
        if (images.length) {
          cleaned.push({ type: "imageGrid", images });
        }
        break;
      }
      case "image":
        if (block.url.trim()) {
          cleaned.push({
            type: "image",
            url: block.url.trim(),
            caption: block.caption?.trim() || undefined,
          });
        }
        break;
      case "stat":
        if (block.value.trim() || block.label.trim()) {
          cleaned.push({
            type: "stat",
            value: block.value.trim(),
            label: block.label.trim(),
          });
        }
        break;
    }
  }

  return cleaned;
}

/** Strip inline markdown markers (**bold**, [text](url)) to plain text. */
function stripInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\[(.+?)\]\((.+?)\)/g, "$1");
}

/**
 * Flatten blocks into a plain-text string. Stored alongside blocks in the
 * `content` column so excerpts, SEO fallbacks and search keep working, and so
 * legacy consumers of `content` still receive readable text.
 */
export function blocksToPlainText(blocks: BlogBlock[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "paragraph":
          return stripInline(block.text);
        case "heading":
          return stripInline(block.text);
        case "list":
          return block.items
            .map((item) =>
              item.label ? `${item.label}: ${item.text}` : item.text,
            )
            .join("\n");
        case "quote":
          return block.attribution
            ? `"${block.text}" — ${block.attribution}`
            : `"${block.text}"`;
        case "table":
          return [block.columns.join(" | "), ...block.rows.map((row) => row.join(" | "))].join("\n");
        case "code":
          return block.code;
        case "callout":
          return `${block.title}. ${block.text}`;
        case "imageGrid":
          return block.images.map((image) => image.caption ?? "").filter(Boolean).join("\n");
        case "image":
          return block.caption ?? "";
        case "stat":
          return `${block.value} ${block.label}`;
        default:
          return "";
      }
    })
    .map((entry) => entry.trim())
    .filter(Boolean)
    .join("\n\n");
}
