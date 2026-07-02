import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { AlertTriangle, Info } from "lucide-react";

import { slugifyHeading, type BlogBlock } from "@/lib/blog-blocks";

/**
 * Render a small subset of inline markdown (**bold** and [text](url)) into
 * React nodes. Keeps the authoring experience light without pulling in a full
 * markdown dependency.
 */
function renderInline(text: string): ReactNode {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(
        <Fragment key={`t-${key++}`}>{text.slice(lastIndex, match.index)}</Fragment>,
      );
    }

    if (match[2] !== undefined) {
      nodes.push(
        <strong key={`b-${key++}`} className="font-semibold text-[color:var(--foreground)]">
          {match[2]}
        </strong>,
      );
    } else if (match[3] !== undefined && match[4] !== undefined) {
      const href = match[4];
      const external = /^https?:\/\//.test(href);
      nodes.push(
        <Link
          key={`l-${key++}`}
          href={href}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          className="font-semibold text-[color:var(--primary)] underline decoration-[color:var(--primary)]/40 underline-offset-4 hover:decoration-[color:var(--primary)]"
        >
          {match[3]}
        </Link>,
      );
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(<Fragment key={`t-${key++}`}>{text.slice(lastIndex)}</Fragment>);
  }

  return nodes;
}

function toneClass(tone?: string) {
  if (tone === "pro") {
    return "text-emerald-600 dark:text-emerald-400";
  }
  if (tone === "con") {
    return "text-rose-500 dark:text-rose-400";
  }
  return "text-[color:var(--muted-foreground)]";
}

function Block({ block, index }: { block: BlogBlock; index: number }) {
  switch (block.type) {
    case "heading": {
      const id = slugifyHeading(block.text, index);
      const className =
        block.level === 3
          ? "scroll-mt-28 text-[19px] font-semibold text-[color:var(--foreground)]"
          : "scroll-mt-28 text-[24px] font-bold text-[color:var(--foreground)]";
      return block.level === 3 ? (
        <h3 id={id} className={className}>
          {renderInline(block.text)}
        </h3>
      ) : (
        <h2 id={id} className={className}>
          {renderInline(block.text)}
        </h2>
      );
    }

    case "paragraph":
      return (
        <p className="text-[15px] leading-8 text-[color:var(--muted-foreground)]">
          {renderInline(block.text)}
        </p>
      );

    case "list":
      return (
        <ul className="space-y-3 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex} className="flex gap-3">
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--primary)]" />
              <span>
                {item.label ? (
                  <span className="font-semibold text-[color:var(--foreground)]">
                    {item.label}:{" "}
                  </span>
                ) : null}
                {renderInline(item.text)}
              </span>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote className="rounded-[1rem] border border-[color:var(--stat-border)] bg-[color:var(--premium-pill)] px-6 py-5">
          <p className="border-l-2 border-[color:var(--primary)] pl-4 text-[17px] font-medium italic leading-8 text-[color:var(--foreground)]">
            {renderInline(block.text)}
          </p>
          {block.attribution ? (
            <footer className="mt-3 pl-4 text-[12px] font-bold uppercase tracking-[0.14em] text-[color:var(--primary)]">
              {block.attribution}
            </footer>
          ) : null}
        </blockquote>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-[1rem] border border-[color:var(--stat-border)]">
          <table className="w-full border-collapse text-left text-[13px]">
            <thead>
              <tr className="bg-[color:var(--premium-pill)]">
                {block.columns.map((column, columnIndex) => (
                  <th
                    key={columnIndex}
                    className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[color:var(--foreground)]"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-t border-[color:var(--stat-border)]"
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`px-4 py-3 leading-6 ${
                        cellIndex === 0
                          ? "font-semibold text-[color:var(--foreground)]"
                          : toneClass(block.tone?.[cellIndex])
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "code":
      return (
        <div className="overflow-hidden rounded-[1rem] border border-[color:var(--stat-border)] bg-[color:var(--cta-dark)] text-slate-100 shadow-[var(--shadow-soft)]">
          {block.filename ? (
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-2">{block.filename}</span>
            </div>
          ) : null}
          <pre className="overflow-x-auto px-4 py-4 text-[12.5px] leading-6">
            <code className="font-[var(--font-geist-mono),monospace]">{block.code}</code>
          </pre>
        </div>
      );

    case "callout": {
      const warning = block.variant === "warning";
      const Icon = warning ? AlertTriangle : Info;
      return (
        <div
          className={`flex gap-3 rounded-[1rem] border px-5 py-4 ${
            warning
              ? "border-amber-400/40 bg-amber-400/10"
              : "border-[color:var(--primary)]/30 bg-[color:var(--button-secondary-icon)]"
          }`}
        >
          <Icon
            className={`mt-0.5 h-5 w-5 shrink-0 ${
              warning ? "text-amber-500" : "text-[color:var(--primary)]"
            }`}
          />
          <div className="space-y-1">
            <p className="text-[13px] font-bold text-[color:var(--foreground)]">
              {block.title}
            </p>
            <p className="text-[13px] leading-6 text-[color:var(--muted-foreground)]">
              {renderInline(block.text)}
            </p>
          </div>
        </div>
      );
    }

    case "imageGrid":
      return (
        <div
          className={`grid gap-4 ${
            block.images.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"
          }`}
        >
          {block.images.map((image, imageIndex) => (
            <figure key={imageIndex} className="space-y-2">
              <img
                src={image.url}
                alt={image.caption || "Article visual"}
                className="aspect-[16/10] w-full rounded-[0.9rem] border border-[color:var(--stat-border)] object-cover"
                loading="lazy"
              />
              {image.caption ? (
                <figcaption className="text-center text-[12px] text-[color:var(--muted-foreground)]">
                  {image.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      );

    case "image":
      return (
        <figure className="space-y-2">
          <img
            src={block.url}
            alt={block.caption || "Article visual"}
            className="w-full rounded-[1rem] border border-[color:var(--stat-border)] object-cover"
            loading="lazy"
          />
          {block.caption ? (
            <figcaption className="text-center text-[12px] text-[color:var(--muted-foreground)]">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );

    case "stat":
      return (
        <div className="rounded-[1rem] border border-[color:var(--stat-border)] bg-[color:var(--premium-pill)] px-6 py-8 text-center">
          <p className="text-[40px] font-bold leading-none text-[color:var(--primary)]">
            {block.value}
          </p>
          <p className="mx-auto mt-3 max-w-md text-[14px] leading-7 text-[color:var(--muted-foreground)]">
            {block.label}
          </p>
        </div>
      );

    default:
      return null;
  }
}

export function ArticleContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => (
        <Block key={index} block={block} index={index} />
      ))}
    </div>
  );
}
