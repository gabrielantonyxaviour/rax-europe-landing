"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  SectionWrapper,
  SectionHeader,
} from "@/components/shared/section-wrapper";
import { EvervaultBackground } from "@/components/ui/evervault-background";
import { BUSINESS_DOMAINS } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Map domain IDs to translation keys
const domainTranslationKeys: Record<string, string> = {
  "iot": "iot",
  "e-surveillance": "eSurveillance",
  "software": "software",
  "marine-technology": "marineTechnology",
  "hse": "hse",
  "automation": "automation",
};

function BentoCard({
  domain,
  index,
  className,
  exploreText,
  translations,
}: {
  domain: (typeof BUSINESS_DOMAINS)[number];
  index: number;
  className?: string;
  exploreText: string;
  translations: {
    title: string;
    headline: string;
    description: string;
    offerings: string[];
  };
}) {
  const imageSrc = domain.image;

  return (
    <Link href={domain.route} className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className={cn(
          "group relative overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card transition-all duration-300 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 cursor-default select-none h-full flex flex-col",
          className
        )}
      >
        {/* Image Header */}
        <div className="relative h-28 sm:h-32 md:h-40 overflow-hidden flex-shrink-0">
          <Image
            src={imageSrc}
            alt={translations.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        </div>

        {/* Content */}
        <EvervaultBackground containerClassName="-mt-6 sm:-mt-8 relative z-10 flex-1 flex flex-col" className="p-3 sm:p-4 md:p-6 flex flex-col flex-1">
          {/* Title */}
          <h3 className="text-sm sm:text-base md:text-xl font-semibold mb-1 sm:mb-2 group-hover:text-white transition-colors">
            {translations.title}
          </h3>

          {/* Headline */}
          <p className="text-[10px] sm:text-xs md:text-sm text-accent group-hover:text-red-300 font-medium mb-2 sm:mb-3 line-clamp-1 transition-colors">
            {translations.headline}
          </p>

          {/* Description - hidden on mobile */}
          <p className="hidden sm:block text-xs md:text-sm text-muted-foreground group-hover:text-neutral-300 mb-3 md:mb-4 line-clamp-2 transition-colors">
            {translations.description}
          </p>

          {/* Offerings - show only on md+ */}
          <ul className="hidden md:block space-y-1.5 mb-4 flex-1">
            {translations.offerings.slice(0, 2).map((offering) => (
              <li
                key={offering}
                className="text-xs text-muted-foreground group-hover:text-neutral-300 flex items-center transition-colors"
              >
                <span className="w-1 h-1 rounded-full bg-accent group-hover:bg-red-400 mr-2 flex-shrink-0 transition-colors" />
                {offering}
              </li>
            ))}
          </ul>

          {/* Link - pinned to bottom */}
          <div className="flex items-center text-xs sm:text-sm font-medium text-accent group-hover:text-white transition-colors mt-auto">
            {exploreText}
            <ArrowRight className="ml-1 sm:ml-2 h-3 sm:h-4 w-3 sm:w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </EvervaultBackground>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </Link>
  );
}

export function Domains() {
  const t = useTranslations("domains");
  const tCommon = useTranslations("common");
  const tProducts = useTranslations("products");

  // Get translations for each domain
  const getTranslationsForDomain = (domainId: string) => {
    const key = domainTranslationKeys[domainId] || domainId;
    return {
      title: tProducts(`${key}.title`),
      headline: tProducts(`${key}.headline`),
      description: tProducts(`${key}.description`),
      offerings: [
        tProducts(`${key}.offerings.1`),
        tProducts(`${key}.offerings.2`),
        tProducts(`${key}.offerings.3`),
        tProducts(`${key}.offerings.4`),
      ],
    };
  };

  return (
    <SectionWrapper id="domains" className="overflow-hidden">
      <SectionHeader
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* Grid Layout: 2 col mobile, 2 cols tablet, 3 cols desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 auto-rows-fr">
        {BUSINESS_DOMAINS.map((domain, index) => (
          <BentoCard
            key={domain.id}
            domain={domain}
            index={index}
            exploreText={tCommon("explore")}
            translations={getTranslationsForDomain(domain.id)}
          />
        ))}
      </div>

    </SectionWrapper>
  );
}
