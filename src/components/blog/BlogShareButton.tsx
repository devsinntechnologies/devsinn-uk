"use client";

import { Check, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";

type BlogShareButtonProps = {
  title: string;
  excerpt: string;
  className?: string;
};

export default function BlogShareButton({ title, excerpt, className = "" }: BlogShareButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title, text: excerpt, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Share sheet dismissed or clipboard blocked — nothing to do.
    }
  };

  return (
    <Button
      variant="secondary"
      size="md"
      className={`bg-white! ${className}`}
      onClick={() => void handleShare()}
    >
      <span className="inline-flex items-center gap-2">
        {copied ? <Check size={16} aria-hidden /> : <Share2 size={16} aria-hidden />}
        <span aria-live="polite">{copied ? "Link copied" : "Share article"}</span>
      </span>
    </Button>
  );
}
