// pages/api/enquiry.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, phone, message, school } = req.body as {
    name: string; email: string; phone?: string; message: string; school: string;
  };

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  console.log(`School enquiry for [${school}]:`, { name, email, phone, message });

  // Configure Nodemailer here same as contact.ts when ready for production
  // Subject should include school name: `Enquiry about ${school}`

  return res.status(200).json({ success: true });
}
