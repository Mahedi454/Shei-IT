"use client";

import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
} from "lucide-react";

import type { BlockType, BlogBlock } from "@/lib/blog-blocks";

const blockLabels: Record<BlockType, string> = {
  paragraph: "Paragraph",
  heading: "Heading",
  list: "List",
  quote: "Quote",
  table: "Table",
  code: "Code",
  callout: "Callout",
  imageGrid: "Image grid",
  image: "Image",
  stat: "Stat",
};

const blockOrder: BlockType[] = [
  "paragraph",
  "heading",
  "list",
  "quote",
  "table",
  "code",
  "callout",
  "imageGrid",
  "image",
  "stat",
];

function createBlock(type: BlockType): BlogBlock {
  switch (type) {
    case "paragraph":
      return { type, text: "" };
    case "heading":
      return { type, level: 2, text: "" };
    case "list":
      return { type, style: "bullet", items: [{ text: "" }] };
    case "quote":
      return { type, text: "", attribution: "" };
    case "table":
      return {
        type,
        columns: ["Column 1", "Column 2"],
        rows: [["", ""]],
        tone: ["default", "default"],
      };
    case "code":
      return { type, language: "", filename: "", code: "" };
    case "callout":
      return { type, variant: "info", title: "", text: "" };
    case "imageGrid":
      return { type, images: [{ url: "", caption: "" }] };
    case "image":
      return { type, url: "", caption: "" };
    case "stat":
      return { type, value: "", label: "" };
  }
}

const inputClass = "admin-input w-full";
const labelClass =
  "text-[12px] font-semibold text-[color:var(--muted-foreground)]";

function FieldLabel({ children }: { children: string }) {
  return <span className={labelClass}>{children}</span>;
}

export function BlogBlocksEditor({
  blocks,
  onChange,
}: {
  blocks: BlogBlock[];
  onChange: (blocks: BlogBlock[]) => void;
}) {
  const update = (index: number, next: BlogBlock) => {
    onChange(blocks.map((block, i) => (i === index ? next : block)));
  };

  const add = (type: BlockType) => {
    onChange([...blocks, createBlock(type)]);
  };

  const remove = (index: number) => {
    onChange(blocks.filter((_, i) => i !== index));
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) {
      return;
    }
    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[13px] font-semibold text-[color:var(--foreground)]">
            Content blocks
          </p>
          <p className="text-[11px] text-[color:var(--muted-foreground)]">
            Build the article from typed blocks. Paragraphs, list items and
            callouts support **bold** and [links](https://url).
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {blocks.map((block, index) => (
          <div
            key={index}
            className="rounded-[0.9rem] border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] p-4"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="rounded-full bg-[color:var(--button-secondary-icon)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[color:var(--primary)]">
                {blockLabels[block.type]}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--stat-border)] text-[color:var(--muted-foreground)] disabled:opacity-40"
                  aria-label="Move block up"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === blocks.length - 1}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--stat-border)] text-[color:var(--muted-foreground)] disabled:opacity-40"
                  aria-label="Move block down"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-rose-500/30 text-rose-400"
                  aria-label="Delete block"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <BlockFields block={block} onChange={(next) => update(index, next)} />
          </div>
        ))}

        {blocks.length === 0 ? (
          <p className="rounded-[0.9rem] border border-dashed border-[color:var(--stat-border)] px-4 py-6 text-center text-[12px] text-[color:var(--muted-foreground)]">
            No blocks yet. Add your first block below.
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {blockOrder.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => add(type)}
            className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--stat-border)] px-3 py-1.5 text-[12px] font-semibold text-[color:var(--foreground)] transition hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
          >
            <Plus className="h-3.5 w-3.5" />
            {blockLabels[type]}
          </button>
        ))}
      </div>
    </div>
  );
}

