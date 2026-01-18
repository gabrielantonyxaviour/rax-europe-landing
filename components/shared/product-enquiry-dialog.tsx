"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { trackFormSubmit } from "@/lib/analytics";

interface ProductInfo {
  model: string;
  name: string;
  image: string;
  category: string;
  short_description?: string;
  long_description?: string;
}

interface ProductEnquiryDialogProps {
  product: ProductInfo;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductEnquiryDialog({
  product,
  open,
  onOpenChange,
}: ProductEnquiryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [countryCode, setCountryCode] = useState("+91");

  const t = useTranslations("enquiryForm");
  const tForm = useTranslations("contactForm");

  const defaultMessage = t("defaultMessage", { productName: product.name, model: product.model });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      message: defaultMessage,
    },
  });

  const handlePhoneChange = (value: string) => {
    setPhoneValue(value);
    setValue("phone", `${countryCode} ${value}`);
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Send to dedicated product enquiry endpoint
      const response = await fetch("/api/products/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          product: {
            name: product.name,
            model: product.model,
            image: product.image,
            category: product.category,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setIsSuccess(true);
      trackFormSubmit("product_enquiry", true, {
        product_model: product.model,
        product_name: product.name,
        category: product.category,
      });

      // Reset after 3 seconds and close
      setTimeout(() => {
        setIsSuccess(false);
        reset({ message: defaultMessage });
        setPhoneValue("");
        onOpenChange(false);
      }, 3000);
    } catch (error) {
      trackFormSubmit("product_enquiry", false, {
        product_model: product.model,
        error: error instanceof Error ? error.message : "Unknown error",
      });
      toast.error(
        error instanceof Error ? error.message : "Failed to send message"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setIsSuccess(false);
      reset({ message: defaultMessage });
      setPhoneValue("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 text-center"
          >
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">{t("successTitle")}</h3>
            <p className="text-muted-foreground">
              {t("successMessage", { productName: product.name })}
            </p>
          </motion.div>
        ) : (
          <>
            {/* Product Header */}
            <div className="relative bg-gradient-to-br from-muted/50 to-muted p-6 border-b border-border">
              <div className="flex items-start gap-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-background flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium text-accent uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mt-1 truncate">{product.name}</h3>
                  <span className="text-sm text-muted-foreground font-mono">
                    {product.model}
                  </span>
                  {product.short_description && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {product.short_description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <DialogHeader className="p-0 mb-4">
                <DialogTitle className="text-lg text-foreground">{t("title")}</DialogTitle>
              </DialogHeader>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-foreground">
                    {tForm("firstName")} <span className="text-accent">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    placeholder={tForm("firstNamePlaceholder")}
                    {...register("firstName")}
                    className={errors.firstName ? "border-destructive" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive">{errors.firstName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-foreground">
                    {tForm("lastName")} <span className="text-accent">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    placeholder={tForm("lastNamePlaceholder")}
                    {...register("lastName")}
                    className={errors.lastName ? "border-destructive" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  {tForm("email")} <span className="text-accent">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={tForm("emailPlaceholder")}
                  {...register("email")}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">{tForm("phone")}</Label>
                <PhoneInput
                  id="phone"
                  placeholder={tForm("phonePlaceholder")}
                  value={phoneValue}
                  onChange={handlePhoneChange}
                  countryCode={countryCode}
                  onCountryCodeChange={setCountryCode}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-foreground">{tForm("company")}</Label>
                <Input
                  id="company"
                  placeholder={tForm("companyPlaceholder")}
                  {...register("company")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground">
                  {tForm("message")} <span className="text-accent">*</span>
                </Label>
                <Textarea
                  id="message"
                  rows={4}
                  {...register("message")}
                  className={errors.message ? "border-destructive" : ""}
                />
                {errors.message && (
                  <p className="text-sm text-destructive">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {t("sending")}
                  </>
                ) : (
                  <>
                    {t("sendEnquiry")}
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
