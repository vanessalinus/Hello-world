"use client";

import { FormEvent, useState } from "react";

type ContactState =
  | { status: "idle"; message: "" }
  | { status: "submitting"; message: "Sending message..." }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function ContactForm() {
  const [state, setState] = useState<ContactState>({ status: "idle", message: "" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setState({ status: "submitting", message: "Sending message..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          phone: String(formData.get("phone") ?? ""),
          message: String(formData.get("message") ?? ""),
          company: String(formData.get("company") ?? ""),
        }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Unable to send your message.");
      }

      form.reset();
      setState({
        status: "success",
        message: result.message ?? "Thank you. Leviva will respond as soon as possible.",
      });
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to send your message. Please contact Leviva directly.",
      });
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <label>
        Name
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Phone or WhatsApp
        <input name="phone" type="tel" autoComplete="tel" />
      </label>
      <label>
        Message
        <textarea name="message" rows={4} required />
      </label>
      <button className="secondary-button" disabled={state.status === "submitting"}>
        {state.status === "submitting" ? "Sending..." : "Send message"}
      </button>
      {state.message ? (
        <p className={`form-status ${state.status === "error" ? "is-error" : "is-success"}`}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
