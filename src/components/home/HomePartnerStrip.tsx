"use client";

import Image from "next/image";
import SectionDivider from "@/components/ui/SectionDivider";

const partners = [
  { name: "OpenAI", file: "openai.svg" },
  { name: "Anthropic", file: "anthropic.svg" },
  { name: "Microsoft Azure", file: "microsoftazure.svg" },
  { name: "Meta", file: "meta.svg" },
  { name: "Google Cloud", file: "googlecloud.svg" },
  { name: "AWS", file: "amazonwebservices.svg" },
];

export default function HomePartnerStrip() {
  return (
    <section className="relative border-b border-stone bg-white py-10 sm:py-12">
      <SectionDivider />
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <p className="mb-8 text-center text-sm font-medium text-gray sm:text-base">
          Certified and recognised by the world&apos;s leading technology platforms
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex h-10 w-[120px] items-center justify-center opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-11 sm:w-[130px]"
            >
              <Image
                src={`/images/tech/${partner.file}`}
                alt={partner.name}
                width={120}
                height={40}
                className="h-8 w-auto max-w-[120px] object-contain sm:h-9"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
