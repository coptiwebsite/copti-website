import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID  || 'y2blq89r',
  dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET      || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION  || '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => builder.image(source);

// ── GROQ Queries ─────────────────────────────────────

export const SCHOOLS_QUERY = `
  *[_type == "school"] | order(name asc) {
    _id, name, slug, schoolType, region, district,
    phone, email, shortDescription, logo, programmes,
    isFeatured, yearEstablished, ictLevel
  }
`;

export const SCHOOL_BY_SLUG_QUERY = `
  *[_type == "school" && slug.current == $slug][0] {
    _id, name, slug, schoolType, region, district,
    phone, email, website, motto, shortDescription, fullProfile,
    yearEstablished, ictLevel, gpsCoordinates, gpsAddress,
    boardingFacilities, residenceType, logo, gallery,
    principal { name, email, phone, otherContacts },
    programmes, programmeDuration, coreSubjects, entryRequirements, industryLinkage,
    facilities { workshopsAvailable, workshopCondition, classroomsStatus,
                 adminBlock, ictInfrastructure, staffAccommodation, schoolVehicle },
    industry   { partnerIndustries, welParticipation, jobPlacementSupport, graduateEmploymentPct },
    achievements { majorAchievements, awards, studentProjects, innovationInitiatives },
    social { facebook, twitter, instagram, tiktok, youtube }
  }
`;

export const SCHOOL_SLUGS_QUERY = `*[_type == "school"] { "slug": slug.current }`;

export const FEATURED_SCHOOLS_QUERY = `
  *[_type == "school" && isFeatured == true] | order(name asc) [0..2] {
    _id, name, slug, schoolType, region, district, logo,
    programmes, shortDescription, yearEstablished
  }
`;

// Upcoming featured events for homepage
export const FEATURED_EVENTS_QUERY = `
  *[_type == "event" && isFeatured == true && isPast != true]
  | order(eventDate asc) [0..2] {
    _id, title, slug, eventDate, venue, image, registrationLink
  }
`;

export const POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, publishedAt, excerpt, mainImage,
    categories[]-> { title, slug },
    author-> { name }
  }
`;

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, publishedAt, excerpt, mainImage, body,
    categories[]-> { title, slug },
    author-> { name, image, bio }
  }
`;

export const POST_SLUGS_QUERY  = `*[_type == "post"] { "slug": slug.current }`;
export const LATEST_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) [0..2] {
    _id, title, slug, publishedAt, excerpt, mainImage,
    categories[]-> { title }
  }
`;

export const SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    totalSchools, regionsCount, yearsOperating, trainedPrincipals,
    phone1, phone2, whatsapp, email, address, facebook, twitter, youtube
  }
`;

export const EVENTS_QUERY = `
  *[_type == "event"] | order(eventDate asc) {
    _id, title, slug, eventDate, endDate, venue, description,
    image, registrationLink, isPast
  }
`;

export const GALLERY_QUERY = `
  *[_type == "mediaItem"] | order(date desc) {
    _id, title, slug, category, coverImage, date, isFeatured, description,
    "imageCount": count(images)
  }
`;

export const GALLERY_ITEM_QUERY = `
  *[_type == "mediaItem" && slug.current == $slug][0] {
    _id, title, slug, category, coverImage, date, description,
    images[] { ..., "url": asset->url }
  }
`;