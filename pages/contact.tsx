import { useState } from 'react';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import { client, SETTINGS_QUERY } from '../lib/sanity';
import type { SiteSettings } from '../types';

interface ContactProps { settings: SiteSettings | null; }
type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact({ settings }: ContactProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'General Enquiry', message:'' });
  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
      setStatus('sent');
    } catch { setStatus('error'); }
  };

  const phone1    = settings?.phone1    ?? '+233 24 362 3269';
  const phone2    = settings?.phone2    ?? '+233 50 740 3888';
  const whatsapp  = settings?.whatsapp  ?? '+233 53 050 5031';
  const email     = settings?.email     ?? 'info@copti.org.gh';
  const address   = settings?.address   ?? 'COPTI Secretariat, Ghana';

  return (
    <Layout title="Contact Us - COPTI Ghana" description="Get in touch with the COPTI Secretariat.">
      <div className="pageHero" style={{position:'relative', background: 'var(--navy)', minHeight: 260, display:'flex', alignItems:'center'}}>
        <img src="/hero/hero (3).JPG" alt="Hero" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.22, zIndex:0}} />
        <div className="container" style={{position:'relative',zIndex:1}}>
          <nav className="breadcrumb">
            <Link href="/">Home</Link> <span>/</span>
            <span className="current">Contact Us</span>
          </nav>
          <h1>Contact Us</h1>
          <p>Get in touch with the COPTI Secretariat. We're here to help.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contactLayout">

            {/* FORM */}
            <div>
              <h2 style={{ marginBottom:24 }}>Send Us a Message</h2>
              {status === 'sent' ? (
                <div className="formSuccess">
                  <i className="fa fa-check-circle" /> Your message has been sent. We'll respond within 2–3 working days.
                </div>
              ) : (
                <form onSubmit={submit}>
                  <div className="formGroup">
                    <label htmlFor="c-name">Full Name *</label>
                    <input id="c-name" name="name" value={form.name} onChange={handle} required />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="c-email">Email Address *</label>
                    <input id="c-email" type="email" name="email" value={form.email} onChange={handle} required />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="c-phone">Phone Number</label>
                    <input id="c-phone" type="tel" name="phone" value={form.phone} onChange={handle} />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="c-subject">Subject</label>
                    <select id="c-subject" name="subject" value={form.subject} onChange={handle}>
                      {['General Enquiry','Membership','Events','Media','Other'].map(s => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="formGroup">
                    <label htmlFor="c-message">Message *</label>
                    <textarea id="c-message" name="message" value={form.message} onChange={handle} rows={6} required />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg" disabled={status==='sending'}>
                    {status==='sending' ? 'Sending…' : 'Send Message →'}
                  </button>
                  {status==='error' && <p style={{ color:'red',marginTop:10,fontSize:14 }}>Something went wrong. Please try again.</p>}
                </form>
              )}
            </div>

            {/* INFO */}
            <div>
              <h2 style={{ marginBottom:30 }}>Get In Touch</h2>
              {[
                { icon:'fa fa-map-marker-alt', label:'Office Address',  value: address,       href: undefined },
                { icon:'fa fa-phone',          label:'Phone',           value: phone1,        href:`tel:${phone1}` },
                { icon:'fa fa-phone',          label:'Phone 2',         value: phone2,        href:`tel:${phone2}` },
                { icon:'fab fa-whatsapp',      label:'WhatsApp',        value: whatsapp,      href:`tel:${whatsapp}` },
                { icon:'fa fa-envelope',       label:'Email',           value: email,         href:`mailto:${email}` },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="contactInfoItem">
                  <div className="contactIcon"><i className={icon} /></div>
                  <div className="contactInfoText">
                    <h4>{label}</h4>
                    {href ? <a href={href}>{value}</a> : <p>{value}</p>}
                  </div>
                </div>
              ))}
              <div className="contactInfoItem">
                <div className="contactIcon"><i className="fa fa-clock" /></div>
                <div className="contactInfoText">
                  <h4>Office Hours</h4>
                  <p>Monday – Friday: 8:00 AM – 5:00 PM</p>
                  <p>Saturday: 9:00 AM – 1:00 PM</p>
                </div>
              </div>
              <div style={{ marginTop:24 }}>
                <h4 className="font-btn" style={{ marginBottom:14, fontSize:'0.85rem', textTransform:'uppercase', letterSpacing:'0.5px', color:'var(--grey)' }}>Follow COPTI</h4>
                <div style={{ display:'flex', gap:10 }}>
                  {[
                    ['fab fa-facebook-f','#4267B2','https://www.facebook.com/coptiGhana'],
                    ['fab fa-x-twitter','#000000','https://x.com/coptiGhana'],
                    ['fab fa-instagram','#E1306C','https://www.instagram.com/coptiGhana'],
                    ['fab fa-whatsapp','#25D366','https://wa.me/233530505031'],
                    ['fab fa-linkedin','#0077B5','https://www.linkedin.com/company/copti-ghana'],
                    ['fab fa-youtube','#FF0000','https://www.youtube.com/@coptiGhana']
                  ].map(([icon,bg,href])=>(
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="btn btn-sm" style={{ background:bg,color:'white' }}>
                      <i className={icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* MAP */}
          <div className="contactMap" style={{ marginTop:60 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.6!2d-0.201!3d5.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzYn!5e0!3m2!1sen!2sgh!4v1600000000000"
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="COPTI Office Location"
              style={{ width:'100%',height:'100%',border:0 }}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<ContactProps> = async () => {
  const settings = await client.fetch<SiteSettings>(SETTINGS_QUERY).catch(() => null);
  return { props: { settings: settings ?? null }, revalidate: 3600 };
};
