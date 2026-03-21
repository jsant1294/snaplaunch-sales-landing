import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "send-lead route is live",
    hasResendKey: !!process.env.RESEND_API_KEY,
    hasEmail: !!process.env.LEAD_NOTIFICATION_EMAIL,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const lead = body?.lead || {};

    if (!lead?.name || !lead?.email || !lead?.phone) {
      return NextResponse.json(
        { ok: false, error: "Missing lead fields" },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.LEAD_NOTIFICATION_EMAIL;

    if (!resendApiKey || !toEmail) {
      return NextResponse.json(
        { ok: false, error: "Missing email configuration" },
        { status: 500 }
      );
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>New SnapLaunch Lead</h2>
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Phone:</strong> ${lead.phone}</p>
        <p><strong>Industry:</strong> ${lead.industry || "Unknown"}</p>
      </div>
    `;

    console.log("Sending email to:", toEmail);
    console.log("Lead data:", lead);

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "SnapLaunch <onboarding@resend.dev>",
        to: [toEmail],
        subject: `New Lead: ${lead.name}`,
        html: emailHtml,
      }),
    });

    const responseText = await response.text();
    console.log("Resend response:", response.status, responseText);

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: responseText },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("SEND-LEAD ERROR:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send lead" },
      { status: 500 }
    );
  }
}