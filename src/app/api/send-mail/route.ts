import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const { to, subject, message } = await req.json();

    if (!to || !subject || !message) {
      return NextResponse.json(
        { message: "to, subject, and message are required" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to,
      subject,
      html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
    <h2 style="color:#2563eb; font-weight:600;">📢 Notifikasi Antrean Pasien Baru</h2>

    <p>Halo Admin,</p>

    <p>
      Telah bergabung <strong>1 pasien baru</strong> dalam antrean hari ini.
      Silakan cek dashboard untuk memproses antrean selanjutnya.
    </p>

    <div style="background:#f3f4f6; padding:12px 16px; border-radius:8px; margin-top:10px;">
      <p style="margin:0; font-size:14px;">
        <strong>Pesan:</strong> ${message}
      </p>
    </div>

    <p style="margin-top:18px;">
      Klik tombol berikut untuk membuka antrean:
    </p>

    <a href="${process.env.NEXT_PUBLIC_DASHBOARD_URL}" 
      style="background:#2563eb; color:white; padding:10px 16px; border-radius:6px; text-decoration:none; font-weight:600;">
      Buka Dashboard
    </a>

    <p style="margin-top:22px; font-size:12px; color:#666;">
      Email ini dikirim otomatis oleh sistem antrean MyMedica.id
    </p>
  </div>
  `,
    });

    if (error) {
      return NextResponse.json(
        { message: "Failed to send email", error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to send email", error },
      { status: 500 }
    );
  }
}
