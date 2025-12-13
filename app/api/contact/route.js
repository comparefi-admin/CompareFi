export const runtime = "nodejs";

import nodemailer from "nodemailer";

// Helper: user-facing error
const userError = (message, status = 400) =>
  new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export async function POST(req) {
  try {
    // ---------- ENV VALIDATION ----------
    const requiredEnv = [
      "SMTP_HOST",
      "SMTP_PORT",
      "SMTP_USER",
      "SMTP_PASS",
      "CONTACT_RECEIVER_EMAIL",
    ];

    for (const key of requiredEnv) {
      if (!process.env[key]) {
        console.error(`❌ Missing env variable: ${key}`);
        return userError(
          "Email service not configured. Please try again later.",
          500
        );
      }
    }

    // ---------- PARSE BODY ----------
    let payload;
    try {
      payload = await req.json();
    } catch {
      return userError("Invalid request payload.");
    }

    const {
      name,
      mobile,
      email,
      pan,
      message,
      product,
      institution,
      source,
    } = payload || {};

    // ---------- VALIDATION ----------
    if (!name || !mobile || !email || !product) {
      return userError("Missing required fields.");
    }

    // ---------- SMTP TRANSPORT ----------
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ---------- EMAIL CONTENT ----------
    const subject = `New Enquiry: ${product}`;

    const html = `
      <h2>New Enquiry Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${pan ? `<p><strong>PAN:</strong> ${pan}</p>` : ""}
      <p><strong>Product:</strong> ${product}</p>
      ${institution ? `<p><strong>Institution:</strong> ${institution}</p>` : ""}
      ${source ? `<p><strong>Source:</strong> ${source}</p>` : ""}
      ${message ? `<p><strong>Message:</strong><br/>${message}</p>` : ""}
      <hr />
      <p style="font-size:12px;color:#666">
        Sent from CompareFi website
      </p>
    `;

    // ---------- SEND MAIL ----------
    await transporter.sendMail({
      from: `"CompareFi Enquiries" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: email,
      subject,
      html,
    });

    // ---------- SUCCESS ----------
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {

    console.error("❌ Contact API Error:", err);
    return userError(
      "Unable to send your enquiry right now. Please try again later.",
      500
    );
  }
}