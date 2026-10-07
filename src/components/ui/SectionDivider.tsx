"use client";

type Props = {
  variant?: "light" | "dark";
};

export default function SectionDivider({ variant = "light" }: Props) {
  return (
    <div
      className={`absolute top-0 left-0 right-0 z-0 h-px pointer-events-none ${
        variant === "dark"
          ? "bg-gradient-to-r from-transparent via-white/12 to-transparent"
          : "bg-stone"
      }`}
    />
  );
}
