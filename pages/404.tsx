// pages/404.tsx
import Link from 'next/link';
import Layout from '../components/layout/Layout';

export default function NotFound() {
  return (
    <Layout title="404 — Page Not Found">
      <section className="section" style={{ textAlign:'center', padding:'120px 0' }}>
        <div className="container">
          <div style={{ fontSize:80, marginBottom:20 }}>🏫</div>
          <h1 style={{ fontSize:'clamp(3rem,8vw,6rem)', color:'var(--navy)', marginBottom:10 }}>404</h1>
          <h2 style={{ marginBottom:16 }}>Page Not Found</h2>
          <p style={{ color:'var(--grey)', fontSize:'1.1rem', maxWidth:480, margin:'0 auto 36px' }}>
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/"        className="btn btn-primary btn-lg">Go to Homepage</Link>
            <Link href="/schools" className="btn btn-navy btn-lg">View Member Schools</Link>
            <Link href="/contact" className="btn btn-outline btn-lg">Contact Us</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
