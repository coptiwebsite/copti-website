import Link from 'next/link';

const AFFILIATES = [
  { label: 'Ghana Education Service',  href: 'https://ges.gov.gh',          abbr: 'GES'   },
  { label: 'National Teaching Council', href: 'https://ntc.gov.gh',         abbr: 'NTC'   },
  { label: 'Ministry of Education',    href: 'https://moe.gov.gh',          abbr: 'MoE'   },
  { label: 'COTVET',                   href: 'https://cotvet.gov.gh',       abbr: 'COTVET' },
  { label: 'Ghana TVET Service',       href: 'https://gtvetservice.gov.gh', abbr: 'GTVET'  },
];

const SOCIALS = [
  { icon: 'fab fa-facebook-f', href: 'https://www.facebook.com/coptiGhana',   label: 'Facebook',  color: '#1877F2' },
  { icon: 'fab fa-x-twitter',  href: 'https://x.com/coptiGhana',             label: 'X',         color: '#000000' },
  { icon: 'fab fa-instagram',  href: 'https://www.instagram.com/coptiGhana', label: 'Instagram', color: '#E1306C' },
  { icon: 'fab fa-youtube',    href: 'https://www.youtube.com/@coptiGhana',   label: 'YouTube',   color: '#FF0000' },
  { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/company/copti-ghana', label: 'LinkedIn', color: '#0077B5' },
];

export default function Footer() {
  return (
    <footer>
      {/* ── CTA STRIP ── */}
      <div className="footerCtaStrip">
        <div className="container">
          <div>
            <p>Ready to connect with COPTI?</p>
            <small>Contact the Secretariat today — we are here to support your institute.</small>
          </div>
          <Link href="/contact" className="btn btn-secondary">Get In Touch</Link>
        </div>
      </div>

      {/* ── MAIN FOOTER ── */}
      <div className="siteFooter">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 1fr 1fr 1.3fr',
            gap: '48px 40px',
            paddingTop: 64,
            paddingBottom: 48,
          }}>

            {/* ── COL 1: Brand + description ── */}
            <div>
              <a href="https://copti.org.gh" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-block', marginBottom: 16 }}>
                <img
                  src="/logo1.png"
                  alt="COPTI Logo"
                  style={{
                    height: 90,
                    width: 'auto',
                    display: 'block',
                    filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.35)) brightness(1.08)',
                  }}
                />
              </a>
              <h3 style={{
                color: 'white',
                fontSize: '1rem',
                fontWeight: 700,
                margin: '0 0 10px',
                letterSpacing: '0.2px',
                lineHeight: 1.3,
              }}>
                Conference of Principals of<br />Technical Institutions
              </h3>
              <p style={{
                color: 'rgba(255,255,255,0.52)',
                fontSize: 13.5,
                lineHeight: 1.75,
                margin: '0 0 6px',
                maxWidth: 290,
              }}>
                The national body uniting principals of public technical institutions
                across all 16 regions of Ghana — advocating for TVET excellence,
                policy reform, and skills development.
              </p>
              <p style={{
                color: 'rgba(255,255,255,0.38)',
                fontSize: 12,
                fontStyle: 'italic',
                margin: 0,
              }}>
                Together for Skills — Together for Ghana.
              </p>
            </div>

            {/* ── COL 2: Quick Links ── */}
            <div>
              <h2 style={{ ...headingStyle, fontSize: 18 }}>Quick Links</h2>
              <ul style={listStyle}>
                {[
                  ['/', 'Home'],
                  ['/about', 'About COPTI'],
                  ['/schools', 'Member Schools'],
                  ['/news', 'News & Blog'],
                  ['/events', 'Events'],
                  ['/gallery', 'Gallery'],
                  ['/contact', 'Contact Us'],
                  ['/privacy-policy', 'Privacy Policy'],
                ].map(([href, label]) => (
                  <li key={href} style={{ marginBottom: 10 }}>
                    <Link href={href} style={{ ...linkStyle, fontSize: 16 }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── COL 3: Affiliations ── */}
            <div>
              <h2 style={{ ...headingStyle, fontSize: 18 }}>Affiliations</h2>
              <ul style={listStyle}>
                {AFFILIATES.map(({ label, href }) => (
                  <li key={label} style={{ marginBottom: 18 }}>
                    <a href={href} target="_blank" rel="noopener noreferrer"
                      style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: 14, padding: '6px 0', fontSize: 16 }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                    >
                      <span style={{ fontSize: 16 }}>{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── COL 4: Contact + Social bubbles ── */}
            <div>
              <h2 style={{ ...headingStyle, fontSize: 20 }}>Contact Info.</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>

                {/* Phone */}
                <ContactRow icon="fa fa-phone" color="var(--gold)" href="tel:+233243623269" label="+233 24 362 3269" />
                <ContactRow icon="fa fa-phone" color="var(--gold)" href="tel:+233507403888" label="+233 50 740 3888" />

                {/* WhatsApp */}
                <ContactRow icon="fab fa-whatsapp" color="#25d366" href="https://wa.me/233530505031" label="+233 530 505 031" external />

                {/* Email */}
                <ContactRow icon="fa fa-envelope" color="var(--gold)" href="mailto:info@copti.org.gh" label="info@copti.org.gh" />

                {/* P.O. Box */}
                <ContactRow icon="fa fa-box" color="var(--gold)" label="P.O. Box CT 2878, Cantonments, Accra" />

                {/* Location */}
                <ContactRow icon="fa fa-location-dot" color="var(--gold)"
                  href="https://maps.google.com/?q=Ministry+of+Education+Accra+Ghana"
                  label="Ministry of Education, Accra, Ghana"
                  external />

              </div>

              {/* Social bubble icons */}
              <h4 style={{ ...headingStyle, marginTop: 4 }}>Follow Us</h4>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {SOCIALS.map(({ icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(255,255,255,0.65)',
                      fontSize: 15,
                      transition: 'background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = color;
                      el.style.borderColor = color;
                      el.style.color = 'white';
                      el.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = 'rgba(255,255,255,0.08)';
                      el.style.borderColor = 'rgba(255,255,255,0.12)';
                      el.style.color = 'rgba(255,255,255,0.65)';
                      el.style.transform = '';
                    }}
                  >
                    <i className={icon} />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="footerBottom">
          <div className="container" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 6 }}>
            <span>&copy; {new Date().getFullYear()} COPTI &mdash; All rights reserved.</span>
            <span>
              Website Developed and Powered by{' '}
              <a href="https://celestialwebsolutions.net" target="_blank" rel="noopener noreferrer">
                Celestial Web Solutions
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────
const headingStyle: React.CSSProperties = {
  color: 'white',
  fontSize: 11,
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '1.1px',
  marginBottom: 18,
};

const listStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const linkStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.55)',
  textDecoration: 'none',
  fontSize: 14,
  lineHeight: 1.4,
  transition: 'color 0.2s',
};

function ContactRow({
  icon, color, href, label, external,
}: {
  icon: string; color: string; href?: string; label: string; external?: boolean;
}) {
  const inner = (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
      <span style={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color,
        fontSize: 13,
      }}>
        <i className={icon} />
      </span>
      <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13.5, lineHeight: 1.5, paddingTop: 6 }}>
        {label}
      </span>
    </div>
  );

  if (!href) return inner;

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{ textDecoration: 'none', transition: 'opacity 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
    >
      {inner}
    </a>
  );
}