"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import { trackNavClick, trackCTA, trackMobileMenu } from "@/lib/analytics";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { EvervaultBackground } from "@/components/ui/evervault-background";

// Map product/service IDs to translation keys
const productTranslationKeys: Record<string, string> = {
  "IoT": "iot",
  "E-Surveillance": "eSurveillance",
  "Software": "software",
  "Marine Technology": "marineTechnology",
  "HSE": "hse",
  "Automation": "automation",
};

const serviceTranslationKeys: Record<string, string> = {
  "Embedded Design": "embeddedDesign",
  "Software Development": "softwareDevelopment",
  "Artificial Intelligence": "ai",
  "Blockchain & Web3": "blockchain",
  "OEM & ODM": "oemOdm",
  "Staffing Solutions": "staffing",
};

export function NavbarComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("common");
  const tNav = useTranslations("nav");
  const tProducts = useTranslations("products");
  const tServices = useTranslations("servicesPage");

  const handleGetInTouch = (source: "desktop" | "mobile") => {
    trackCTA("Get in Touch", "navbar", source === "mobile" ? { source: "mobile" } : undefined);

    if (pathname === "/contact") {
      // Already on contact page, just scroll
      document.getElementById("conversation")?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to contact page with hash
      router.push("/contact#conversation");
    }
  };

  // Get translated nav items
  const getTranslatedLabel = (label: string) => {
    // Check nav labels first
    const navLabelMap: Record<string, string> = {
      "Products": tNav("products"),
      "Services": tNav("services"),
      "About": tNav("about"),
      "Contact": tNav("contact"),
      "More": tNav("more"),
      "Careers": tNav("careers"),
      "Gallery": tNav("gallery"),
    };
    if (navLabelMap[label]) return navLabelMap[label];

    // Check product labels
    const productKey = productTranslationKeys[label];
    if (productKey) {
      return tProducts(`${productKey}.title`);
    }

    // Check service labels
    const serviceKey = serviceTranslationKeys[label];
    if (serviceKey) {
      return tServices(`${serviceKey}.title`);
    }

    return label;
  };

  const getTranslatedDescription = (label: string) => {
    // Check nav descriptions
    const navDescMap: Record<string, string> = {
      "Careers": tNav("careersDescription"),
      "Gallery": tNav("galleryDescription"),
    };
    if (navDescMap[label]) return navDescMap[label];

    // Check product descriptions (headline)
    const productKey = productTranslationKeys[label];
    if (productKey) {
      return tProducts(`${productKey}.headline`);
    }

    // Check service descriptions
    const serviceKey = serviceTranslationKeys[label];
    if (serviceKey) {
      return tServices(`${serviceKey}.description`);
    }

    return "";
  };

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems
            getTranslatedLabel={getTranslatedLabel}
            getTranslatedDescription={getTranslatedDescription}
          />
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <NavbarButton
              variant="primary"
              onClick={() => handleGetInTouch("desktop")}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {t("getInTouch")}
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => {
                const newState = !isMobileMenuOpen;
                trackMobileMenu(newState);
                setIsMobileMenuOpen(newState);
              }}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {NAV_ITEMS.map((item, idx) => (
              <div key={`mobile-nav-${idx}`}>
                {"items" in item ? (
                  <MobileNavDropdown
                    label={getTranslatedLabel(item.label)}
                    originalLabel={item.label}
                    items={item.items}
                    onItemClick={() => setIsMobileMenuOpen(false)}
                    getTranslatedLabel={getTranslatedLabel}
                  />
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => {
                      trackNavClick(item.label, { source: "mobile" });
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "block py-2 text-lg font-medium transition-colors hover:text-white",
                      pathname === item.href
                        ? "text-white"
                        : "text-neutral-400"
                    )}
                  >
                    {getTranslatedLabel(item.label)}
                  </Link>
                )}
              </div>
            ))}
            <div className="border-t border-neutral-800 pt-4 mt-4">
              <LanguageSwitcher variant="mobile" />
            </div>
            <div className="flex w-full flex-col gap-4 mt-4">
              <NavbarButton
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleGetInTouch("mobile");
                }}
                variant="primary"
                className="w-full text-center justify-center bg-red-600 text-white hover:bg-red-700"
              >
                {t("getInTouch")}
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

interface NavItemsProps {
  getTranslatedLabel: (label: string) => string;
  getTranslatedDescription: (label: string) => string;
}

function NavItems({ getTranslatedLabel, getTranslatedDescription }: NavItemsProps) {
  const pathname = usePathname();

  return (
    <NavigationMenu className="hidden md:flex" viewport={false}>
      <NavigationMenuList className="gap-1">
        {NAV_ITEMS.map((item, idx) => (
          <NavigationMenuItem key={`nav-item-${idx}`}>
            {"items" in item ? (
              <>
                <NavigationMenuTrigger className="bg-transparent text-neutral-300 hover:bg-transparent hover:text-white data-[state=open]:bg-transparent data-[state=open]:text-white">
                  {getTranslatedLabel(item.label)}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="!bg-black !border-neutral-800 !rounded-xl !shadow-2xl overflow-hidden">
                  <ul className={cn(
                    "grid gap-0",
                    item.label === "More"
                      ? "w-[280px] grid-cols-1"
                      : "w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                  )}>
                    {item.items.map((subItem) => (
                      <li key={subItem.label}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={subItem.href}
                            onClick={() => trackNavClick(subItem.label, { source: "desktop", parent: item.label })}
                            className="block select-none leading-none no-underline outline-none transition-colors group overflow-hidden"
                          >
                            <EvervaultBackground
                              containerClassName=""
                              className="p-3"
                            >
                              <div className="text-sm font-medium text-neutral-200 group-hover:text-white">
                                {getTranslatedLabel(subItem.label)}
                              </div>
                              <p className="line-clamp-2 text-xs leading-snug text-neutral-500 mt-1 group-hover:text-neutral-400">
                                {getTranslatedDescription(subItem.label) || subItem.description}
                              </p>
                            </EvervaultBackground>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  onClick={() => trackNavClick(item.label, { source: "desktop" })}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-neutral-300 hover:bg-transparent hover:text-white",
                    pathname === item.href && "text-white"
                  )}
                >
                  {getTranslatedLabel(item.label)}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

interface MobileNavDropdownProps {
  label: string;
  originalLabel: string;
  items: readonly { label: string; href: string; description: string }[];
  onItemClick: () => void;
  getTranslatedLabel: (label: string) => string;
}

function MobileNavDropdown({
  label,
  originalLabel,
  items,
  onItemClick,
  getTranslatedLabel,
}: MobileNavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 text-lg font-medium text-neutral-300"
      >
        {label}
        <ChevronDown
          className={cn(
            "h-5 w-5 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pl-4 space-y-2 py-2">
              {items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block py-1 text-neutral-400 hover:text-white transition-colors"
                  onClick={() => {
                    trackNavClick(item.label, { source: "mobile", parent: originalLabel });
                    onItemClick();
                  }}
                >
                  {getTranslatedLabel(item.label)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Keep the old export name for backwards compatibility
export { NavbarComponent as Navbar };