function BlockFields({
  block,
  onChange,
}: {
  block: BlogBlock;
  onChange: (block: BlogBlock) => void;
}) {
  switch (block.type) {
    case "paragraph":
      return (
        <textarea
          className={`${inputClass} min-h-24`}
          value={block.text}
          onChange={(event) => onChange({ ...block, text: event.target.value })}
          placeholder="Write the paragraph. Supports **bold** and [links](https://url)."
        />
      );

    case "heading":
      return (
        <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
          <label className="space-y-1.5">
            <FieldLabel>Level</FieldLabel>
            <select
              className={inputClass}
              value={block.level}
              onChange={(event) =>
                onChange({
                  ...block,
                  level: Number(event.target.value) === 3 ? 3 : 2,
                })
              }
            >
              <option value={2}>H2</option>
              <option value={3}>H3</option>
            </select>
          </label>
          <label className="space-y-1.5">
            <FieldLabel>Heading text</FieldLabel>
            <input
              className={inputClass}
              value={block.text}
              onChange={(event) =>
                onChange({ ...block, text: event.target.value })
              }
              placeholder="Section heading (appears in On this page)"
            />
          </label>
        </div>
      );

    case "list":
      return (
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <FieldLabel>Style</FieldLabel>
            <select
              className="admin-input"
              value={block.style}
              onChange={(event) =>
                onChange({
                  ...block,
                  style: event.target.value === "labeled" ? "labeled" : "bullet",
                })
              }
            >
              <option value="bullet">Bullet</option>
              <option value="labeled">Labeled (bold lead-in)</option>
            </select>
          </label>
          <div className="space-y-2">
            {block.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="grid gap-2 sm:grid-cols-[200px_1fr_auto]"
              >
                <input
                  className={inputClass}
                  value={item.label ?? ""}
                  onChange={(event) =>
                    onChange({
                      ...block,
                      items: block.items.map((current, i) =>
                        i === itemIndex
                          ? { ...current, label: event.target.value }
                          : current,
                      ),
                    })
                  }
                  placeholder="Label (optional)"
                />
                <input
                  className={inputClass}
                  value={item.text}
                  onChange={(event) =>
                    onChange({
                      ...block,
                      items: block.items.map((current, i) =>
                        i === itemIndex
                          ? { ...current, text: event.target.value }
                          : current,
                      ),
                    })
                  }
                  placeholder="List item text"
                />
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...block,
                      items: block.items.filter((_, i) => i !== itemIndex),
                    })
                  }
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rose-500/30 text-rose-400"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              onChange({ ...block, items: [...block.items, { text: "" }] })
            }
            className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--stat-border)] px-3 py-1.5 text-[12px] font-semibold text-[color:var(--foreground)]"
          >
            <Plus className="h-3.5 w-3.5" />
            Add item
          </button>
        </div>
      );

    case "quote":
      return (
        <div className="space-y-3">
          <textarea
            className={`${inputClass} min-h-20`}
            value={block.text}
            onChange={(event) =>
              onChange({ ...block, text: event.target.value })
            }
            placeholder="Pull quote text"
          />
          <input
            className={inputClass}
            value={block.attribution ?? ""}
            onChange={(event) =>
              onChange({ ...block, attribution: event.target.value })
            }
            placeholder="Attribution (optional)"
          />
        </div>
      );

    case "table":
      return <TableFields block={block} onChange={onChange} />;

    case "code":
      return (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1.5">
              <FieldLabel>Filename (optional)</FieldLabel>
              <input
                className={inputClass}
                value={block.filename ?? ""}
                onChange={(event) =>
                  onChange({ ...block, filename: event.target.value })
                }
                placeholder="module-federation.config.js"
              />
            </label>
            <label className="space-y-1.5">
              <FieldLabel>Language (optional)</FieldLabel>
              <input
                className={inputClass}
                value={block.language ?? ""}
                onChange={(event) =>
                  onChange({ ...block, language: event.target.value })
                }
                placeholder="javascript"
              />
            </label>
          </div>
          <textarea
            className={`${inputClass} min-h-32 font-mono text-[12.5px]`}
            value={block.code}
            onChange={(event) =>
              onChange({ ...block, code: event.target.value })
            }
            placeholder="Paste the code snippet"
          />
        </div>
      );

    case "callout":
      return (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-[160px_1fr]">
            <label className="space-y-1.5">
              <FieldLabel>Variant</FieldLabel>
              <select
                className={inputClass}
                value={block.variant}
                onChange={(event) =>
                  onChange({
                    ...block,
                    variant:
                      event.target.value === "warning" ? "warning" : "info",
                  })
                }
              >
                <option value="info">Info (primary)</option>
                <option value="warning">Warning (amber)</option>
              </select>
            </label>
            <label className="space-y-1.5">
              <FieldLabel>Title</FieldLabel>
              <input
                className={inputClass}
                value={block.title}
                onChange={(event) =>
                  onChange({ ...block, title: event.target.value })
                }
                placeholder="The Cost of Autonomy"
              />
            </label>
          </div>
          <textarea
            className={`${inputClass} min-h-20`}
            value={block.text}
            onChange={(event) =>
              onChange({ ...block, text: event.target.value })
            }
            placeholder="Callout body text"
          />
        </div>
      );

    case "imageGrid":
      return (
        <div className="space-y-3">
          {block.images.map((image, imageIndex) => (
            <div
              key={imageIndex}
              className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]"
            >
              <input
                className={inputClass}
                value={image.url}
                onChange={(event) =>
                  onChange({
                    ...block,
                    images: block.images.map((current, i) =>
                      i === imageIndex
                        ? { ...current, url: event.target.value }
                        : current,
                    ),
                  })
                }
                placeholder="Image URL"
              />
              <input
                className={inputClass}
                value={image.caption ?? ""}
                onChange={(event) =>
                  onChange({
                    ...block,
                    images: block.images.map((current, i) =>
                      i === imageIndex
                        ? { ...current, caption: event.target.value }
                        : current,
                    ),
                  })
                }
                placeholder="Caption (optional)"
              />
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...block,
                    images: block.images.filter((_, i) => i !== imageIndex),
                  })
                }
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rose-500/30 text-rose-400"
                aria-label="Remove image"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              onChange({
                ...block,
                images: [...block.images, { url: "", caption: "" }],
              })
            }
            className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--stat-border)] px-3 py-1.5 text-[12px] font-semibold text-[color:var(--foreground)]"
          >
            <Plus className="h-3.5 w-3.5" />
            Add image
          </button>
        </div>
      );

    case "image":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-1.5">
            <FieldLabel>Image URL</FieldLabel>
            <input
              className={inputClass}
              value={block.url}
              onChange={(event) =>
                onChange({ ...block, url: event.target.value })
              }
              placeholder="https://..."
            />
          </label>
          <label className="space-y-1.5">
            <FieldLabel>Caption (optional)</FieldLabel>
            <input
              className={inputClass}
              value={block.caption ?? ""}
              onChange={(event) =>
                onChange({ ...block, caption: event.target.value })
              }
              placeholder="Image caption"
            />
          </label>
        </div>
      );

    case "stat":
      return (
        <div className="grid gap-3 sm:grid-cols-[160px_1fr]">
          <label className="space-y-1.5">
            <FieldLabel>Value</FieldLabel>
            <input
              className={inputClass}
              value={block.value}
              onChange={(event) =>
                onChange({ ...block, value: event.target.value })
              }
              placeholder="63%"
            />
          </label>
          <label className="space-y-1.5">
            <FieldLabel>Label</FieldLabel>
            <input
              className={inputClass}
              value={block.label}
              onChange={(event) =>
                onChange({ ...block, label: event.target.value })
              }
              placeholder="Average reduction in deployment lead time…"
            />
          </label>
        </div>
      );

    default:
      return null;
  }
}

