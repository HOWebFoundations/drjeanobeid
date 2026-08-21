/**
 * Single source of truth for entity facts.
 *
 * Strategy requirement (docs/02-content-inventory.md): name, addresses, phone,
 * hours and credentials must be IDENTICAL across the site, both Google Business
 * Profile listings, and every directory. With two locations there is twice as
 * much to keep straight, so nothing here should be duplicated in a component —
 * import from this file instead.
 *
 * ⚠️ Values marked TODO are unconfirmed and come from docs/06-diligence.md.
 * Do not ship with placeholders in place.
 */

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://drjeanobeid.com',

  /**
   * Always the qualified form, never bare "Jean Obeid".
   * A former Lebanese Foreign Minister of the same name owns the bare-name
   * search results — see docs/07-verification.md section 4.
   */
  practitioner: {
    name: 'Dr Jean Obeid',
    nameQualified: 'Dr Jean Obeid, Cardiologist',
    // TODO diligence 31 — confirm whether he publishes under a middle name.
    alternateName: [] as string[],
    nameAr: 'د. جان عبيد',
    nameFr: 'Dr Jean Obeid',
    specialty: 'Cardiology',
    // Confirmed: he is interventional. docs/06-diligence.md item 4.
    subspecialty: 'Interventional Cardiology',
    // TODO diligence — from the About interview.
    academicTitle: 'Assistant Professor of Cardiology, Lebanese University',
  },

  /** TODO diligence 13 — one secretary, one number for both hospitals. */
  contact: {
    phone: '',
    whatsapp: '',
    email: '',
    /** Prefilled so the patient does not have to compose a message. */
    whatsappPrefill: {
      en: 'Hello, I would like to request an appointment with Dr Obeid.',
      fr: 'Bonjour, je souhaite demander un rendez-vous avec le Dr Obeid.',
      ar: 'مرحباً، أود حجز موعد مع الدكتور عبيد.',
    },
  },

  /**
   * Two hospital locations, no private clinic.
   * Each hospital appears under three or four name variants across the MOPH
   * register, its own site and the directories (docs/07-verification.md §2).
   * `name` is the canonical form used everywhere; `alternateName` carries the rest.
   *
   * They share a phone number, so SESSION HOURS are the only thing distinguishing
   * the two Google Business Profile listings. They must be accurate.
   */
  locations: [
    {
      slug: 'geitaoui',
      name: 'Hôpital Libanais Geitaoui – CHU',
      alternateName: ['Lebanese Hospital Geitaoui', 'Jeatawi Hospital'],
      // TODO diligence 29 — department / floor / suite.
      department: '',
      street: 'Geitaoui Street',
      district: 'Achrafieh',
      city: 'Beirut',
      country: 'LB',
      hospitalPhone: '+961 1 590000',
      // TODO diligence 19 — session days and hours.
      hours: [] as { day: string; opens: string; closes: string }[],
      geo: { lat: 0, lng: 0 }, // TODO
    },
    {
      slug: 'karantina',
      name: 'Governmental Hospital of Beirut Quarantine',
      alternateName: [
        'Beirut Governmental University Hospital – Karantina',
        'Karentina Hospital',
      ],
      department: '', // TODO diligence 29
      street: 'Karantina – Moudawar',
      district: 'Karantina',
      city: 'Beirut',
      country: 'LB',
      hospitalPhone: '+961 1 442105',
      hours: [] as { day: string; opens: string; closes: string }[], // TODO
      geo: { lat: 0, lng: 0 }, // TODO
    },
  ],

  /**
   * Verified 2026-08-21 against the Lebanese Red Cross.
   * Appears on every medical page.
   */
  emergency: {
    redCross: '140',
    civilDefence: '125',
    fire: '175',
    police: '112',
  },

  /**
   * `sameAs` graph. This is load-bearing: it is how Google separates this
   * entity from the politician of the same name.
   * TODO — Vezeeta and DRAPP profiles do not exist yet and must be created
   * before launch (docs/07-verification.md §5).
   */
  sameAs: [] as string[],
} as const;

export type SiteLocation = (typeof site.locations)[number];

export function locationBySlug(slug: string): SiteLocation | undefined {
  return site.locations.find((l) => l.slug === slug);
}
