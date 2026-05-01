"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "loading" | "success" | "error";

export function DemoModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const dialogRef = useRef<HTMLDialogElement>(null);
  const t = useTranslations("DemoModal");

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("request-demo", handler);
    return () => window.removeEventListener("request-demo", handler);
  }, []);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  const close = () => {
    setOpen(false);
    setStatus("idle");
    setForm({ name: "", email: "", company: "", message: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="m-auto w-full max-w-lg rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm"
      onClick={(e) => { if (e.target === dialogRef.current) close(); }}
      onKeyDown={(e) => { if (e.key === "Escape") close(); }}
    >
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-black text-gray-900">{t("title")}</h2>
            <p className="text-sm text-gray-400 mt-1">{t("subtitle")}</p>
          </div>
          <button
            onClick={close}
            className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {status === "success" ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-green-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-900">{t("successTitle")}</h3>
            <p className="mt-2 text-sm text-gray-400">{t("successDesc")}</p>
            <button
              onClick={close}
              className="mt-6 rounded-xl bg-brand-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
            >
              {t("done")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  {t("nameRequired")} <span className="text-brand-primary">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder={t("namePlaceholder")}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  {t("emailRequired")} <span className="text-brand-primary">*</span>
                </label>
                <input
                  required
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t("companyLabel")}</label>
              <input
                type="text"
                placeholder={t("companyPlaceholder")}
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t("messageLabel")}</label>
              <textarea
                rows={3}
                placeholder={t("messagePlaceholder")}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-none rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
              />
            </div>

            {status === "error" && (
              <p className="text-xs text-red-500">
                {t("errorText")}{" "}
                <a href="mailto:david@tempest-pay.com" className="underline">
                  david@tempest-pay.com
                </a>
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-xl bg-brand-primary py-3 text-sm font-bold text-white shadow-lg shadow-brand-primary/25 hover:bg-blue-700 transition-colors disabled:opacity-60"
            >
              {status === "loading" ? t("submitting") : t("submit")}
            </button>

            <p className="text-center text-xs text-gray-400">{t("responseTime")}</p>
          </form>
        )}
      </div>
    </dialog>
  );
}
