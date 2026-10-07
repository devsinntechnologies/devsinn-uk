"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "md" | "lg" | "xl";

type SharedProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

type ButtonAsButtonProps = SharedProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

type ButtonAsLinkProps = SharedProps & {
  href: string;
  onClick?: () => void;
  type?: never;
  disabled?: boolean;
};

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

function getVariantClasses(variant: ButtonVariant) {
  if (variant === "secondary") {
    return "border border-stone bg-offwhite text-nearblack hover:border-teal hover:text-teal";
  }

  if (variant === "outline") {
    return "border border-stone bg-offwhite text-nearblack hover:border-teal hover:text-teal";
  }

  return "bg-teal text-offwhite border border-teal hover:border-nearblack btn-sweep sweep-secondary";
}

function getSizeClasses(size: ButtonSize) {
  if (size === "md") {
    return "min-h-[48px] px-6 text-[15px]";
  }

  if (size === "xl") {
    return "min-h-[74px] px-10 text-[18px]";
  }
  return "min-h-[56px] px-8 text-[16px]";
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
  );
}

export default function Button(props: ButtonProps) {
  const {
    id,
    children,
    className = "",
    fullWidth = false,
    loading = false,
    loadingLabel = "Loading",
    size = "lg",
    variant = "primary",
    disabled = false,
  } = props;

  const isDisabled = disabled || loading;
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none",
    "focus-visible:ring-4 focus-visible:ring-teal/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
    "disabled:pointer-events-none disabled:opacity-70",
    fullWidth ? "w-full" : "",
    getVariantClasses(variant),
    getSizeClasses(size),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2">
      {loading ? <Spinner /> : null}
      <span className="inline-flex items-center gap-2 whitespace-nowrap">{loading ? loadingLabel : children}</span>
    </span>
  );

  if ("href" in props && props.href) {
    return (
      <Link
        id={id}
        href={props.href}
        onClick={props.onClick}
        aria-busy={loading}
        aria-disabled={isDisabled}
        className={`${classes} ${isDisabled ? "pointer-events-none" : ""}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      id={id}
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={isDisabled}
      aria-busy={loading}
      className={classes}
    >
      {content}
    </button>
  );
}
