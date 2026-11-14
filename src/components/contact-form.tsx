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
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [opened, setOpened] = useState(false);

  function update(key: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setOpened(false);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
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

    const name = [fields.firstName, fields.lastName].filter(Boolean).join(" ") || "Someone";
    const body = [
      `Name: ${name}`,
      `Email: ${fields.email.trim()}`,
      "",
      fields.message.trim(),
    ].join("\n");
    const href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Professional inquiry from ${name}`,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setOpened(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            value={fields.firstName}
            onChange={(event) => update("firstName", event.target.value)}
            className="h-11 bg-black/40 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            value={fields.lastName}
            onChange={(event) => update("lastName", event.target.value)}
            className="h-11 bg-black/40 text-white"
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
          className="h-11 bg-black/40 text-white"
        />
        {errors.email ? (
          <p id="email-error" className="text-sm text-[#ffb07a]">
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
          className="min-h-40 bg-black/40 text-white"
        />
        {errors.message ? (
          <p id="message-error" className="text-sm text-[#ffb07a]">
            {errors.message}
          </p>
        ) : null}
      </div>
      <Button type="submit" size="lg" className="h-11 w-full text-base">
        Send email
      </Button>
      <p className="text-sm text-white/70">
        Sending opens your email app with this note addressed to Jackson. Nothing is stored on the
        site.
      </p>
      {opened ? (
        <p className="rounded-lg border border-white/15 bg-black/40 px-3 py-3 text-sm text-white" role="status">
          If your email app did not open, write directly to{" "}
          <a className="text-[#ffb07a] underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
