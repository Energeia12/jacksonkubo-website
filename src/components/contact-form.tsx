"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site";

type Fields = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

const empty: Fields = { firstName: "", lastName: "", email: "", message: "" };

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "opened">("idle");

  function update(key: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setStatus((current) => (current === "sending" ? current : "idle"));
  }

  function openMailApp() {
    const name = [fields.firstName, fields.lastName].filter(Boolean).join(" ") || "Someone";
    const body = [`Name: ${name}`, `Email: ${fields.email.trim()}`, "", fields.message.trim()].join("\n");
    const href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Professional inquiry from ${name}`,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setStatus("opened");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof Fields, string>> = {};
    if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      nextErrors.email = "Enter an email address Jackson can reply to.";
    }
    if (fields.message.trim().length < 8) {
      nextErrors.message = "Write a short note about the project.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          firstName: fields.firstName,
          lastName: fields.lastName,
          email: fields.email.trim(),
          message: fields.message.trim(),
          website: honeypot,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean };
      if (response.ok && data.ok) {
        setFields(empty);
        setStatus("sent");
        return;
      }
    } catch {
      // The mail app below is the backup when the site cannot deliver.
    }

    openMailApp();
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-4">
      <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First name <span className="text-[#d4cec3]">(optional)</span>
          </Label>
          <Input
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            value={fields.firstName}
            onChange={(event) => update("firstName", event.target.value)}
            className="h-11 border-white/25 bg-[#0c0a12] text-white dark:bg-[#0c0a12]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last name <span className="text-[#d4cec3]">(optional)</span>
          </Label>
          <Input
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            value={fields.lastName}
            onChange={(event) => update("lastName", event.target.value)}
            className="h-11 border-white/25 bg-[#0c0a12] text-white dark:bg-[#0c0a12]"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          value={fields.email}
          onChange={(event) => update("email", event.target.value)}
          className="h-11 border-white/25 bg-[#0c0a12] text-white dark:bg-[#0c0a12]"
        />
        {errors.email ? (
          <p id="email-error" className="text-sm text-white" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={7}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          value={fields.message}
          onChange={(event) => update("message", event.target.value)}
          className="min-h-40 border-white/25 bg-[#0c0a12] text-white dark:bg-[#0c0a12]"
        />
        {errors.message ? (
          <p id="message-error" className="text-sm text-white" role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>
      <Button type="submit" size="lg" className="h-11 w-full text-base" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send email"}
      </Button>
      {status === "sent" ? (
        <p className="border border-white/15 bg-[#0c0a12] px-3 py-3 text-sm text-white" role="status">
          Sent to {site.email}. Jackson reads it from that inbox.
        </p>
      ) : status === "opened" ? (
        <p className="border border-white/15 bg-[#0c0a12] px-3 py-3 text-sm text-white" role="status">
          If your email app did not open, write directly to{" "}
          <a className="underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      ) : (
        <p className="text-sm text-[#d4cec3]">
          This sends the note to {site.email}. The site does not keep a copy.
        </p>
      )}
    </form>
  );
}
