"use client";

import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  locales,
  languageNames,
  localeFlags,
  type Locale,
} from "@/i18n/config";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "desktop" | "mobile";
}

export function LanguageSwitcher({
  className,
  variant = "desktop",
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const currentLocale = useLocale() as Locale;
  const t = useTranslations("languageSwitcher");

  const handleLocaleChange = (newLocale: Locale) => {
    startTransition(() => {
      // Set the locale cookie
      document.cookie = `NEXT_LOCALE=${newLocale};max-age=${60 * 60 * 24 * 365};path=/;samesite=lax`;
      // Reload the page to apply the new locale
      window.location.reload();
    });
    setIsOpen(false);
  };

  // Popular European languages to show first
  const popularLocales: Locale[] = ["en", "pl", "de", "fr", "es", "it", "nl", "pt"];
  const otherLocales = locales.filter((l) => !popularLocales.includes(l));

  if (variant === "mobile") {
    return (
      <div className={cn("w-full", className)}>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button
              className="flex items-center gap-2 text-neutral-300 py-2"
              disabled={isPending}
            >
              <Globe className="h-5 w-5" />
              <span className="text-sm font-medium uppercase">{currentLocale}</span>
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[280px] p-0 bg-black border-neutral-800"
            align="start"
          >
            <ScrollArea className="h-[300px]">
              <div className="p-2">
                <div className="px-2 py-1.5 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Popular
                </div>
                {popularLocales.map((locale) => (
                  <button
                    key={locale}
                    onClick={() => handleLocaleChange(locale)}
                    disabled={isPending}
                    className={cn(
                      "w-full flex items-center justify-between px-2 py-2 text-sm rounded-md transition-colors",
                      locale === currentLocale
                        ? "bg-red-600/20 text-red-500"
                        : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base">{localeFlags[locale]}</span>
                      <span>{languageNames[locale]}</span>
                    </span>
                    {locale === currentLocale && (
                      <Check className="h-4 w-4 text-red-500" />
                    )}
                  </button>
                ))}

                <div className="px-2 py-1.5 mt-2 text-xs font-medium text-neutral-500 uppercase tracking-wider border-t border-neutral-800 pt-3">
                  Other Languages
                </div>
                {otherLocales.map((locale) => (
                  <button
                    key={locale}
                    onClick={() => handleLocaleChange(locale)}
                    disabled={isPending}
                    className={cn(
                      "w-full flex items-center justify-between px-2 py-2 text-sm rounded-md transition-colors",
                      locale === currentLocale
                        ? "bg-red-600/20 text-red-500"
                        : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base">{localeFlags[locale]}</span>
                      <span>{languageNames[locale]}</span>
                    </span>
                    {locale === currentLocale && (
                      <Check className="h-4 w-4 text-red-500" />
                    )}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  // Desktop variant
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-1.5 text-neutral-300 px-2 cursor-pointer",
            className
          )}
          disabled={isPending}
        >
          <Globe className="h-4 w-4" />
          <span className="text-sm font-medium uppercase">
            {currentLocale}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[240px] p-0 bg-black border-neutral-800"
        align="end"
        sideOffset={8}
      >
        <ScrollArea className="h-[320px]">
          <div className="p-2">
            <div className="px-2 py-1.5 text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Popular
            </div>
            {popularLocales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLocaleChange(locale)}
                disabled={isPending}
                className={cn(
                  "w-full flex items-center justify-between px-2 py-2 text-sm rounded-md transition-colors",
                  locale === currentLocale
                    ? "bg-red-600/20 text-red-500"
                    : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                )}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{localeFlags[locale]}</span>
                  <span>{languageNames[locale]}</span>
                </span>
                {locale === currentLocale && (
                  <Check className="h-4 w-4 text-red-500" />
                )}
              </button>
            ))}

            <div className="px-2 py-1.5 mt-2 text-xs font-medium text-neutral-500 uppercase tracking-wider border-t border-neutral-800 pt-3">
              Other
            </div>
            {otherLocales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLocaleChange(locale)}
                disabled={isPending}
                className={cn(
                  "w-full flex items-center justify-between px-2 py-2 text-sm rounded-md transition-colors",
                  locale === currentLocale
                    ? "bg-red-600/20 text-red-500"
                    : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                )}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{localeFlags[locale]}</span>
                  <span>{languageNames[locale]}</span>
                </span>
                {locale === currentLocale && (
                  <Check className="h-4 w-4 text-red-500" />
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
