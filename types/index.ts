import type { PortableTextBlock } from '@portabletext/react';

// ── Sanity Image ─────────────────────────────────────
export interface SanityImage {
  _type: 'image';
  asset: { _ref: string; _type: 'reference' };
  hotspot?: { x: number; y: number; height: number; width: number };
  alt?: string;
}

// ── School ───────────────────────────────────────────
export interface SchoolFacilities {
  workshopsAvailable?:  string;
  workshopCondition?:   string;
  classroomsStatus?:    string;
  adminBlock?:          string;
  ictInfrastructure?:   string;
  staffAccommodation?:  string;
  schoolVehicle?:       string;
}

export interface SchoolIndustry {
  partnerIndustries?:     string;
  welParticipation?:      string;
  jobPlacementSupport?:   string;
  graduateEmploymentPct?: number;
}

export interface SchoolAchievements {
  majorAchievements?:      string;
  awards?:                 string;
  studentProjects?:        string;
  innovationInitiatives?:  string;
}

export interface SchoolPrincipal {
  name?:          string;
  email?:         string;
  phone?:         string;
  otherContacts?: string;
}

export interface SchoolSocial {
  facebook?:  string;
  twitter?:   string;
  instagram?: string;
  tiktok?:    string;
  youtube?:   string;
}

/** Lightweight card version — used in directory listings */
export interface SchoolCard {
  _id:              string;
  name:             string;
  slug:             { current: string } | string;
  schoolType?:      string;
  region?:          string;
  district?:        string;
  phone?:           string;
  email?:           string;
  shortDescription?: string;
  logo?:            SanityImage;
  programmes?:      string;
  isFeatured?:      boolean;
  yearEstablished?: number;
  ictLevel?:        string;
}

/** Full profile — used on [slug].tsx */
export interface School extends SchoolCard {
  website?:          string;
  motto?:            string;
  fullProfile?:      PortableTextBlock[];
  gpsCoordinates?:   string;
  gpsAddress?:       string;
  boardingFacilities?: string;
  residenceType?:    string;
  gallery?:          SanityImage[];
  galleryDriveLinks?: string;
  principal?:        SchoolPrincipal;
  programmeDuration?: string;
  coreSubjects?:     string;
  entryRequirements?: string;
  industryLinkage?:  string;
  facilities?:       SchoolFacilities;
  industry?:         SchoolIndustry;
  achievements?:     SchoolAchievements;
  social?:           SchoolSocial;
}

// ── Post / Blog ──────────────────────────────────────
export interface PostCategory {
  title: string;
  slug:  { current: string };
}

export interface PostAuthor {
  name:   string;
  image?: SanityImage;
  bio?:   string;
}

/** Lightweight — used in listings */
export interface PostCard {
  _id:          string;
  title:        string;
  slug:         { current: string };
  publishedAt:  string;
  excerpt?:     string;
  mainImage?:   SanityImage;
  categories?:  PostCategory[];
  author?:      { name: string };
}

/** Full post — used on [slug].tsx */
export interface Post extends PostCard {
  body?:    PortableTextBlock[];
  author?:  PostAuthor;
}

// ── Event ────────────────────────────────────────────
export interface Event {
  _id:               string;
  title:             string;
  slug:              { current: string };
  eventDate:         string;
  endDate?:          string;
  venue?:            string;
  description?:      PortableTextBlock[];
  image?:            SanityImage;
  registrationLink?: string;
  isPast?:           boolean;
}

// ── Site Settings ────────────────────────────────────
export interface SiteSettings {
  totalSchools?:      number | string;
  regionsCount?:      number;
  yearsOperating?:    number | string;
  trainedPrincipals?: number | string;
  phone1?:            string;
  phone2?:            string;
  whatsapp?:          string;
  email?:             string;
  address?:           string;
  facebook?:          string;
  twitter?:           string;
  youtube?:           string;
}

// ── Page Props ───────────────────────────────────────
export interface HomePageProps {
  featuredSchools: SchoolCard[];
  latestPosts:     PostCard[];
  settings:        SiteSettings | null;
}

export interface SchoolsPageProps {
  schools: SchoolCard[];
}

export interface SchoolProfileProps {
  school: School;
  relatedSchools: SchoolCard[];
}

export interface NewsPageProps {
  posts: PostCard[];
}

export interface PostPageProps {
  post: Post;
}

export interface EventsPageProps {
  events: Event[];
}
