import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { HeartViewerLoader } from './HeartViewerLoader';

/**
 * The signature of the site, not its strategy.
 *
 * Output A (this component) is a pre-rendered turntable loop served to every
 * device. The poster is the LCP image, which is what keeps the hero fast on an
 * uneven mobile connection. Reduced-motion users get the poster only.
 *
 * Output B (HeartViewerLoader) is the interactive viewer, desktop pointer
 * devices only, dynamically imported on idle. See docs/03-heart-asset.md.
 */
export async function HeartHero() {
  const t = await getTranslations('home.hero');

  return (
    <section className="bg-ink-950 text-surface-50">
      <Container className="grid items-center gap-8 py-14 sm:py-20 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <h1 className="text-3xl font-semibold sm:text-4xl">{t('heading')}</h1>
          <p className="mt-4 max-w-prose text-surface-200">{t('subheading')}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/contact">{t('ctaPrimary')}</ButtonLink>
            <ButtonLink href="/conditions" variant="secondary">
              {t('ctaSecondary')}
            </ButtonLink>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <figure className="relative mx-auto aspect-square w-full max-w-md">
            {/*
              The poster carries the LCP. `preload="none"` keeps the video off
              the critical path; the browser paints the poster immediately.
              Budget: poster under 100 KB (docs/03-heart-asset.md).
            */}
            <video
              className="h-full w-full rounded-2xl object-cover motion-reduce:hidden"
              poster="/heart/poster.webp"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-label={t('heartAlt')}
            >
              <source src="/heart/turntable.webm" type="video/webm" />
              <source src="/heart/turntable.mp4" type="video/mp4" />
            </video>

            {/* Reduced motion: the poster, and only the poster. */}
            <img
              src="/heart/poster.webp"
              alt={t('heartAlt')}
              width={512}
              height={512}
              className="hidden h-full w-full rounded-2xl object-cover motion-reduce:block"
            />

            <HeartViewerLoader />
          </figure>
        </div>
      </Container>
    </section>
  );
}
