/**
 * COPTI — Google Form CSV → Sanity Migration Script
 * Column names mapped to exact Google Form export headers.
 *
 * Usage:
 *   1. Rename your CSV to: scripts/schools-export.csv
 *   2. Ensure .env.local has SANITY_API_TOKEN (Editor role)
 *   3. Run: npm run migrate
 */

import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@sanity/client';
import Papa from 'papaparse';

// ── Load .env.local manually (ts-node doesn't auto-load it) ───────────────
const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx > -1) {
        const k = trimmed.slice(0, idx).trim();
        const v = trimmed.slice(idx + 1).trim();
        if (!process.env[k]) process.env[k] = v;
      }
    }
  }
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token:     process.env.SANITY_API_TOKEN!,
  useCdn:    false,
});

// ── Exact column names from Google Form export ────────────────────────────
const COL = {
  name:            '1. Name of Institute',
  yearEstablished: '2. Year Established',
  region:          '3. Region',
  district:        '4. District/Municipality',
  gpsCoordinates:  '5. GPS Coordinates\n(Format: 5.6037, -0.1870)',
  gpsAddress:      '6. GPS Address\n(Example:  GA-183-8164 )',
  residenceType:   '7. Type of Residence',
  website:         '8. Existing Website URL',
  socialMedia:     '9. Social Media Handles',
  ictLevel:        '10. Level of ICT Integration',
  logoLink:        '11. Upload School Logo (Use Drive Link )',
  motto:           '11. Institute/School Motto',
  shortDesc:       '12. Short Description of the Institute (50 words)',
  fullProfile:     '13.  Full Institute Profile (300\u2013500 words)',
  phone:           '14. Official Contact Number of the Institute',
  email:           '15. Official Email Address of the Institute',
  principalName:   "1. Principal's Full Name & Designation",
  principalEmail:  "2. Principal's Email Address",
  principalPhone:  "3. Principal's Phone Number",
  keyContacts:     "4. Any other Key Contact Persons\nName of Person, Role, Contact Number  (eg. Vice Principal / Admissions Office / Academics / Industry Liaison / House Master etc)",
  programmes:      '1. Programmes / Courses (List all)',
  progDuration:    '2. Programme Duration (Short answer)',
  coreSubjects:    '3. Core Subjects Offered (List all)',
  entryReq:        '4. General Entry Requirements',
  industryLinkage: '5. Industry Linkage for Your Programmes (Are learners placed and supervised for WEL activities)',
  workshops:       '1. Workshops Available',
  workshopCond:    '2. Condition of Workshops',
  classrooms:      '3. Classrooms Available',
  adminBlock:      '4. Administration Block/Offices Available',
  ictInfra:        '5. ICT Infrastructure',
  boarding:        '6. Boarding Facilities',
  staffAcc:        '7. Staff Residence/Accomodation',
  schoolVehicle:   '8. School Bus or any School Vehicle Available',
  partnerIndustries:'1. Partner Industries/Companies (List all)',
  welStudents:     '2. Do students undergo WEL?',
  jobPlacement:    '3. Job Placement Support Available?',
  employmentPct:   '4. Estimated % of Graduates Employed or Self-Employed',
  achievements:    '\n1. Major Achievements (Last 5 Years)',
  awards:          '2. Any Awards & Recognitions (List all)',
  studentProjects: '3. Notable Student Projects',
  innovation:      '4. Innovation/Entrepreneurship Initiatives',
  challenges:      '1. Top 3 Challenges Facing Your Institute',
  opportunities:   '2. Top 3 Opportunities for Growth',
  supportNeeded:   '3. Priority Support Needed from COPTI/Government',
  collabAreas:     '4. Areas for Collaboration with Other Institutes',
  galleryLinks:    '1. Please upload up to 5 professionally taken high quality pictures that showcases and tells the best story of the Institute. The pictures can include front view, drone or aerial view, competitions, students projects, workshops with learners activity engaged, extra curricula activities etc. of the Institute',
} as const;

