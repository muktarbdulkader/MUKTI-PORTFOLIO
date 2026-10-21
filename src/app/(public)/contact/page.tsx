import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/contact-form";
import { ContactInfo } from "@/components/sections/contact-info";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Mukti about software engineering roles, internships, freelance projects, or collaborations.",
};

export default function ContactPage() {
  return (
    <Container size="wide" className="py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-content sm:text-4xl">
          Let&apos;s work together
        </h1>
        <p className="mt-3 text-muted">
          Tell me about your project, role, or idea. I read every message and reply as
          soon as I can.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Card className="p-6 sm:p-8">
            <ContactForm />
          </Card>
        </div>
        <aside className="lg:col-span-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-faint">
            Other ways to reach me
          </h2>
          <Suspense fallback={null}>
            <ContactInfo />
          </Suspense>
        </aside>
      </div>
    </Container>
  );
}
