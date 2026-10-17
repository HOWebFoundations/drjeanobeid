/**
 * Kept out of AppointmentForm.tsx on purpose: values exported from a
 * 'use client' module reach server components as client references, not data.
 */
export const FORM_LABEL_KEYS = [
  'name', 'phone', 'location', 'locationTeleconsultation', 'time', 'timeMorning',
  'timeAfternoon', 'timeSpecific', 'reason', 'reasonFirst', 'reasonFollowUp',
  'reasonSecondOpinion', 'reasonTest', 'reasonOther', 'submit', 'sending',
  'privacyNote', 'sentHeading', 'sentBody', 'failedHeading', 'failedBody',
  'failedCall', 'failedWhatsapp',
] as const;

export type FormLabels = Record<(typeof FORM_LABEL_KEYS)[number], string>;
