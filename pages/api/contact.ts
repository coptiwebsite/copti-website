import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = 'info@copti.org.gh';
const FROM = process.env.RESEND_FROM_EMAIL ?? 'noreply@copti.org.gh';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { name, email, phone, subject, message } = req.body as Record<string, string>;
  if (!name || !email || !message) return res.status(400).json({ message: 'Missing required fields' });

  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: subject ? `[COPTI Contact] ${subject}` : '[COPTI Contact] New Message',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone ?? '—'}\nSubject: ${subject ?? '—'}\n\n${message}`,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend contact error:', err);
    res.status(500).json({ message: 'Failed to send message' });
  }
}
