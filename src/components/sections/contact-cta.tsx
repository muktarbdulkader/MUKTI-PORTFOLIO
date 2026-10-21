import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export function ContactCTA() {
  return (
    <section className="border-t border-border-subtle/40">
      <Container className="py-20">
        <div className="relative overflow-hidden rounded-3xl border border-border-subtle bg-gradient-to-br from-accent/10 via-surface to-violet/10 p-10 sm:p-14">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-content sm:text-3xl">
              Have a project in mind?
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
              I&apos;m open to software engineering roles, internships, and freelance work.
              Let&apos;s talk about what you&apos;re building.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className={buttonVariants("primary", "lg")}>
                Discuss your project
                <Icon name="ArrowRight" className="h-4 w-4" />
              </Link>
              <Link href="/projects" className={buttonVariants("outline", "lg")}>
                See my work
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
