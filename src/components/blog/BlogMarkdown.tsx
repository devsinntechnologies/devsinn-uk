import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type MarkdownBlock =
  | { type: "heading"; level: 2 | 3 | 4; content: string; id: string }
  | { type: "paragraph"; content: string }
  | { type: "list"; ordered: boolean; start: number; items: string[] }
  | { type: "quote"; content: string }
  | { type: "code"; lang: string; content: string }
  | { type: "table"; header: string[]; rows: string[][] }
  | { type: "image"; alt: string; src: string }
  | { type: "hr" };

export type MarkdownHeading = { id: string; text: string; level: 2 | 3 | 4 };

const IMAGE_RE = /^!\[(.*)\]\((.+)\)$/;
const HEADING_RE = /^(#{1,4})\s+(.*)$/;
const UL_RE = /^[-*+]\s+/;
const OL_RE = /^(\d+)[.)]\s+/;
const TABLE_SEP_RE = /^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?$/;

const stripInline = (text: string) =>
  text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*`]/g, "");

export const slugifyHeading = (text: string) =>
  stripInline(text)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const splitRow = (line: string) =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());

const isBlockStart = (line: string, next?: string) =>
  !line ||
  line === "---" ||
  line === "***" ||
  line.startsWith("```") ||
  line.startsWith(">") ||
  UL_RE.test(line) ||
  OL_RE.test(line) ||
  IMAGE_RE.test(line) ||
  HEADING_RE.test(line) ||
  (line.startsWith("|") && !!next && TABLE_SEP_RE.test(next.trim()));

function parseMarkdown(content: string): MarkdownBlock[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  const usedIds = new Map<string, number>();
  let index = 0;

  const uniqueId = (text: string) => {
    const base = slugifyHeading(text) || "section";
    const seen = usedIds.get(base) ?? 0;
    usedIds.set(base, seen + 1);
    return seen ? `${base}-${seen}` : base;
  };

  while (index < lines.length) {
    const line = lines[index]?.trim() ?? "";

    if (!line) {
      index += 1;
      continue;
    }

    if (line === "---" || line === "***") {
      blocks.push({ type: "hr" });
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }
      index += 1; // closing fence
      blocks.push({ type: "code", lang, content: codeLines.join("\n") });
      continue;
    }

    const imageMatch = line.match(IMAGE_RE);
    if (imageMatch) {
      blocks.push({ type: "image", alt: imageMatch[1], src: imageMatch[2] });
      index += 1;
      continue;
    }

    const headingMatch = line.match(HEADING_RE);
    if (headingMatch) {
      // A single "#" inside the body would be a second h1 — render it as h2.
      const level = Math.max(2, headingMatch[1].length) as 2 | 3 | 4;
      blocks.push({
        type: "heading",
        level,
        content: headingMatch[2],
        id: uniqueId(headingMatch[2]),
      });
      index += 1;
      continue;
    }

    if (line.startsWith(">")) {
      const quoteLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push({ type: "quote", content: quoteLines.join(" ") });
      continue;
    }

    if (line.startsWith("|") && TABLE_SEP_RE.test(lines[index + 1]?.trim() ?? "")) {
      const header = splitRow(line);
      const rows: string[][] = [];
      index += 2;
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(splitRow(lines[index]));
        index += 1;
      }
      blocks.push({ type: "table", header, rows });
      continue;
    }

    const isOrdered = OL_RE.test(line);
    if (isOrdered || UL_RE.test(line)) {
      const itemRe = isOrdered ? OL_RE : UL_RE;
      const start = isOrdered ? Number(line.match(OL_RE)?.[1] ?? 1) : 1;
      const items: string[] = [];
      while (index < lines.length) {
        const current = lines[index].trim();
        if (itemRe.test(current)) {
          items.push(current.replace(itemRe, ""));
          index += 1;
          continue;
        }
        // Blank lines between items of the same list keep the list going.
        if (!current && itemRe.test(lines[index + 1]?.trim() ?? "")) {
          index += 1;
          continue;
        }
        break;
      }
      blocks.push({ type: "list", ordered: isOrdered, start, items });
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length) {
      const currentLine = lines[index]?.trim() ?? "";
      if (paragraphLines.length > 0 && isBlockStart(currentLine, lines[index + 1])) break;
      if (!currentLine) break;
      paragraphLines.push(currentLine);
      index += 1;
    }

    if (paragraphLines.length > 0) {
      blocks.push({ type: "paragraph", content: paragraphLines.join(" ") });
    }
  }

  return blocks;
}

/** h2/h3 headings in the article, for an "On this page" outline. */
export function getMarkdownHeadings(content: string, maxLevel: 2 | 3 = 2): MarkdownHeading[] {
  return parseMarkdown(content)
    .filter(
      (block): block is Extract<MarkdownBlock, { type: "heading" }> =>
        block.type === "heading" && block.level <= maxLevel
    )
    .map((block) => ({ id: block.id, text: stripInline(block.content), level: block.level }));
}

const INLINE_RE = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\)|\*[^*\s][^*]*\*)/g;

