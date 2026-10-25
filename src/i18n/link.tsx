"use client";
import NextLink from "next/link";
import { forwardRef, type ComponentProps } from "react";
import { localizePath } from "./config";
import { useI18n } from "./provider";

/** Drop-in replacement for next/link that keeps the visitor's language in internal URLs. */
export const Link = forwardRef<HTMLAnchorElement, ComponentProps<typeof NextLink>>(function Link({ href, ...props }, ref) {
  const { locale } = useI18n();
  const localized = typeof href === "string" ? localizePath(locale, href) : href;
  return <NextLink ref={ref} href={localized} {...props} />;
});
