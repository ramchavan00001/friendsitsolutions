"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, Phone, Search } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Icon, type IconName } from "@/components/icon";
import { cn } from "@/lib/utils";

export type MenuGroup = {
  key: string;
  label: string;
  services: { slug: string; title: string; summary: string; icon: IconName }[];
};

type NavItem = { label: string; href: string; mega?: boolean };

export function Header({ nav, menu, phone, phoneHref }: { nav: NavItem[]; menu: MenuGroup[]; phone: string; phoneHref: string }) {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMegaOpen(false);
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [megaOpen]);

  const open = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-all",
        scrolled ? "border-border bg-background/90 shadow-sm backdrop-blur-md" : "border-transparent bg-background",
      )}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <div className="container flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) =>
              item.mega ? (
                <li key={item.href} ref={megaRef} onMouseEnter={open} onMouseLeave={scheduleClose} className="static">
                  <button
                    type="button"
                    aria-expanded={megaOpen}
                    aria-controls="mega-menu"
                    onClick={() => setMegaOpen((v) => !v)}
                    className={cn(
                      "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium hover:text-primary dark:hover:text-accent",
                      isActive(item.href) && "text-primary dark:text-accent",
                    )}
                  >
                    {item.label}
                    <ChevronDown className={cn("h-4 w-4 transition-transform", megaOpen && "rotate-180")} aria-hidden="true" />
                  </button>
                  <div
                    id="mega-menu"
                    hidden={!megaOpen}
                    className="absolute inset-x-0 top-full border-b bg-background shadow-xl"
                  >
                    <div className="container grid grid-cols-4 gap-6 py-8">
                      {menu.map((group) => (
                        <div key={group.key}>
                          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">{group.label}</p>
                          <ul className="space-y-1">
                            {group.services.map((s) => (
                              <li key={s.slug}>
                                <Link
                                  href={`/services/${s.slug}`}
                                  className="group flex items-start gap-2.5 rounded-lg p-2 text-sm hover:bg-secondary"
                                >
                                  <Icon name={s.icon} className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                                  <span className="font-medium group-hover:text-primary dark:group-hover:text-accent">{s.title}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="border-t bg-secondary/50">
                      <div className="container flex items-center justify-between py-3 text-sm">
                        <span className="text-muted-foreground">Not sure what you need? Our experts will guide you — free.</span>
                        <Link href="/services" className="flex items-center gap-1 font-semibold text-primary dark:text-accent">
                          View all services <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium hover:text-primary dark:hover:text-accent",
                      isActive(item.href) && "text-primary dark:text-accent",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <a href={`tel:${phoneHref}`} className="hidden items-center gap-2 whitespace-nowrap rounded-md px-2 text-sm font-semibold 2xl:flex">
            <Phone className="h-4 w-4 text-brand-teal" aria-hidden="true" />
            {phone}
          </a>
          <Button asChild variant="ghost" size="icon" aria-label="Search the site">
            <Link href="/search">
              <Search />
            </Link>
          </Button>
          <ThemeToggle />
          <Button asChild variant="accent" className="hidden sm:inline-flex">
            <Link href="/get-a-quote">Get Free Quote</Link>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="border-b p-4">
                <Logo />
              </div>
              <nav aria-label="Mobile" className="flex-1 p-4">
                <ul className="space-y-1">
                  {nav.map((item) =>
                    item.mega ? (
                      <li key={item.href}>
                        <details className="group">
                          <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-3 py-2.5 font-medium hover:bg-secondary">
                            {item.label}
                            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                          </summary>
                          <div className="space-y-3 py-2 pl-3">
                            {menu.map((g) => (
                              <div key={g.key}>
                                <p className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">{g.label}</p>
                                <ul>
                                  {g.services.map((s) => (
                                    <li key={s.slug}>
                                      <Link href={`/services/${s.slug}`} className="block rounded-md px-3 py-1.5 text-sm hover:bg-secondary">
                                        {s.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                            <Link href="/services" className="block px-3 text-sm font-semibold text-primary dark:text-accent">
                              All services →
                            </Link>
                          </div>
                        </details>
                      </li>
                    ) : (
                      <li key={item.href}>
                        <Link href={item.href} className="block rounded-md px-3 py-2.5 font-medium hover:bg-secondary">
                          {item.label}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </nav>
              <div className="space-y-2 border-t p-4">
                <Button asChild variant="accent" className="w-full">
                  <Link href="/get-a-quote">Get Free Quote</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href={`tel:${phoneHref}`}>
                    <Phone /> Call {phone}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
