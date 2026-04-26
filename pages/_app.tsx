import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Script from 'next/script';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="google-site-verification" content="gGJ9Zm7NUWdtF-H-M283_8GAHnPSNQuh3rrsoOdQy44" />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-QDGD481DEB"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QDGD481DEB');
        `}
      </Script>
      <Component {...pageProps} />
    </>
  );
}