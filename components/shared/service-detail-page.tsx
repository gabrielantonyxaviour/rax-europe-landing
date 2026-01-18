"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { trackServiceView, trackCTA } from "@/lib/analytics";
import {
  CircuitBoard,
  Code,
  Factory,
  Users,
  Brain,
  Blocks,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Search,
  Map,
  Zap,
  Rocket,
  LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { GridPattern } from "@/components/ui/grid-pattern";
import { EvervaultBackground } from "@/components/ui/evervault-background";
import { SERVICES, COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  CircuitBoard,
  Code,
  Factory,
  Users,
  Brain,
  Blocks,
};

// Service-specific accent colors
const serviceColors: Record<string, { gradient: string; glow: string }> = {
  "embedded-design": {
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    glow: "hsl(200 80% 50% / 0.15)",
  },
  "software-development": {
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    glow: "hsl(270 80% 50% / 0.15)",
  },
  ai: {
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    glow: "hsl(160 80% 50% / 0.15)",
  },
  blockchain: {
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    glow: "hsl(30 80% 50% / 0.15)",
  },
  "oem-odm": {
    gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    glow: "hsl(350 80% 50% / 0.15)",
  },
  staffing: {
    gradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
    glow: "hsl(230 80% 50% / 0.15)",
  },
};

// Process steps with icons
const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "Deep dive into your requirements, goals, and technical constraints",
    Icon: Search,
  },
  {
    step: "02",
    title: "Strategy",
    description: "Detailed roadmap with milestones, deliverables, and timelines",
    Icon: Map,
  },
  {
    step: "03",
    title: "Execution",
    description: "Agile development with regular updates and quality checkpoints",
    Icon: Zap,
  },
  {
    step: "04",
    title: "Delivery",
    description: "Comprehensive testing, deployment, and ongoing support",
    Icon: Rocket,
  },
];

// Generate descriptions for capabilities based on the capability name
function getCapabilityDescription(capability: string): string {
  const descriptions: Record<string, string> = {
    // Embedded Design
    "Hardware Design & PCB Layout": "Custom PCB design with high-speed signal integrity and EMC compliance",
    "Schematic Design": "Detailed circuit schematics following industry standards and best practices",
    "Prototyping & Production Support": "From rapid prototypes to production-ready manufacturing support",
    "FPGA Design Services": "Custom FPGA/CPLD development for high-performance applications",
    "System-level Design": "Complete system architecture from concept to implementation",
    "Testing & Validation": "Comprehensive testing protocols ensuring reliability and compliance",
    "Obsolescence Management": "Proactive component lifecycle management and redesign services",
    // Software Development
    "Custom Application Development": "Tailored software solutions built for your specific needs",
    "Product Development": "End-to-end product development from ideation to launch",
    "ERP Software Development": "Enterprise resource planning systems customized for your business",
    "Integration Services": "Seamless integration with existing systems and third-party APIs",
    "Implementation & Support": "Smooth deployment and ongoing technical support",
    "Windows & Web Applications": "Cross-platform applications for desktop and web browsers",
    "Full Application Lifecycle Management": "Complete ALM from requirements to maintenance",
    // AI
    "Machine Learning Integration": "Implement ML models to automate and enhance your processes",
    "Predictive Analytics": "Data-driven insights to forecast trends and optimize decisions",
    "Computer Vision Solutions": "Image and video analysis for automation and quality control",
    "AI-powered Automation": "Intelligent automation that learns and adapts to your workflows",
    "Natural Language Processing": "Text analysis, chatbots, and language understanding systems",
    "Edge AI Implementation": "Deploy AI models on edge devices for real-time processing",
    // Blockchain
    "Blockchain Consulting": "Strategic guidance on blockchain adoption and implementation",
    "Smart Contract Development": "Secure, audited smart contracts for various blockchains",
    "Web3 Integration Services": "Connect your applications to decentralized networks",
    "Decentralized Application Development": "Full-stack dApp development and deployment",
    "Tokenization Solutions": "Asset tokenization and token economy design",
    "Blockchain Security Audits": "Comprehensive security reviews of blockchain implementations",
    // OEM/ODM
    "Original Equipment Manufacturing": "Manufacturing your designs with our production expertise",
    "Original Design Manufacturing": "Complete product design and manufacturing under your brand",
    "Product Digitization": "Transform traditional products into smart, connected devices",
    "Electronic Controller Development": "Custom controllers for industrial and consumer applications",
    "Data Connectivity Solutions": "IoT connectivity and data management infrastructure",
    "End-to-end Product Development": "From concept through manufacturing to market delivery",
    // Staffing
    "Technical talent acquisition": "Expert recruitment for specialized technical roles",
    "Contract staffing": "Flexible staffing solutions for project-based needs",
    "Project-based resourcing": "Dedicated teams scaled to your project requirements",
  };
  return descriptions[capability] || "Expert solutions tailored to your business needs";
}

