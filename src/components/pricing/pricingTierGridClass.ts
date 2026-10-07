/** Grid classes for a set of tier cards — a single tier gets a wide, centred two-column card. */
export function pricingTierGridClass(count: number): string {
  return `grid gap-5 ${count === 1 ? "mx-auto max-w-[760px]" : "sm:grid-cols-2 xl:grid-cols-4"}`;
}
