// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, phone, subject, message } = req.body as {
    name: string; email: string; phone?: string; subject: string; message: string;
  };

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  // ── Option 1: Log to console (development) ──────────
  console.log('Contact form submission:', { name, email, phone, subject, message });

  // ── Option 2: Send via Nodemailer (production) ───────
  // Uncomment and configure when ready:
  //
  // import nodemailer from 'nodemailer';
  // const transporter = nodemailer.createTransporter({
  //   host: process.env.SMTP_HOST,
  //   port: Number(process.env.SMTP_PORT) || 587,
  //   auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  // });
  // await transporter.sendMail({
  //   from: `"${name}" <${process.env.SMTP_USER}>`,
  //   to: 'info@copti.org.gh',
  //   subject: `COPTI Contact Form — ${subject}`,
  //   text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`,
  // });

  return res.status(200).json({ success: true });
}