// Mobile card for other services
function MobileServiceCard({
  service,
  index,
  learnMoreText,
  translation,
}: {
  service: typeof SERVICES[number];
  index: number;
  learnMoreText: string;
  translation: { title: string; description: string; capabilities: string[] };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card rounded-xl overflow-hidden border border-border h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative h-40 sm:h-48 flex-shrink-0">
        <Image
          fill
          src={service.image}
          alt={translation.title}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 -mt-8 relative z-10 flex flex-col flex-1">
        <h3 className="font-bold text-lg sm:text-xl text-foreground mb-2">
          {translation.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {translation.description}
        </p>

        {/* Capabilities - show first 3 */}
        <ul className="space-y-1.5 mb-4 flex-1">
          {translation.capabilities.slice(0, 3).map((capability) => (
            <li
              key={capability}
              className="text-xs sm:text-sm text-muted-foreground flex items-start"
            >
              <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2 mt-1.5 flex-shrink-0" />
              {capability}
            </li>
          ))}
        </ul>

        <Button
          asChild
          size="sm"
          className="bg-accent hover:bg-accent/90 text-white w-full sm:w-auto mt-auto"
        >
          <Link href={service.route}>
            {learnMoreText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}

// Desktop expandable cards for other services
function DesktopExpandableCards({
  services,
  learnMoreText,
  capabilitiesText,
  getServiceTranslation,
}: {
  services: (typeof SERVICES)[number][];
  learnMoreText: string;
  capabilitiesText: string;
  getServiceTranslation: (svcId: string) => { title: string; description: string; capabilities: string[] };
}) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  return (
    <div onMouseLeave={() => setActiveId(null)}>
      <div className="flex gap-3 lg:gap-4 h-[400px] lg:h-[450px] xl:h-[500px]">
        {services.map((service) => {
          const isActive = activeId === service.id;
          const hasActive = activeId !== null;
          const translation = getServiceTranslation(service.id);

          return (
            <motion.div
              key={service.id}
              layout
              onMouseEnter={() => setActiveId(service.id)}
              className={`
                bg-card rounded-xl lg:rounded-2xl overflow-hidden cursor-pointer
                hover:shadow-lg relative h-full border border-border
                ${isActive ? "flex-[4]" : hasActive ? "flex-[0.5]" : "flex-1"}
              `}
              style={{ minWidth: hasActive && !isActive ? "50px" : "auto" }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Non-expanded view */}
              {!isActive && (
                <motion.div
                  layout
                  className="relative w-full h-full overflow-hidden"
                >
                  <Image
                    fill
                    src={service.image}
                    alt={translation.title}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/30 to-transparent" />

                  <motion.div
                    layout
                    className="absolute bottom-0 left-0 right-0 p-3 lg:p-4"
                  >
                    <h3
                      className={`font-semibold text-foreground ${hasActive ? "text-[10px] lg:text-xs" : "text-sm lg:text-base text-center"}`}
                      style={hasActive ? { writingMode: "vertical-rl", textOrientation: "mixed" } : {}}
                    >
                      {translation.title}
                    </h3>
                  </motion.div>
                </motion.div>
              )}

              {/* Expanded view */}
              {isActive && (
                <motion.div
                  layout
                  className="flex h-full group/expanded"
                >
                  <div className="relative w-[35%] lg:w-[40%] h-full flex-shrink-0">
                    <Image
                      fill
                      src={service.image}
                      alt={translation.title}
                      className="object-cover"
                    />
                  </div>

                  <EvervaultBackground containerClassName="flex-1 overflow-y-auto" className="p-4 lg:p-6 h-full">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3 lg:mb-4">
                        <div className="flex-1 lg:pr-4 mb-3 lg:mb-0">
                          <h3 className="font-bold text-lg lg:text-xl xl:text-2xl text-foreground group-hover/expanded:text-white transition-colors">
                            {translation.title}
                          </h3>
                          <p className="text-muted-foreground group-hover/expanded:text-neutral-300 mt-1 lg:mt-2 text-xs lg:text-sm transition-colors">
                            {translation.description}
                          </p>
                        </div>
                        <Button
                          asChild
                          size="sm"
                          className="bg-accent hover:bg-accent/90 text-white flex-shrink-0 w-full lg:w-auto"
                        >
                          <Link href={service.route}>
                            {learnMoreText}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>

                      <div className="pt-3 lg:pt-4 border-t border-border group-hover/expanded:border-neutral-700 transition-colors">
                        <h4 className="font-semibold text-foreground group-hover/expanded:text-white mb-2 lg:mb-3 text-xs lg:text-sm transition-colors">
                          {capabilitiesText}
                        </h4>
                        <ul className="grid grid-cols-1 xl:grid-cols-2 gap-1.5 lg:gap-2">
                          {translation.capabilities.map((capability) => (
                            <li
                              key={capability}
                              className="text-xs lg:text-sm text-muted-foreground group-hover/expanded:text-neutral-300 flex items-start transition-colors"
                            >
                              <span className="w-1 lg:w-1.5 h-1 lg:h-1.5 bg-accent group-hover/expanded:bg-red-400 rounded-full mr-2 mt-1.5 flex-shrink-0 transition-colors" />
                              {capability}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </EvervaultBackground>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Other Services Section Component
function OtherServicesSection({
  services,
  exploreOtherServicesText,
  discoverServicesText,
  learnMoreText,
  capabilitiesText,
  getServiceTranslation,
}: {
  services: (typeof SERVICES)[number][];
  exploreOtherServicesText: string;
  discoverServicesText: string;
  learnMoreText: string;
  capabilitiesText: string;
  getServiceTranslation: (svcId: string) => { title: string; description: string; capabilities: string[] };
}) {
  return (
    <section className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {exploreOtherServicesText.split(" ").slice(0, -1).join(" ")} <span className="text-accent">{exploreOtherServicesText.split(" ").slice(-1)}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {discoverServicesText}
          </p>
        </motion.div>

        {/* Mobile: Stacked cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:hidden">
          {services.map((service, index) => (
            <MobileServiceCard
              key={service.id}
              service={service}
              index={index}
              learnMoreText={learnMoreText}
              translation={getServiceTranslation(service.id)}
            />
          ))}
        </div>

        {/* Medium screens (smaller laptops): 3-column grid */}
        <div className="hidden md:grid lg:hidden grid-cols-3 gap-4 max-w-5xl mx-auto auto-rows-fr">
          {services.map((service, index) => (
            <div key={service.id} className="h-full">
              <MobileServiceCard
                service={service}
                index={index}
                learnMoreText={learnMoreText}
                translation={getServiceTranslation(service.id)}
              />
            </div>
          ))}
        </div>

        {/* Large screens: Expandable cards */}
        <div className="hidden lg:block max-w-7xl mx-auto">
          <DesktopExpandableCards
            services={services}
            learnMoreText={learnMoreText}
            capabilitiesText={capabilitiesText}
            getServiceTranslation={getServiceTranslation}
          />
        </div>
      </div>
    </section>
  );
}

interface ServiceDetailPageProps {
  serviceId: string;
}

export function ServiceDetailPage({ serviceId }: ServiceDetailPageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const t = useTranslations("servicePage");
  const tCommon = useTranslations("common");
  const tServices = useTranslations("servicesPage");

  // Map service IDs to translation keys
  const serviceTranslationKeys: Record<string, string> = {
    "embedded-design": "embeddedDesign",
    "software-development": "softwareDevelopment",
    "ai": "ai",
    "blockchain": "blockchain",
    "oem-odm": "oemOdm",
    "staffing": "staffing",
  };

  // Number of capabilities per service
  const capabilitiesCount: Record<string, number> = {
    "embedded-design": 7,
    "software-development": 7,
    "ai": 6,
    "blockchain": 6,
    "oem-odm": 6,
    "staffing": 3,
  };

  // Get translations for a service
  const getServiceTranslation = (svcId: string) => {
    const key = serviceTranslationKeys[svcId] || svcId;
    const numCapabilities = capabilitiesCount[svcId] || 6;
    const capabilities: string[] = [];
    for (let i = 1; i <= numCapabilities; i++) {
      capabilities.push(tServices(`${key}.capabilities.${i}`));
    }
    return {
      title: tServices(`${key}.title`),
      description: tServices(`${key}.description`),
      capabilities,
    };
  };

  const service = SERVICES.find((s) => s.id === serviceId);
  const translatedService = getServiceTranslation(serviceId);

  // Track service view
  useEffect(() => {
    if (service) {
      trackServiceView(serviceId, service.title);
    }
  }, [serviceId, service]);

  if (!service) {
    return null;
  }

  const Icon = iconMap[service.icon];
  const otherServices = SERVICES.filter((s) => s.id !== serviceId);
  const colors = serviceColors[serviceId] || serviceColors["embedded-design"];

  return (
    <>
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />
          {/* Bottom fade to background - smooth gradient */}
          <div className="absolute inset-x-0 bottom-0 h-[50vh] bg-gradient-to-t from-background from-10% via-background/60 via-40% to-transparent" />
        </div>

        {/* Spotlight Effect */}
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="hsl(var(--accent))"
        />

        {/* Grid Pattern */}
        <GridPattern
          width={50}
          height={50}
          className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)] opacity-30 z-[1]"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background pointer-events-none opacity-50 z-[1]" />

        {/* Animated Glow Orb */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] pointer-events-none z-[1]"
          style={{
            background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 pt-32 sm:pt-40 md:pt-48">
          <div className="max-w-4xl mx-auto text-center">
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 tracking-tight"
            >
              {translatedService.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              {translatedService.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white px-8 h-12 text-base group"
              >
                <Link
                  href="/contact"
                  onClick={() => trackCTA("Start Your Project", `services/${serviceId}`)}
                >
                  {t("startYourProject")}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 h-12 text-base border-white/20 text-white hover:bg-white/10"
              >
                <Link
                  href="/about"
                  onClick={() => trackCTA("Learn About Us", `services/${serviceId}`)}
                >
                  {t("learnAboutUs")}
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-muted-foreground">{t("exploreCapabilities")}</span>
            <ChevronDown className="h-6 w-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Capabilities Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background gradient */}
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-30", colors.gradient)} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t("whatWeOffer").split(" ").slice(0, -1).join(" ")} <span className="text-accent">{t("whatWeOffer").split(" ").slice(-1)}</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                {t("offerSubtitle")}
              </p>
            </motion.div>

            {/* Capabilities Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {translatedService.capabilities.map((capability, index) => {
                // Create varied sizes for bento effect
                const isLarge = index === 0 || index === 3;
                const description = getCapabilityDescription(capability);

                return (
                  <motion.div
                    key={capability}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    whileHover={{ y: -8 }}
                    className={cn(
                      "group overflow-hidden rounded-2xl border border-border bg-card hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300",
                      isLarge && "md:col-span-2"
                    )}
                  >
                    <EvervaultBackground
                      containerClassName="h-full"
                      className={cn(
                        "p-6 md:p-8 h-full",
                        isLarge && "md:p-10"
                      )}
                    >
                      {/* Icon badge */}
                      <div className={cn(
                        "flex-shrink-0 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300 mb-5",
                        isLarge ? "w-16 h-16" : "w-14 h-14"
                      )}>
                        <CheckCircle2 className={cn(
                          "text-accent group-hover:text-white transition-colors",
                          isLarge ? "w-8 h-8" : "w-7 h-7"
                        )} />
                      </div>

                      {/* Title */}
                      <h3 className={cn(
                        "font-bold group-hover:text-white transition-colors mb-3",
                        isLarge ? "text-xl md:text-2xl" : "text-lg md:text-xl"
                      )}>
                        {capability}
                      </h3>

                      {/* Description */}
                      <p className={cn(
                        "text-muted-foreground group-hover:text-neutral-300 transition-colors leading-relaxed",
                        isLarge ? "text-base" : "text-sm"
                      )}>
                        {description}
                      </p>
                    </EvervaultBackground>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-muted/30">
        {/* Grid Pattern */}
        <GridPattern
          width={60}
          height={60}
          className="opacity-20 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t("ourProcess").split(" ")[0]} <span className="text-accent">{t("ourProcess").split(" ").slice(1).join(" ")}</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                {t("processSubtitle")}
              </p>
            </motion.div>

            {/* Process Timeline */}
            <div className="relative">
              {/* Connecting Line - Desktop */}
              <div className="hidden md:block absolute top-[60px] left-0 right-0 h-0.5">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-accent/20 via-accent to-accent/20 origin-left"
                />
              </div>

              <div className="grid md:grid-cols-4 gap-6 md:gap-8">
                {processSteps.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    whileHover={{ y: -8 }}
                    className="relative group"
                  >
                    {/* Step Card */}
                    <div className="bg-card border border-border rounded-2xl overflow-hidden h-full hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 cursor-default select-none">
                      <EvervaultBackground containerClassName="h-full" className="p-6 h-full">
                        {/* Step Number with Glow */}
                        <div className="relative mb-6">
                          <motion.div
                            className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto relative z-10"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <item.Icon className="w-7 h-7 text-white" />
                          </motion.div>
                          {/* Glow effect */}
                          <div className="absolute inset-0 w-16 h-16 rounded-full bg-accent/30 blur-xl mx-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        {/* Step Number Badge */}
                        <div className="text-sm font-mono text-accent group-hover:text-white bg-accent/10 group-hover:bg-white/20 px-3 py-1 rounded-full inline-block mb-3 transition-colors">
                          {t("step")} {item.step}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
                          {index === 0 ? t("discovery") : index === 1 ? t("strategy") : index === 2 ? t("execution") : t("delivery")}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground group-hover:text-neutral-300 leading-relaxed transition-colors">
                          {index === 0 ? t("discoveryDescription") : index === 1 ? t("strategyDescription") : index === 2 ? t("executionDescription") : t("deliveryDescription")}
                        </p>
                      </EvervaultBackground>
                    </div>

                    {/* Arrow - Mobile */}
                    {index < processSteps.length - 1 && (
                      <div className="md:hidden flex justify-center py-4">
                        <ChevronDown className="w-6 h-6 text-accent/50" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto relative"
          >
            {/* CTA Card */}
            <div className="relative bg-accent rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <GridPattern width={40} height={40} className="stroke-white/30" />
              </div>

              {/* Glow Effects */}
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />

              {/* Content */}
              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                    {t("readyToStart")}
                  </h2>
                  <p className="text-white/80 mb-8 max-w-xl mx-auto text-lg">
                    {t("letsDiscuss", { service: translatedService.title.toLowerCase() })}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      asChild
                      size="lg"
                      variant="secondary"
                      className="bg-white text-accent hover:bg-white/90 h-12 px-8 text-base"
                    >
                      <Link
                        href="/contact"
                        onClick={() => trackCTA("Contact Our Team", `services/${serviceId}`, { section: "cta" })}
                      >
                        {t("contactOurTeam")}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 h-12 px-8 text-base"
                    >
                      <Link
                        href="/about"
                        onClick={() => trackCTA("Learn About Us", `services/${serviceId}`, { section: "cta" })}
                      >
                        {t("learnAboutUs")}
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other Services Section */}
      <OtherServicesSection
        services={otherServices}
        exploreOtherServicesText={t("exploreOtherServices")}
        discoverServicesText={t("discoverServices")}
        learnMoreText={tCommon("learnMore")}
        capabilitiesText={tCommon("capabilities")}
        getServiceTranslation={getServiceTranslation}
      />
    </>
  );
}