function TableFields({
  block,
  onChange,
}: {
  block: Extract<BlogBlock, { type: "table" }>;
  onChange: (block: BlogBlock) => void;
}) {
  const setColumn = (index: number, value: string) => {
    onChange({
      ...block,
      columns: block.columns.map((column, i) => (i === index ? value : column)),
    });
  };

  const setTone = (index: number, value: string) => {
    const tone = [...(block.tone ?? block.columns.map(() => "default"))];
    tone[index] = value === "pro" || value === "con" ? value : "default";
    onChange({ ...block, tone: tone as ("default" | "pro" | "con")[] });
  };

  const addColumn = () => {
    onChange({
      ...block,
      columns: [...block.columns, `Column ${block.columns.length + 1}`],
      rows: block.rows.map((row) => [...row, ""]),
      tone: [...(block.tone ?? block.columns.map(() => "default")), "default"],
    });
  };

  const removeColumn = (index: number) => {
    if (block.columns.length <= 1) {
      return;
    }
    onChange({
      ...block,
      columns: block.columns.filter((_, i) => i !== index),
      rows: block.rows.map((row) => row.filter((_, i) => i !== index)),
      tone: (block.tone ?? []).filter((_, i) => i !== index),
    });
  };

  const setCell = (rowIndex: number, cellIndex: number, value: string) => {
    onChange({
      ...block,
      rows: block.rows.map((row, i) =>
        i === rowIndex
          ? row.map((cell, j) => (j === cellIndex ? value : cell))
          : row,
      ),
    });
  };

  const addRow = () => {
    onChange({ ...block, rows: [...block.rows, block.columns.map(() => "")] });
  };

  const removeRow = (index: number) => {
    onChange({ ...block, rows: block.rows.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-3">
      <FieldLabel>Columns</FieldLabel>
      <div className="space-y-2">
        {block.columns.map((column, index) => (
          <div key={index} className="grid gap-2 sm:grid-cols-[1fr_140px_auto]">
            <input
              className={inputClass}
              value={column}
              onChange={(event) => setColumn(index, event.target.value)}
              placeholder="Column name"
            />
            <select
              className={inputClass}
              value={block.tone?.[index] ?? "default"}
              onChange={(event) => setTone(index, event.target.value)}
            >
              <option value="default">Default</option>
              <option value="pro">Pros (green)</option>
              <option value="con">Cons (red)</option>
            </select>
            <button
              type="button"
              onClick={() => removeColumn(index)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rose-500/30 text-rose-400"
              aria-label="Remove column"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addColumn}
        className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--stat-border)] px-3 py-1.5 text-[12px] font-semibold text-[color:var(--foreground)]"
      >
        <Plus className="h-3.5 w-3.5" />
        Add column
      </button>

      <FieldLabel>Rows</FieldLabel>
      <div className="space-y-2">
        {block.rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap items-center gap-2">
            {row.map((cell, cellIndex) => (
              <input
                key={cellIndex}
                className="admin-input min-w-[120px] flex-1"
                value={cell}
                onChange={(event) =>
                  setCell(rowIndex, cellIndex, event.target.value)
                }
                placeholder={block.columns[cellIndex] || `Cell ${cellIndex + 1}`}
              />
            ))}
            <button
              type="button"
              onClick={() => removeRow(rowIndex)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rose-500/30 text-rose-400"
              aria-label="Remove row"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addRow}
        className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--stat-border)] px-3 py-1.5 text-[12px] font-semibold text-[color:var(--foreground)]"
      >
        <Plus className="h-3.5 w-3.5" />
        Add row
      </button>
    </div>
  );
}
