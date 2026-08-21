/**
 * JSON-LD builders.
 *
 * Entity markup is core strategy here, not hygiene: a former Lebanese Foreign
 * Minister shares the doctor's name, and `Physician` + both `MedicalClinic`
 * locations + the `sameAs` graph are the mechanism by which search engines tell
 * the two apart. See docs/07-verification.md §4.
 */
import { site, type SiteLocation } from './site';
import type { Locale } from '@/i18n/routing';

type Json = Record<string, unknown>;

function postalAddress(loc: SiteLocation): Json {
  return {
    '@type': 'PostalAddress',
    streetAddress: [loc.department, loc.street].filter(Boolean).join(', '),
    addressLocality: loc.district,
    addressRegion: loc.city,
    addressCountry: loc.country,
  };
}

function openingHours(loc: SiteLocation): Json[] {
  return loc.hours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.day,
    opens: h.opens,
    closes: h.closes,
  }));
}

export function medicalClinicSchema(loc: SiteLocation): Json {
  return {
    '@type': 'MedicalClinic',
    '@id': `${site.url}/locations/${loc.slug}#clinic`,
    name: loc.name,
    alternateName: [...loc.alternateName],
    address: postalAddress(loc),
    telephone: site.contact.phone,
    openingHoursSpecification: openingHours(loc),
    ...(loc.geo.lat !== 0 && {
      geo: { '@type': 'GeoCoordinates', latitude: loc.geo.lat, longitude: loc.geo.lng },
    }),
  };
}

/** Site-wide. Always the qualified name — never bare "Jean Obeid". */
export function physicianSchema(locale: Locale): Json {
  const name =
    locale === 'ar'
      ? site.practitioner.nameAr
      : locale === 'fr'
        ? site.practitioner.nameFr
        : site.practitioner.name;

  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': `${site.url}#physician`,
    name,
    alternateName: [site.practitioner.nameQualified, ...site.practitioner.alternateName],
    medicalSpecialty: site.practitioner.subspecialty,
    url: site.url,
    telephone: site.contact.phone,
    ...(site.sameAs.length > 0 && { sameAs: [...site.sameAs] }),
    location: site.locations.map(medicalClinicSchema),
  };
}

export function medicalConditionSchema(input: {
  name: string;
  description: string;
  url: string;
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalCondition',
    name: input.name,
    description: input.description,
    url: input.url,
  };
}

export function medicalProcedureSchema(input: {
  name: string;
  description: string;
  url: string;
  procedureType?: 'NoninvasiveProcedure' | 'PercutaneousProcedure';
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: input.name,
    description: input.description,
    url: input.url,
    ...(input.procedureType && {
      procedureType: `https://schema.org/${input.procedureType}`,
    }),
  };
}

export function faqPageSchema(items: { question: string; answer: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
    })),
  };
}

export function breadcrumbSchema(crumbs: { name: string; url: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}
