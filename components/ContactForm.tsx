"use client";

import { useState, type ReactNode } from "react";

type Status = "idle" | "sending" | "success" | "error";

type ContactFormProps = {
  children?: ReactNode;
};

export function ContactForm({ children }: ContactFormProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong.");
        return;
      }

      setStatus("success");
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  function close() {
    setOpen(false);
    setTimeout(() => {
      setStatus("idle");
      setErrorMessage("");
    }, 200);
  }

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        {children}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="relative inline-flex items-center justify-center p-[1px] rounded-md overflow-hidden group md:ml-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#489EFF] to-[#0050FF]" />
          <div className="relative bg-[#0078FF]/80 px-4 py-2 rounded-[5px] text-sm font-semibold text-white hover:bg-[#0078FF]/90 transition">
            {open ? "Close" : "Contact Us"}
          </div>
        </button>
      </div>

      {open && (
        <div className="w-full flex justify-center">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-5">
          <h3 id="contact-form-title" className="text-lg font-semibold text-white mb-4">
            Get in touch
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-medium text-white/80 mb-1.5">
                Name *
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#489EFF] focus:ring-1 focus:ring-[#489EFF]"
                placeholder="Your name"
                disabled={status === "sending"}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-xs font-medium text-white/80 mb-1.5">
                Email *
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#489EFF] focus:ring-1 focus:ring-[#489EFF]"
                placeholder="you@company.com"
                disabled={status === "sending"}
              />
            </div>
            <div>
              <label htmlFor="contact-company" className="block text-xs font-medium text-white/80 mb-1.5">
                Company
              </label>
              <input
                id="contact-company"
                type="text"
                value={formData.company}
                onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
                className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#489EFF] focus:ring-1 focus:ring-[#489EFF]"
                placeholder="Company (optional)"
                disabled={status === "sending"}
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-xs font-medium text-white/80 mb-1.5">
                Message *
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#489EFF] focus:ring-1 focus:ring-[#489EFF] resize-none"
                placeholder="Tell us about your trade finance needs..."
                disabled={status === "sending"}
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-red-400">{errorMessage}</p>
            )}
            {status === "success" && (
              <p className="text-sm text-emerald-400">
                Thanks! We’ll get back to you soon.
              </p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={close}
                className="flex-1 rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === "sending"}
                className="flex-1 rounded-md bg-[#0078FF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0066DD] transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {status === "sending" ? "Sending…" : "Send inquiry"}
              </button>
            </div>
          </form>
          </div>
        </div>
      )}
    </div>
  );
}
