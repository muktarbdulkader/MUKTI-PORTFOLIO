"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle/60 bg-canvas/80 backdrop-blur-xl">
      <Container size="wide">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-content">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
              <Icon name="Sparkles" className="h-4 w-4" />
            </span>
            Mukti
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-content",
                  pathname === item.href && "text-content"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link href="/contact">
              <Button size="sm" variant="primary">
                Let&apos;s Talk
                <Icon name="ArrowRight" className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted hover:text-content md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "X" : "Menu"} className="h-5 w-5" />
          </button>
        </div>

        {open ? (
          <nav
            id="mobile-nav"
            className="flex flex-col gap-1 border-t border-border-subtle/60 py-4 md:hidden"
            aria-label="Mobile"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:bg-elevated hover:text-content"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="mt-2">
              <Button size="md" variant="primary" className="w-full">
                Let&apos;s Talk
                <Icon name="ArrowRight" className="h-4 w-4" />
              </Button>
            </Link>
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
