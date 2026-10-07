import PageHero, { PageHeroAccent } from "@/components/ui/PageHero";

export default function Hero() {
  return (
    <PageHero
      badge="Contact Us"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      title={
        <>
          Let&apos;s build <PageHeroAccent>something great</PageHeroAccent>
        </>
      }
      description="Tell us what you want to build, automate or fix. A real person on our team reads every message and replies within 1 business day."
      compact
    />
  );
}