function renderInline(text: string, keyPrefix = "i"): ReactNode[] {
  return text
    .split(INLINE_RE)
    .filter(Boolean)
    .map((segment, index) => {
      const key = `${keyPrefix}-${index}`;

      if (segment.startsWith("`") && segment.endsWith("`") && segment.length > 2) {
        return (
          <code
            key={key}
            className="rounded-md border border-stone bg-[#f4f7f9] px-1.5 py-0.5 font-mono text-[0.88em] text-nearblack"
          >
            {segment.slice(1, -1)}
          </code>
        );
      }

      const strong = segment.match(/^\*\*(.+)\*\*$/);
      if (strong) {
        return (
          <strong key={key} className="font-semibold text-nearblack">
            {renderInline(strong[1], key)}
          </strong>
        );
      }

      const link = segment.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      if (link) {
        const [, label, href] = link;
        const className =
          "font-medium text-teal underline decoration-teal/30 underline-offset-4 transition-colors hover:decoration-teal";
        const isInternal = href.startsWith("/") || href.startsWith("#");
        return isInternal ? (
          <Link key={key} href={href} className={className}>
            {renderInline(label, key)}
          </Link>
        ) : (
          <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={className}>
            {renderInline(label, key)}
          </a>
        );
      }

      const em = segment.match(/^\*([^*]+)\*$/);
      if (em) {
        return (
          <em key={key} className="italic">
            {renderInline(em[1], key)}
          </em>
        );
      }

      return <span key={key}>{segment}</span>;
    });
}

const headingClass: Record<2 | 3 | 4, string> = {
  2: "mt-14 scroll-mt-28 border-t border-stone pt-10 font-display text-[1.6rem] font-semibold! leading-[1.25] tracking-[-0.02em] text-nearblack first:mt-0 first:border-t-0 first:pt-0 sm:text-[1.85rem]",
  3: "mt-10 scroll-mt-28 font-display text-[1.3rem] font-semibold! leading-snug tracking-[-0.01em] text-nearblack sm:text-[1.4rem]",
  4: "mt-8 scroll-mt-28 font-display text-[1.1rem] font-semibold! leading-snug text-nearblack",
};

/**
 * Lightweight markdown renderer for blog posts: headings (with anchor ids),
 * paragraphs, ordered/unordered lists, blockquotes, fenced code, tables,
 * images, rules and inline bold/italic/code/links.
 */
export default function BlogMarkdown({ content }: { content: string }) {
  const blocks = parseMarkdown(content);

  return (
    <div className="text-[1.0625rem] leading-[1.8] text-gray space-y-6">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        switch (block.type) {
          case "heading": {
            const Tag = `h${block.level}` as "h2" | "h3" | "h4";
            return (
              <Tag key={key} id={block.id} className={headingClass[block.level]}>
                {renderInline(block.content, key)}
              </Tag>
            );
          }

          case "list": {
            if (block.ordered) {
              return (
                <ol key={key} start={block.start} className="space-y-3 pl-1">
                  {block.items.map((item, itemIndex) => (
                    <li key={`${key}-${itemIndex}`} className="flex gap-3.5">
                      <span className="mt-[3px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/10 text-[12px] font-semibold leading-none text-teal">
                        {block.start + itemIndex}
                      </span>
                      <span className="min-w-0">{renderInline(item, `${key}-${itemIndex}`)}</span>
                    </li>
                  ))}
                </ol>
              );
            }
            return (
              <ul key={key} className="space-y-3 pl-1">
                {block.items.map((item, itemIndex) => (
                  <li key={`${key}-${itemIndex}`} className="flex gap-3.5">
                    <span
                      aria-hidden
                      className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-teal to-[#7B9CFF]"
                    />
                    <span className="min-w-0">{renderInline(item, `${key}-${itemIndex}`)}</span>
                  </li>
                ))}
              </ul>
            );
          }

          case "quote":
            return (
              <blockquote
                key={key}
                className="rounded-r-xl border-l-4 border-teal bg-teal/[0.05] py-4 pl-5 pr-5 text-[1.1rem] italic leading-relaxed text-nearblack"
              >
                {renderInline(block.content, key)}
              </blockquote>
            );

          case "code":
            return (
              <div key={key} className="overflow-hidden rounded-xl border border-stone bg-[#f4f7f9]">
                {block.lang ? (
                  <div className="border-b border-stone px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-gray">
                    {block.lang}
                  </div>
                ) : null}
                <pre className="overflow-x-auto p-4 font-mono text-[0.85rem] leading-relaxed text-nearblack">
                  <code>{block.content}</code>
                </pre>
              </div>
            );

          case "table":
            return (
              <div key={key} className="overflow-x-auto rounded-xl border border-stone">
                <table className="w-full min-w-[480px] border-collapse text-left text-[0.95rem]">
                  <thead className="bg-[#f4f7f9]">
                    <tr>
                      {block.header.map((cell, cellIndex) => (
                        <th
                          key={`${key}-h-${cellIndex}`}
                          className="border-b border-stone px-4 py-3 font-semibold text-nearblack"
                        >
                          {renderInline(cell, `${key}-h-${cellIndex}`)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={`${key}-r-${rowIndex}`} className="even:bg-offwhite">
                        {row.map((cell, cellIndex) => (
                          <td
                            key={`${key}-r-${rowIndex}-${cellIndex}`}
                            className="border-b border-stone px-4 py-3 align-top last:border-b-0"
                          >
                            {renderInline(cell, `${key}-r-${rowIndex}-${cellIndex}`)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "image":
            return (
              <figure key={key} className="my-10!">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-stone bg-[#f4f7f9]">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, 720px"
                    className="object-cover"
                  />
                </div>
                {block.alt ? (
                  <figcaption className="mt-3 text-center text-[13px] text-gray">{block.alt}</figcaption>
                ) : null}
              </figure>
            );

          case "hr":
            return (
              <hr
                key={key}
                className="my-12! h-px border-0 bg-gradient-to-r from-transparent via-stone to-transparent"
              />
            );

          default:
            return <p key={key}>{renderInline(block.content, key)}</p>;
        }
      })}
    </div>
  );
}
