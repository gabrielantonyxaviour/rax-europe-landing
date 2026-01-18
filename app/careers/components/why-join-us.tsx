"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

const benefitKeys = [
  {
    key: "innovation",
    titleKey: "innovationFirst",
    descriptionKey: "innovationDescription",
    image: "/careers/innovation.png",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    key: "growth",
    titleKey: "growthOpportunities",
    descriptionKey: "growthDescription",
    image: "/careers/growth-opportunities.png",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    key: "balance",
    titleKey: "workLifeBalance",
    descriptionKey: "workLifeDescription",
    image: "/careers/work-life-balance.png",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    key: "impact",
    titleKey: "globalImpact",
    descriptionKey: "globalDescription",
    image: "/careers/global-impact.png",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    key: "culture",
    titleKey: "collaborativeCulture",
    descriptionKey: "collaborativeDescription",
    image: "/careers/collabrative-culture.png",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    key: "benefits",
    titleKey: "competitiveBenefits",
    descriptionKey: "benefitsDescription",
    image: "/careers/competitive-benefits.png",
    className: "md:col-span-2 md:row-span-1",
  },
];

export function WhyJoinUs() {
  const t = useTranslations("careers");

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {t("whyJoinTitle")} <span className="text-accent">{t("whyJoinHighlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("whyJoinSubtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[180px]">
          {benefitKeys.map((benefit, index) => (
            <motion.div
              key={benefit.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl ${benefit.className}`}
            >
              {/* Background Image */}
              <Image
                src={benefit.image}
                alt={t(benefit.titleKey)}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-1">
                  {t(benefit.titleKey)}
                </h3>
                <p className="text-white/80 text-sm line-clamp-2">
                  {t(benefit.descriptionKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
