import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import type { Locale } from '@/i18n/routing';

/**
 * MDX content layer. No CMS — there is no retainer, and a CMS nobody writes
 * into is pure overhead (docs/04-technical-architecture.md).
 *
 * Layout: content/{locale}/{collection}/{slug}.mdx
 *
 * Kept strictly separate from presentation, one file per page per locale, with
 * all structured fields in frontmatter. That discipline is what makes a later
 * Sanity migration a contained job rather than a rewrite, at no ongoing cost.
 */

export type Collection = 'conditions' | 'procedures';

export interface DocFrontmatter {
  title: string;
  /** Answer-first. Serves the anxious reader and the AI answer engines alike. */
  summary: string;
  /** ISO date of the doctor's sign-off. Required on every medical page. */
  reviewedAt: string;
  sources?: { label: string; url: string }[];
  faq?: { question: string; answer: string }[];
  /** Procedures only. */
  procedureType?: 'NoninvasiveProcedure' | 'PercutaneousProcedure';
}

export interface Doc {
  slug: string;
  frontmatter: DocFrontmatter;
  body: string;
}

const root = path.join(process.cwd(), 'content');

function dir(locale: Locale, collection: Collection) {
  return path.join(root, locale, collection);
}

export async function listSlugs(
  locale: Locale,
  collection: Collection,
): Promise<string[]> {
  try {
    const files = await fs.readdir(dir(locale, collection));
    return files.filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''));
  } catch {
    // A locale with no content yet is expected during the build — English is
    // drafted and reviewed first, then transcreated (docs/02).
    return [];
  }
}

export async function getDoc(
  locale: Locale,
  collection: Collection,
  slug: string,
): Promise<Doc | null> {
  try {
    const raw = await fs.readFile(path.join(dir(locale, collection), `${slug}.mdx`), 'utf8');
    const { data, content } = matter(raw);
    return { slug, frontmatter: data as DocFrontmatter, body: content };
  } catch {
    return null;
  }
}

export async function listDocs(
  locale: Locale,
  collection: Collection,
): Promise<Doc[]> {
  const slugs = await listSlugs(locale, collection);
  const docs = await Promise.all(slugs.map((s) => getDoc(locale, collection, s)));
  return docs.filter((d): d is Doc => d !== null);
}
