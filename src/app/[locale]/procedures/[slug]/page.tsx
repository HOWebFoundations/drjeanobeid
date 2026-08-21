import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { MDXRemote } from 'next-mdx-remote/rsc';

import { Container } from '@/components/ui/Container';
import { EmergencyNotice } from '@/components/medical/EmergencyNotice';
import { MedicalByline } from '@/components/medical/MedicalByline';
import { JsonLd } from '@/components/JsonLd';
import { getDoc, listSlugs } from '@/lib/content';
import { medicalProcedureSchema, faqPageSchema, breadcrumbSchema } from '@/lib/schema';
import { site } from '@/lib/site';
import { routing, type Locale } from '@/i18n/routing';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const slug of await listSlugs(locale, 'procedures')) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const doc = await getDoc(locale as Locale, 'procedures', slug);
  if (!doc) return {};
  return { title: doc.frontmatter.title, description: doc.frontmatter.summary };
}

export default async function ProcedurePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const doc = await getDoc(locale as Locale, 'procedures', slug);
  if (!doc) notFound();

  const url = `${site.url}${locale === routing.defaultLocale ? '' : `/${locale}`}/procedures/${slug}`;

  return (
    <Container className="py-10">
      <article className="prose-headings:font-serif max-w-prose">
        <h1 className="text-3xl font-semibold">{doc.frontmatter.title}</h1>

        {/* Answer-first: the opening paragraph answers the page title. */}
        <p className="mt-4 text-lg text-ink-800">{doc.frontmatter.summary}</p>

        <EmergencyNotice />

        <div className="mt-6 space-y-4 leading-relaxed">
          <MDXRemote source={doc.body} />
        </div>

        <MedicalByline
          reviewedAt={doc.frontmatter.reviewedAt}
          sources={doc.frontmatter.sources}
        />
      </article>

      <JsonLd
        data={medicalProcedureSchema({
          name: doc.frontmatter.title,
          description: doc.frontmatter.summary,
          url,
          procedureType: doc.frontmatter.procedureType,
        })}
      />
      {doc.frontmatter.faq && doc.frontmatter.faq.length > 0 && (
        <JsonLd data={faqPageSchema(doc.frontmatter.faq)} />
      )}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Tests and procedures', url: `${site.url}/procedures` },
          { name: doc.frontmatter.title, url },
        ])}
      />
    </Container>
  );
}
