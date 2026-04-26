// pages/404.tsx
import Link from 'next/link';
import Layout from '../components/layout/Layout';

export default function NotFound() {
  return (
    <Layout title="404 — Page Not Found">
      <section style={{ padding: '80px 0 100px', background: '#f8fafd', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>

            {/* Illustration */}
            <div style={{ marginBottom: 36, display: 'flex', justifyContent: 'center' }}>
              <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Building base */}
                <rect x="30" y="70" width="120" height="80" rx="4" fill="#1A3A6B" opacity="0.08"/>
                <rect x="38" y="62" width="104" height="88" rx="4" fill="#1A3A6B" opacity="0.12"/>
                <rect x="46" y="55" width="88" height="95" rx="4" fill="#1A3A6B"/>
                {/* Roof */}
                <path d="M38 58L90 20L142 58H38Z" fill="#C9952A"/>
                {/* Door */}
                <rect x="76" y="108" width="28" height="42" rx="3" fill="#C9952A" opacity="0.9"/>
                <circle cx="100" cy="130" r="2.5" fill="#1A3A6B"/>
                {/* Windows row 1 */}
                <rect x="58" y="74" width="18" height="16" rx="2" fill="white" opacity="0.25"/>
                <rect x="104" y="74" width="18" height="16" rx="2" fill="white" opacity="0.25"/>
                {/* Windows row 2 */}
                <rect x="58" y="98" width="18" height="16" rx="2" fill="white" opacity="0.25"/>
                <rect x="104" y="98" width="18" height="16" rx="2" fill="white" opacity="0.25"/>
                {/* Flag pole */}
                <line x1="90" y1="4" x2="90" y2="22" stroke="#C9952A" strokeWidth="2"/>
                <path d="M90 4L108 10L90 16V4Z" fill="#C9952A"/>
                {/* Ground */}
                <rect x="20" y="148" width="140" height="4" rx="2" fill="#1A3A6B" opacity="0.12"/>
                {/* Question mark */}
                <circle cx="148" cy="38" r="22" fill="#C9952A" opacity="0.15"/>
                <circle cx="148" cy="38" r="22" stroke="#C9952A" strokeWidth="2"/>
                <text x="148" y="45" textAnchor="middle" fill="#C9952A" fontSize="22" fontWeight="700" fontFamily="Georgia, serif">?</text>
              </svg>
            </div>

            {/* 404 number */}
            <div style={{
              fontSize: 'clamp(4rem, 12vw, 7rem)',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: 'var(--navy)',
              marginBottom: 12,
              fontFamily: 'var(--font-head)',
            }}>
              404
            </div>

            {/* Divider */}
            <div style={{ width: 48, height: 4, background: 'var(--gold)', borderRadius: 2, margin: '0 auto 20px' }} />

            <h1 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'var(--navy)', marginBottom: 12, fontWeight: 700 }}>
              Page Not Found
            </h1>

            <p style={{ color: 'var(--grey)', fontSize: '1.05rem', maxWidth: 460, margin: '0 auto 36px', lineHeight: 1.7 }}>
              The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s get you back on track.
            </p>

            {/* Quick links */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
              <Link href="/" className="btn btn-primary btn-lg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: 8 }}>
                  <path d="M3 12L12 3L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M5 10V20a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Go to Homepage
              </Link>
              <Link href="/schools" className="btn btn-navy btn-lg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: 8 }}>
                  <path d="M4 19V10l8-7 8 7v9a1 1 0 01-1 1H5a1 1 0 01-1-1z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M9 19v-5h6v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Member Schools
              </Link>
              <Link href="/contact" className="btn btn-outline btn-lg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: 8 }}>
                  <path d="M21 5H3a1 1 0 00-1 1v12a1 1 0 001 1h18a1 1 0 001-1V6a1 1 0 00-1-1z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 6l9 7 9-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Contact Us
              </Link>
            </div>

            {/* Helpful links */}
            <div style={{
              background: 'white',
              border: '1px solid #e8edf5',
              borderRadius: 14,
              padding: '24px 28px',
              boxShadow: '0 2px 12px rgba(26,58,107,0.06)',
            }}>
              <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--grey)', marginBottom: 16, fontFamily: 'var(--font-btn)' }}>
                Popular Pages
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
                {[
                  { href: '/news',    label: 'News & Blog' },
                  { href: '/events',  label: 'Events' },
                  { href: '/gallery', label: 'Gallery' },
                  { href: '/about',   label: 'About COPTI' },
                ].map(({ href, label }) => (
                  <Link key={href} href={href} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 16px',
                    background: '#f0f4fa',
                    color: 'var(--navy)',
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: 'none',
                    border: '1px solid #e0e8f4',
                    transition: 'background 0.15s',
                    fontFamily: 'var(--font-btn)',
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {label}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}