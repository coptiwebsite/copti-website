// pages/events.tsx
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/layout/Layout';
import { client, EVENTS_QUERY, urlFor } from '../lib/sanity';
import type { EventsPageProps, Event } from '../types';

export default function EventsPage({ events }: EventsPageProps) {
  const upcoming = events.filter(e => !e.isPast);
  const past     = events.filter(e =>  e.isPast);

  return (
    <Layout title="Events - COPTI Ghana" description="Upcoming COPTI meetings, workshops, seminars, and conferences.">
      <div className="pageHero" style={{position:'relative', background: 'var(--navy)', minHeight: 260, display:'flex', alignItems:'center'}}>
        <img src="/hero/hero (4).JPG" alt="Hero" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.22, zIndex:0}} />
        <div className="container" style={{position:'relative',zIndex:1}}>
          <nav className="breadcrumb">
            <Link href="/">Home</Link> <span>/</span>
            <span className="current">Events</span>
          </nav>
          <h1>Events &amp; Programmes</h1>
          <p>Upcoming COPTI meetings, workshops, seminars, and professional development conferences.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Upcoming Events</h2>
            <div className="title-line" />
          </div>

          {upcoming.length > 0 ? (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px,1fr))', gap:28 }}>
              {upcoming.map(event => (
                <div key={event._id} className="card">
                  {event.image && (
                    <div style={{ aspectRatio:'16/9', overflow:'hidden' }}>
                      <Image src={urlFor(event.image).width(640).height(360).url()} alt={event.title} width={640} height={360} style={{ width:'100%',height:'100%',objectFit:'cover' }} />
                    </div>
                  )}
                  <div className="card-body">
                    <div style={{ display:'flex', gap:8, marginBottom:10, flexWrap:'wrap' }}>
                      <span className="badge badge-category">
                        {new Date(event.eventDate).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}
                      </span>
                      {event.venue && <span style={{ fontSize:13, color:'var(--grey)' }}><i className="fa fa-location-dot" /> {event.venue}</span>}
                    </div>
                    <h3 style={{ marginBottom:10 }}>{event.title}</h3>
                    {event.registrationLink && (
                      <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Register / Details →</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="noResults">
              <h3>No upcoming events</h3>
              <p>Check back soon for upcoming COPTI events and programmes.</p>
            </div>
          )}

          {past.length > 0 && (
            <>
              <div className="section-title" style={{ marginTop:80 }}>
                <h2>Past Events</h2>
                <div className="title-line" />
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px,1fr))', gap:20 }}>
                {past.map(event => (
                  <div key={event._id} style={{ background:'var(--light-bg)', borderRadius:'var(--radius)', padding:20 }}>
                    <span className="font-btn" style={{ fontSize:12, color:'var(--grey)', fontWeight:700 }}>
                      {new Date(event.eventDate).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}
                    </span>
                    <h4 style={{ marginTop:6 }}>{event.title}</h4>
                    {event.venue && <p style={{ fontSize:13, color:'var(--grey)', margin:'4px 0 0' }}><i className="fa fa-location-dot" /> {event.venue}</p>}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<EventsPageProps> = async () => {
  const events = await client.fetch<Event[]>(EVENTS_QUERY).catch(() => []);
  return { props: { events: events ?? [] }, revalidate: 600 };
};
