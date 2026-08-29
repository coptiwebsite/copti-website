import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import { DEVELOPER_CONTACT, isMaintenanceMode } from '../lib/maintenance';
import styles from '../styles/maintenance.module.css';

function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 006 6l1.5-2 4 1.5v3c0 1-1 2-2 2C9 19.5 4.5 15 4.5 5.5c0-1 1-2 2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.97.52 3.89 1.5 5.58L2 22l4.73-1.54a10.05 10.05 0 005.31 1.44h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2zm5.76 14.13c-.24.68-1.4 1.26-1.93 1.34-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.18-4.94-4.38-.14-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1-2.41.26-.29.57-.36.76-.36h.55c.18 0 .41-.07.64.49.24.58.82 2 .89 2.14.07.15.12.32.02.51-.1.2-.15.32-.3.5-.15.17-.31.39-.45.52-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.3.14.47.12.64-.07.17-.2.74-.86.94-1.16.2-.29.4-.24.67-.14.27.1 1.72.81 2.02.96.3.14.5.22.57.34.07.13.07.73-.17 1.41z"/>
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9s-1.3 6.2-3.8 9c-2.5-2.8-3.8-5.8-3.8-9S9.5 5.8 12 3z" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  );
}

function IconWrench() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14.7 6.3a4.5 4.5 0 01-5.9 5.9L4 16.9 7.1 20l4.8-4.8a4.5 4.5 0 015.9-5.9l-2.1-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}

export default function MaintenancePage() {
  return (
    <>
      <Head>
        <title>Under Maintenance - COPTI Ghana</title>
        <meta
          name="description"
          content="The COPTI website is temporarily under maintenance. Contact the website developer for assistance."
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1A3A6B" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.page}>
        <img className={styles.bg} src="/hero/hero%20(3).JPG" alt="" />

        <div className={styles.inner}>
          <img className={styles.logo} src="/logo1.png" alt="COPTI" />

          <div className={styles.badge}>
            <IconWrench />
            Temporarily unavailable
          </div>

          <h1>We&apos;ll be back soon</h1>
          <p className={styles.lead}>
            The COPTI website is currently under maintenance. We apologise for the
            inconvenience. For urgent enquiries, please contact the developer.
          </p>

          <div className={styles.card}>
            <p className={styles.role}>Website developer</p>
            <h2>{DEVELOPER_CONTACT.name}</h2>
            <a className={styles.link} href={DEVELOPER_CONTACT.contactPage} target="_blank" rel="noopener noreferrer">
              <IconGlobe />
              celestialwebsolutions.net
            </a>
            <a className={styles.link} href={DEVELOPER_CONTACT.phoneHref}>
              <IconPhone />
              {DEVELOPER_CONTACT.phone}
            </a>
            <a className={styles.link} href={DEVELOPER_CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer">
              <IconWhatsApp />
              WhatsApp {DEVELOPER_CONTACT.whatsapp}
            </a>
            <a className={styles.link} href={DEVELOPER_CONTACT.emailHref}>
              <IconMail />
              {DEVELOPER_CONTACT.email}
            </a>
          </div>

          <p className={styles.foot}>
            Conference of Principals of Technical Institutions - Ghana
          </p>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (!isMaintenanceMode()) {
    return { redirect: { destination: '/', permanent: false } };
  }

  res.statusCode = 503;
  res.setHeader('Retry-After', '3600');
  res.setHeader('Cache-Control', 'no-store, must-revalidate');
  return { props: {} };
};