// ── Helpers ───────────────────────────────────────────────────────────────
type Row = Record<string, string>;

/** Get a trimmed value, return empty string if blank / N/A */
function v(row: Row, key: string): string {
  const raw = row[key] ?? '';
  const t = raw.trim();
  return (t && t.toLowerCase() !== 'n/a' && t !== '-') ? t : '';
}

function makeSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')   // strip accents
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 96);
}

function toNum(raw: string): number | undefined {
  if (!raw) return undefined;
  const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
  return isNaN(n) ? undefined : n;
}

/** Wrap a plain text string as a minimal Portable Text block */
function toBlock(text: string, key: string) {
  if (!text) return undefined;
  return [{ _type: 'block', _key: `b-${key}`, style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: `s-${key}`, text, marks: [] }] }];
}

/** Try to extract platform URLs from a freetext social media field */
function parseSocial(raw: string): Record<string, string> | undefined {
  if (!raw) return undefined;
  const out: Record<string, string> = {};
  const patterns: [string, RegExp][] = [
    ['facebook',  /facebook\.com\/[^\s,;]+/i],
    ['twitter',   /(?:twitter|x)\.com\/[^\s,;]+/i],
    ['instagram', /instagram\.com\/[^\s,;]+/i],
    ['tiktok',    /tiktok\.com\/[^\s,;]+/i],
    ['youtube',   /youtube\.com\/[^\s,;]+/i],
  ];
  for (const [platform, regex] of patterns) {
    const m = raw.match(regex);
    if (m) out[platform] = m[0].startsWith('http') ? m[0] : `https://${m[0]}`;
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

function buildDoc(row: Row, i: number): Record<string, unknown> | null {
  const name = v(row, COL.name);
  if (!name) { console.warn(`  ⚠️  Row ${i + 2}: no school name — skipped`); return null; }

  const slug = makeSlug(name);

  return {
    _type: 'school',
    _id:   `school-${slug}`,
    name,
    slug:  { _type: 'slug', current: slug },
    isFeatured: false,

    // Basic
    yearEstablished:   toNum(v(row, COL.yearEstablished)),
    region:            v(row, COL.region)          || undefined,
    district:          v(row, COL.district)        || undefined,
    gpsCoordinates:    v(row, COL.gpsCoordinates)  || undefined,
    gpsAddress:        v(row, COL.gpsAddress)      || undefined,
    residenceType:     v(row, COL.residenceType)   || undefined,
    website:           v(row, COL.website)         || undefined,
    ictLevel:          v(row, COL.ictLevel)        || undefined,
    motto:             v(row, COL.motto)           || undefined,
    shortDescription:  v(row, COL.shortDesc)       || undefined,
    fullProfile:       toBlock(v(row, COL.fullProfile), slug),

    // Contact
    phone: v(row, COL.phone) || undefined,
    email: v(row, COL.email) || undefined,

    // Social
    social: parseSocial(v(row, COL.socialMedia)),

    // Principal
    principal: {
      name:          v(row, COL.principalName)  || undefined,
      email:         v(row, COL.principalEmail) || undefined,
      phone:         v(row, COL.principalPhone) || undefined,
      otherContacts: v(row, COL.keyContacts)    || undefined,
    },

    // Academic
    programmes:        v(row, COL.programmes)    || undefined,
    programmeDuration: v(row, COL.progDuration)  || undefined,
    coreSubjects:      v(row, COL.coreSubjects)  || undefined,
    entryRequirements: v(row, COL.entryReq)      || undefined,
    industryLinkage:   v(row, COL.industryLinkage) || undefined,

    // Facilities
    boardingFacilities: v(row, COL.boarding) || undefined,
    facilities: {
      workshopsAvailable: v(row, COL.workshops)    || undefined,
      workshopCondition:  v(row, COL.workshopCond) || undefined,
      classroomsStatus:   v(row, COL.classrooms)   || undefined,
      adminBlock:         v(row, COL.adminBlock)   || undefined,
      ictInfrastructure:  v(row, COL.ictInfra)     || undefined,
      staffAccommodation: v(row, COL.staffAcc)     || undefined,
      schoolVehicle:      v(row, COL.schoolVehicle)|| undefined,
    },

    // Industry
    industry: {
      partnerIndustries:     v(row, COL.partnerIndustries) || undefined,
      welParticipation:      v(row, COL.welStudents)       || undefined,
      jobPlacementSupport:   v(row, COL.jobPlacement)      || undefined,
      graduateEmploymentPct: toNum(v(row, COL.employmentPct)),
    },

    // Achievements
    achievements: {
      majorAchievements:     v(row, COL.achievements)    || undefined,
      awards:                v(row, COL.awards)          || undefined,
      studentProjects:       v(row, COL.studentProjects) || undefined,
      innovationInitiatives: v(row, COL.innovation)      || undefined,
    },

    // Gallery
    galleryDriveLinks: v(row, COL.galleryLinks) || undefined,

    // Strategic (internal — not shown on public site)
    strategic: {
      challenges:         v(row, COL.challenges)    || undefined,
      opportunities:      v(row, COL.opportunities) || undefined,
      supportNeeded:      v(row, COL.supportNeeded) || undefined,
      collaborationAreas: v(row, COL.collabAreas)   || undefined,
    },
  };
}

// ── Run ────────────────────────────────────────────────────────────────────
async function migrate() {
  const csvPath = path.join(__dirname, 'schools-export.csv');
  if (!fs.existsSync(csvPath)) {
    console.error('\n❌  File not found: scripts/schools-export.csv');
    console.log('    Rename your CSV to that path and try again.\n');
    process.exit(1);
  }

  const csv = fs.readFileSync(csvPath, 'utf-8');
  const { data, errors } = Papa.parse<Row>(csv, {
    header: true, skipEmptyLines: true,
  });
  if (errors.length) console.warn('⚠️  CSV parse warnings:', errors.slice(0, 3));

  console.log(`\n📊  ${data.length} rows loaded from CSV`);
  console.log(`🔑  Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`📦  Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}\n`);
  console.log('──────────────────────────────────────────────');

  // Verify connection
  try {
    await client.fetch('*[_type == "school"][0]._id');
    console.log('✅  Sanity connection OK\n');
  } catch (err) {
    console.error('❌  Sanity connection failed. Check SANITY_API_TOKEN and project ID.\n', (err as Error).message);
    process.exit(1);
  }

  let created = 0, skipped = 0, failed = 0;

  for (let i = 0; i < data.length; i++) {
    const doc = buildDoc(data[i], i);
    if (!doc) { skipped++; continue; }

    // Print logo Drive link as a reminder (can't auto-upload to Sanity)
    const logoLink = v(data[i], COL.logoLink);
    if (logoLink) console.log(`  🖼️  Logo Drive link → ${(doc.name as string).slice(0,40)}: ${logoLink.slice(0,60)}…`);

    try {
      await client.createOrReplace(doc as any);
      console.log(`  ✅  ${doc.name}`);
      created++;
    } catch (err) {
      console.error(`  ❌  ${doc.name}: ${(err as Error).message}`);
      failed++;
    }

    await new Promise(r => setTimeout(r, 150)); // rate limit throttle
  }

  console.log('\n══════════════════════════════════════════════');
  console.log(`✅  Created / Updated : ${created}`);
  console.log(`⚠️   Skipped           : ${skipped}`);
  console.log(`❌  Errors            : ${failed}`);
  console.log(`\n🎉  Migration complete!\n`);
  console.log('Next steps:');
  console.log('  1. Open Sanity Studio → Member Schools — confirm all schools');
  console.log('  2. Upload school logos manually per school (logo Drive links printed above)');
  console.log('  3. Toggle isFeatured = true on 3 schools for the homepage');
  console.log('  4. Fill in Site Settings (stats, phone, address)');
  console.log('  5. npm run dev → localhost:3000/schools\n');
}

migrate().catch(err => {
  console.error('\nFatal error:', err.message);
  process.exit(1);
});
