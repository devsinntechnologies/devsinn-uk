import type { LucideIcon } from "lucide-react";
import { Check, Minus } from "lucide-react";
import { cardClass, iconChipClass } from "./PageSection";

/** Small labelled facts (timeline, price, ideal buyer…) shown under a PageHero. */
export function FactStrip({
  facts,
}: {
  facts: { icon: LucideIcon; label: string; value: string; emphasis?: boolean }[];
}) {
  const cols = facts.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  return (
    <div className={`mx-auto grid max-w-[1000px] gap-4 text-left ${cols}`}>
      {facts.map(({ icon: Icon, label, value, emphasis }) => (
        <div key={label} className={`flex items-start gap-4 p-5 sm:p-6 ${cardClass}`}>
          <span className={iconChipClass}>
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray">{label}</p>
            <p
              className={
                emphasis
                  ? "mt-1 font-display text-2xl font-semibold text-nearblack"
                  : "mt-1 text-sm leading-relaxed text-nearblack"
              }
            >
              {value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Card with a title and a ticked (or dashed) list — used for included / outcomes / problems. */
export function ListCard({
  title,
  items,
  variant = "check",
  icon: Icon,
}: {
  title: string;
  items: string[];
  variant?: "check" | "minus" | "dot";
  icon?: LucideIcon;
}) {
  return (
    <div className={`h-full p-6 sm:p-7 ${cardClass}`}>
      <div className="flex items-center gap-3">
        {Icon ? (
          <span className={iconChipClass}>
            <Icon className="h-5 w-5" aria-hidden />
          </span>
        ) : null}
        <h3 className="font-display text-lg font-semibold! text-nearblack">{title}</h3>
      </div>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray sm:text-[15px]">
            {variant === "check" ? (
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden />
            ) : variant === "minus" ? (
              <Minus className="mt-0.5 h-4 w-4 shrink-0 text-gray" aria-hidden />
            ) : (
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
