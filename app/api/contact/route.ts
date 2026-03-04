import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAILS = ["david@tempest-pay.com", "blidd@tempest-pay.com"] as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body as {
      name?: string;
      email?: string;
      company?: string;
      message?: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email is not configured. Please set RESEND_API_KEY." },
        { status: 500 }
      );
    }

    const html = `
      <h2>Trade Finance / See It in Action – Inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <pre style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(message)}</pre>
    `;

    const { error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ?? "Tempest Website <onboarding@resend.dev>",
      to: TO_EMAILS,
      replyTo: email,
      subject: `Trade Finance inquiry from ${name}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: error.message ?? "Failed to send email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
