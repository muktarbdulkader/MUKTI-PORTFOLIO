import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How this portfolio handles your data and contact submissions.",
};

export default function PrivacyPage() {
  return (
    <Container className="py-16">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-content">Privacy</h1>
        <div className="prose-invert mt-6 space-y-5 text-sm leading-7 text-muted">
          <p>
            This website is a personal portfolio. It collects and stores the minimum
            information needed to operate and to respond to messages you send.
          </p>
          <h2 className="text-lg font-semibold text-content">Contact form</h2>
          <p>
            When you submit the contact form, your name, email address, inquiry type,
            subject, and message are stored securely in the site&apos;s database so the
            site owner can read and reply to your message. These submissions are never
            shown publicly.
          </p>
          <h2 className="text-lg font-semibold text-content">Email delivery</h2>
          <p>
            If email delivery is configured, your message may also be forwarded to the
            site owner by email. No message is ever claimed to be delivered unless the
            email provider confirms it.
          </p>
          <h2 className="text-lg font-semibold text-content">Analytics & tracking</h2>
          <p>
            No third-party advertising or cross-site tracking is used. Standard server
            logs may be retained by the hosting provider for security and reliability.
          </p>
          <h2 className="text-lg font-semibold text-content">Cookies</h2>
          <p>
            The public site does not require cookies. The admin area uses a strictly
            necessary, secure, HTTP-only session cookie for authentication only.
          </p>
          <h2 className="text-lg font-semibold text-content">Your choices</h2>
          <p>
            To request access to, or deletion of, a message you submitted, contact the
            site owner using the contact details provided on this site.
          </p>
        </div>
      </div>
    </Container>
  );
}
