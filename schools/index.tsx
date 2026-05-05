import { useState, useMemo, useRef } from 'react';
import type { GetStaticProps } from 'next';
import Layout from '../../components/layout/Layout';
import SchoolCard from '../../components/schools/SchoolCard';
import { client, SCHOOLS_QUERY } from '../../lib/sanity';

import type { SchoolsPageProps, SchoolCard as SchoolCardType } from '../../types';

const REGIONS: string[] = [
  'Greater Accra Region', 'Ashanti Region', 'Western Region', 'Eastern Region',
  'Central Region', 'Volta Region', 'Northern Region', 'Upper East Region',
  'Upper West Region', 'Bono Region', 'Bono East Region', 'Ahafo Region',
  'Savannah Region', 'North East Region', 'Oti Region', 'Western North Region',
];

// ICT Integration Levels
const ICT_LEVELS = [
  { value: '', label: 'ICT Integration Level (if available)' },
  { value: 'Basic', label: 'Basic' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' },
];

const PER_PAGE = 12;

export default function SchoolsDirectory({ schools }: SchoolsPageProps) {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [type,   setType]   = useState('');
  const [sort,   setSort]   = useState('name-asc');
  const [page,   setPage]   = useState(1);

  // Ref to scroll to grid on pagination
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo<SchoolCardType[]>(() => {
    let list = [...(schools ?? [])];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(s =>
        s.name?.toLowerCase().includes(q) ||
        s.region?.toLowerCase().includes(q) ||
        s.district?.toLowerCase().includes(q) ||
        s.programmes?.toLowerCase().includes(q)
      );
    }
    if (region) list = list.filter(s => s.region === region);
    if (type)   list = list.filter(s => s.ictLevel === type);
    list.sort((a, b) => sort === 'name-desc'
      ? (b.name ?? '').localeCompare(a.name ?? '')
      : (a.name ?? '').localeCompare(b.name ?? '')
    );
    return list;
  }, [schools, search, region, type, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged      = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const reset = () => {
    setSearch(''); setRegion(''); setType('');
    setSort('name-asc'); setPage(1);
  };

  // Scroll to grid top (not page top) on page change
  const goPage = (p: number) => {
    setPage(p);
    setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <Layout
      title="Member Schools - COPTI Ghana"
      description={`Explore all ${schools?.length ?? 59} accredited technical institutes under COPTI across Ghana.`}
    >
      {/* HERO */}
      <div className="pageHero" style={{position:'relative', background: 'var(--navy)', minHeight: 260, display:'flex', alignItems:'center'}}>
        <img src="/hero/hero (2).JPG" alt="Hero" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.22, zIndex:0}} />
        <div className="container" style={{position:'relative',zIndex:1}}>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a> <span>/</span>
            <span className="current">Member Schools</span>
          </nav>
          <h1>Member Schools Directory</h1>
          <p>
            Explore all {(schools?.length ?? 59) + ' '}accredited technical institutes
            represented under COPTI across Ghana&apos;s 16 regions.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">

          {/* SEARCH & FILTER CARD */}
          <div style={{ background: 'white', borderRadius: 14, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', padding: 24, marginBottom: 36, border: '1px solid #e8edf5' }}>

            {/* Search row */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
                <i className="fa fa-search" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--grey)', fontSize: 13, pointerEvents: 'none' }} />
                <input
                  type="text"
                  placeholder="Search by name, region, or programme…"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                  style={{ width: '100%', padding: '12px 16px 12px 40px', border: '1.5px solid #e0e6f0', borderRadius: 8, fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-body)', transition: 'border-color 0.2s' }}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'var(--navy)'}
                  onBlur={e  => (e.target as HTMLInputElement).style.borderColor = '#e0e6f0'}
                />
              </div>
              <button className="btn btn-primary" onClick={() => setPage(1)} style={{ whiteSpace: 'nowrap' }}>
                <i className="fa fa-search" /> Search
              </button>
            </div>

            {/* Filter row */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>

              {/* Region */}
              <select value={region} onChange={e => { setRegion(e.target.value); setPage(1); }}
                style={{ flex: 1, minWidth: 160, padding: '11px 14px', border: '1.5px solid #e0e6f0', borderRadius: 8, fontSize: '0.9rem', background: 'white', cursor: 'pointer', outline: 'none', fontFamily: 'var(--font-body)' }}>
                <option value="">All Regions</option>
                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>

              {/* ICT Level */}
              <select value={type} onChange={e => { setType(e.target.value); setPage(1); }}
                style={{ flex: 1, minWidth: 180, padding: '11px 14px', border: '1.5px solid #e0e6f0', borderRadius: 8, fontSize: '0.9rem', background: 'white', cursor: 'pointer', outline: 'none', fontFamily: 'var(--font-body)' }}>
                {ICT_LEVELS.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>

              {/* Sort */}
              <select value={sort} onChange={e => setSort(e.target.value)}
                style={{ flex: 1, minWidth: 130, padding: '11px 14px', border: '1.5px solid #e0e6f0', borderRadius: 8, fontSize: '0.9rem', background: 'white', cursor: 'pointer', outline: 'none', fontFamily: 'var(--font-body)' }}>
                <option value="name-asc">Name A–Z</option>
                <option value="name-desc">Name Z–A</option>
              </select>

              <button className="btn btn-outline btn-sm" onClick={reset} style={{ whiteSpace: 'nowrap' }}>
                <i className="fa fa-times" /> Reset
              </button>
            </div>

            {/* Count */}
            <p style={{ fontSize: 13, color: 'var(--grey)', marginTop: 12, marginBottom: 0 }}>
              Showing <strong style={{ color: 'var(--navy)' }}>{filtered.length}</strong> of{' '}
              <strong style={{ color: 'var(--navy)' }}>{schools?.length ?? 0}</strong> schools
              {type && filtered.length === 0 && (
                <span style={{ color: 'var(--gold)', marginLeft: 8 }}>
                  (No schools with ICT Integration Level "{type}" found or info not available)
                </span>
              )}
            </p>
          </div>

          {/* GRID — ref here so pagination scrolls to this point */}
          <div ref={gridRef} style={{ scrollMarginTop: 90 }}>
            {paged.length > 0 ? (
              <div className="schoolsGrid">
                {paged.map(school => <SchoolCard key={school._id} school={school} />)}
              </div>
            ) : (
              <div className="noResults">
                <h3>No schools found</h3>
                <p>Try adjusting your search or filters.</p>
                <button className="btn btn-primary" onClick={reset}>Clear Filters</button>
              </div>
            )}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="pagination" style={{ marginTop: 40 }}>
              <button
                className="pageBtn"
                onClick={() => goPage(Math.max(1, page - 1))}
                disabled={page === 1}
              >←</button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  className={`pageBtn${page === p ? ' active' : ''}`}
                  onClick={() => goPage(p)}
                >{p}</button>
              ))}

              <button
                className="pageBtn"
                onClick={() => goPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
              >→</button>
            </div>
          )}

        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<SchoolsPageProps> = async () => {
  const schools = await client.fetch<SchoolCardType[]>(SCHOOLS_QUERY).catch(() => []);
  return { props: { schools: schools ?? [] }, revalidate: 10 };
};