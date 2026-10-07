import { Bot, Code2, MonitorCog, Sparkles, Wrench } from "lucide-react";

/** Icon for a service slug (matches the home OurServices cards). */
export default function ServiceIcon({ slug, className = "h-5 w-5" }: { slug: string; className?: string }) {
  switch (slug) {
    case "ai-automation":
      return <Bot className={className} aria-hidden />;
    case "saas-mvp":
      return <MonitorCog className={className} aria-hidden />;
    case "software-development":
      return <Code2 className={className} aria-hidden />;
    case "app-rescue-maintenance":
      return <Wrench className={className} aria-hidden />;
    default:
      return <Sparkles className={className} aria-hidden />;
  }
}
