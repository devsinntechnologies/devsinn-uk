"use client";

type DividerProps = {
  className?: string;
};

export default function Divider({ className = "" }: DividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`h-px w-full bg-stone ${className}`}
    />
  );
}
